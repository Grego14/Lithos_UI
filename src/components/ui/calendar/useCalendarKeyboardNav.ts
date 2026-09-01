/**
 * @fileoverview Keyboard navigation controller for WAI-ARIA grid pattern.
 * - Manages roving tabindex / focus positioning across day cells.
 * - Handles 2D grid arrows, line bounds (Home/End), page jumps (PageUp/PageDown), and activation keys.
 */
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { addDays, addMonths, isDateOutOfBounds, isSameMonth, toDateKey } from '../../../utils/date'
import { NAVIGATION_KEYS } from './calendar.utils'

interface UseCalendarKeyboardNavOptions {
  initialFocusedDate: Date
  displayedMonth: Date
  firstDayOfWeek: number
  minDate?: Date | undefined
  maxDate?: Date | undefined
  changeMonth: (next: Date) => void
  onDaySelect: (date: Date) => void
}

export const useCalendarKeyboardNav = ({
  initialFocusedDate,
  displayedMonth,
  firstDayOfWeek,
  minDate,
  maxDate,
  changeMonth,
  onDaySelect,
}: UseCalendarKeyboardNavOptions) => {
  const [focusedDate, setFocusedDate] = useState<Date>(initialFocusedDate)
  const dayButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const isKeyboardNavigating = useRef(false)

  useEffect(() => {
    if (!isKeyboardNavigating.current) return
    isKeyboardNavigating.current = false

    const button = dayButtonRefs.current.get(toDateKey(focusedDate))
    button?.focus()
  }, [focusedDate])

  const moveFocus = (next: Date) => {
    const clamped = isDateOutOfBounds(next, minDate, maxDate) ? focusedDate : next

    if (!isSameMonth(clamped, displayedMonth)) changeMonth(clamped)
    setFocusedDate(clamped)
  }

  const handleGridKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!NAVIGATION_KEYS.has(event.key)) return

    event.preventDefault()
    isKeyboardNavigating.current = true

    let nextDate: Date | null = null

    switch (event.key) {
      case 'ArrowLeft':
        nextDate = addDays(focusedDate, -1)
        break
      case 'ArrowRight':
        nextDate = addDays(focusedDate, 1)
        break
      case 'ArrowUp':
        nextDate = addDays(focusedDate, -7)
        break
      case 'ArrowDown':
        nextDate = addDays(focusedDate, 7)
        break
      case 'Home': {
        const dayOffset = (focusedDate.getDay() - firstDayOfWeek + 7) % 7
        nextDate = addDays(focusedDate, -dayOffset)
        break
      }
      case 'End': {
        const dayOffset = (focusedDate.getDay() - firstDayOfWeek + 7) % 7
        nextDate = addDays(focusedDate, 6 - dayOffset)
        break
      }
      case 'PageUp':
        nextDate = addMonths(focusedDate, -1)
        break
      case 'PageDown':
        nextDate = addMonths(focusedDate, 1)
        break
      case 'Enter':
      case ' ':
        onDaySelect(focusedDate)
        return
    }

    if (nextDate) {
      moveFocus(nextDate)
    }
  }

  return {
    focusedDate,
    setFocusedDate,
    dayButtonRefs,
    handleGridKeyDown,
  }
}
