/**
 * @fileoverview Lithos UI calendar primitive.
 * - Dual-mode state architecture: displayed month and selection are independently
 *   controlled/uncontrolled (mirrors Accordion's `open !== undefined ? open : local` pattern),
 *   so jumping year/month via the header selects never touches the selected value.
 * - Zero-Gap grid: weekday headers + all 42 day cells share ONE `grid-cols-7`, never `gap-*`.
 *   Border-ownership technique — the grid owns its outer top/left edge once, every cell owns
 *   only its own right+bottom border, so no shared edge between adjacent cells is ever drawn twice.
 * - `.lithos-click` exceptions (documented, not accidental):
 *   1. Day cells are real <button> for a11y but skip `.lithos-click` — its hover-grow-shadow /
 *      active-press-translate physics is built for isolated spaced-out controls; at 42-cell grid
 *      density it would double up against the border-ownership scheme and visually break. Day
 *      cells get manual `cn()` background-state changes only (hover/selected/in-range/disabled).
 *   2. Month/year pickers are a hand-built `HeaderDropdown` listbox, not a native <select> — a
 *      native select renders OS chrome (system font/scrollbar) that breaks the brutalist frame,
 *      especially on a long year list. `HeaderDropdown` is a plain bordered trigger `Button` plus
 *      an absolutely-positioned bordered option panel, so it keeps `.lithos-click` physics on the
 *      trigger and full token/shadow styling on the panel — no positioning library needed since
 *      it only ever anchors directly under its own trigger.
 * - Prev/next nav buttons are NOT exceptions: they route through `Button intent='text'` exactly
 *   like Accordion's header toggle, with full `.lithos-click` physics.
 * - Multi-color selection (mode='multiple' only): `getDateColor` lets a consumer assign a distinct
 *   color per selected date (e.g. sick leave vs vacation). Custom colors are resolved to a readable
 *   foreground via the YIQ contrast engine (`src/utils/yiq.ts`), same as Badge's `color` prop.
 *   Range mode intentionally does NOT support per-date color — every day inside a selected range
 *   (endpoints and the days between) renders in one uniform accent color, since a range is a single
 *   contiguous selection, not a set of independently colorable dates.
 */

import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
} from 'react'
import { Button } from './Button'
import { cn } from '../../utils/cn'
import { IconChevronDown } from './icons/IconChevronDown'
import { IconChevronLeft } from './icons/IconChevronLeft'
import { getContrastText } from '../../utils/yiq'
import type { HexColor } from '../../core/types'
import {
  addDays,
  addMonths,
  formatMonthYear,
  getCalendarGridDays,
  getMonthLabels,
  getWeekdayLabels,
  isBeforeDay,
  isDateInRange,
  isDateOutOfBounds,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  toDateKey,
} from '../../utils/date'

export type CalendarMode = 'single' | 'multiple' | 'range'

export interface DateRange {
  from: Date | null
  to: Date | null
}

export type CalendarValue = Date | null | Date[] | DateRange

export interface CalendarProps extends Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue' | 'onChange'> {
  mode?: CalendarMode
  value?: CalendarValue
  defaultValue?: CalendarValue
  onChange?: (value: CalendarValue) => void
  month?: Date
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  isDateDisabled?: (date: Date) => boolean
  /** mode='multiple' only — assigns a distinct color per selected date (e.g. leave type). */
  getDateColor?: (date: Date) => HexColor | string | undefined
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  locale?: string
  yearRange?: [number, number]
  classes?: {
    container?: string
    header?: string
    nav?: string
    monthSelect?: string
    yearSelect?: string
    weekdays?: string
    grid?: string
    cell?: string
    day?: string
  }
}

const getEmptyValue = (mode: CalendarMode): CalendarValue => {
  if (mode === 'multiple') return []
  if (mode === 'range') return { from: null, to: null }
  return null
}

const asRange = (value: CalendarValue): DateRange =>
  value && !Array.isArray(value) && !(value instanceof Date) ? (value as DateRange) : { from: null, to: null }

const asArray = (value: CalendarValue): Date[] => (Array.isArray(value) ? value : [])

const inferSeedDate = (mode: CalendarMode, value: CalendarValue | undefined): Date | null => {
  if (!value) return null
  if (mode === 'single') return value as Date
  if (mode === 'multiple') return (value as Date[])[0] ?? null
  return (value as DateRange).from
}

interface HeaderDropdownOption {
  value: number
  label: string
}

interface HeaderDropdownProps {
  label: string
  options: HeaderDropdownOption[]
  value: number
  onChange: (value: number) => void
  className?: string | undefined
}

const HeaderDropdown = ({ label, options, value, onChange, className }: HeaderDropdownProps) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const current = options.find((option) => option.value === value)

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLButtonElement>('[data-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [open])

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <Button
        intent="secondary"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false)
        }}
        className="justify-between text-sm min-w-26"
      >
        <span>{current?.label}</span>
        <div className="ml-2 w-3 min-w-3">
          <IconChevronDown className={cn('max-w-full h-auto', open && 'rotate-180')} />
        </div>
      </Button>

      {open && (
        <div
          ref={panelRef}
          role="listbox"
          aria-label={label}
          className="absolute left-0 top-full z-10 mt-1 max-h-52 w-max min-w-full overflow-y-auto border-2 border-(--lithos-border) bg-(--lithos-bg) shadow-[2px_2px_0_0_var(--lithos-shadow)]"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              data-selected={option.value === value}
              aria-selected={option.value === value}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              className={cn(
                'block w-full text-left px-3 py-1.5 text-sm font-sans font-bold cursor-pointer whitespace-nowrap',
                option.value === value
                  ? 'bg-(--lithos-accent) text-(--lithos-accent-text)'
                  : 'hover:bg-(--lithos-muted)'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const NavIcon = ({ direction }: { direction: 'prev' | 'next' }) => (
  <div className="w-4 min-w-4">
    <IconChevronLeft className={cn('max-w-full h-auto', direction === 'next' && 'rotate-180')} />
  </div>
)

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      mode = 'single',
      value,
      defaultValue,
      onChange,
      month,
      defaultMonth,
      onMonthChange,
      minDate,
      maxDate,
      disabledDates,
      isDateDisabled,
      getDateColor,
      firstDayOfWeek = 0,
      locale,
      yearRange,
      classes = {},
      className,
      ...rest
    },
    ref
  ) => {
    const isValueControlled = value !== undefined
    const [localValue, setLocalValue] = useState<CalendarValue>(() => defaultValue ?? getEmptyValue(mode))
    const currentValue = isValueControlled ? value! : localValue

    const isMonthControlled = month !== undefined
    const [localMonth, setLocalMonth] = useState<Date>(() =>
      startOfMonth(defaultMonth ?? inferSeedDate(mode, defaultValue ?? value) ?? new Date())
    )
    const displayedMonth = isMonthControlled ? startOfMonth(month!) : localMonth

    const [hoverDate, setHoverDate] = useState<Date | null>(null)
    const [focusedDate, setFocusedDate] = useState<Date>(
      () => inferSeedDate(mode, defaultValue ?? value) ?? displayedMonth
    )

    const dayButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

    const changeMonth = (next: Date) => {
      const normalized = startOfMonth(next)
      if (!isMonthControlled) setLocalMonth(normalized)
      onMonthChange?.(normalized)
    }

    const commitValue = (next: CalendarValue) => {
      if (!isValueControlled) setLocalValue(next)
      onChange?.(next)
    }

    const isDisabled = (date: Date): boolean => {
      if (isDateOutOfBounds(date, minDate, maxDate)) return true
      if (disabledDates?.some((d) => isSameDay(d, date))) return true
      if (isDateDisabled?.(date)) return true
      return false
    }

    const handleDayClick = (date: Date) => {
      if (isDisabled(date)) return
      if (!isSameMonth(date, displayedMonth)) changeMonth(date)

      if (mode === 'single') {
        commitValue(date)
        return
      }

      if (mode === 'multiple') {
        const arr = asArray(currentValue)
        const exists = arr.some((d) => isSameDay(d, date))
        commitValue(exists ? arr.filter((d) => !isSameDay(d, date)) : [...arr, date])
        return
      }

      const range = asRange(currentValue)
      if (!range.from || range.to) {
        commitValue({ from: date, to: null })
      } else {
        const from = isBeforeDay(date, range.from) ? date : range.from
        const to = isBeforeDay(date, range.from) ? range.from : date
        commitValue({ from, to })
      }
    }

    const previewRange: DateRange | null = useMemo(() => {
      if (mode !== 'range') return null
      const range = asRange(currentValue)
      if (range.from && !range.to && hoverDate) {
        return isBeforeDay(hoverDate, range.from)
          ? { from: hoverDate, to: range.from }
          : { from: range.from, to: hoverDate }
      }
      return range
    }, [mode, currentValue, hoverDate])

    /** True for the start, end, and every day between — the whole range renders as one uniform color. */
    const isRangeMember = (date: Date): boolean => {
      if (mode !== 'range') return false
      const range = previewRange ?? asRange(currentValue)
      if (!range.from) return false
      if (isSameDay(range.from, date)) return true
      if (range.to && isDateInRange(date, range)) return true
      return false
    }

    const gridDays = useMemo(
      () => getCalendarGridDays(displayedMonth, firstDayOfWeek),
      [displayedMonth, firstDayOfWeek]
    )
    const weekdayLabels = useMemo(() => getWeekdayLabels(firstDayOfWeek, locale), [firstDayOfWeek, locale])
    const monthLabels = useMemo(() => getMonthLabels(locale), [locale])

    const currentYear = new Date().getFullYear()
    const [minYear, maxYear] = yearRange ?? [currentYear - 100, currentYear + 10]
    const yearOptions = useMemo(
      () => Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i),
      [minYear, maxYear]
    )

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
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          isKeyboardNavigating.current = true
          moveFocus(addDays(focusedDate, -1))
          break
        case 'ArrowRight':
          event.preventDefault()
          isKeyboardNavigating.current = true
          moveFocus(addDays(focusedDate, 1))
          break
        case 'ArrowUp':
          event.preventDefault()
          isKeyboardNavigating.current = true
          moveFocus(addDays(focusedDate, -7))
          break
        case 'ArrowDown':
          event.preventDefault()
          isKeyboardNavigating.current = true
          moveFocus(addDays(focusedDate, 7))
          break
        case 'Home':
          event.preventDefault()
          isKeyboardNavigating.current = true
          moveFocus(addDays(focusedDate, -((focusedDate.getDay() - firstDayOfWeek + 7) % 7)))
          break
        case 'End':
          event.preventDefault()
          isKeyboardNavigating.current = true
          moveFocus(addDays(focusedDate, 6 - ((focusedDate.getDay() - firstDayOfWeek + 7) % 7)))
          break
        case 'PageUp':
          event.preventDefault()
          isKeyboardNavigating.current = true
          moveFocus(addMonths(focusedDate, -1))
          break
        case 'PageDown':
          event.preventDefault()
          isKeyboardNavigating.current = true
          moveFocus(addMonths(focusedDate, 1))
          break
        case 'Enter':
        case ' ':
          event.preventDefault()
          handleDayClick(focusedDate)
          break
      }
    }

    const isPrevDisabled = minDate ? displayedMonth.getTime() <= startOfMonth(minDate).getTime() : false
    const isNextDisabled = maxDate ? displayedMonth.getTime() >= startOfMonth(maxDate).getTime() : false

    return (
      <div
        ref={ref}
        className={cn(
          'inline-block border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[2px_2px_0_0_var(--lithos-shadow)] p-3',
          classes.container,
          className
        )}
        {...rest}
      >
        <div className={cn('flex items-center justify-between mb-3', classes.header)}>
          <Button
            intent="text"
            aria-label="Previous month"
            disabled={isPrevDisabled}
            onClick={() => changeMonth(addMonths(displayedMonth, -1))}
            className={cn('translate-x-0 translate-y-0 active:translate-x-0 active:translate-y-0 p-1', classes.nav)}
          >
            <NavIcon direction="prev" />
          </Button>

          <div className="flex items-center">
            <HeaderDropdown
              label="Month"
              value={displayedMonth.getMonth()}
              options={monthLabels.map((label, index) => ({ value: index, label }))}
              onChange={(monthIndex) => changeMonth(new Date(displayedMonth.getFullYear(), monthIndex, 1))}
              className={cn('mr-2', classes.monthSelect)}
            />

            <HeaderDropdown
              label="Year"
              value={displayedMonth.getFullYear()}
              options={yearOptions.map((year) => ({ value: year, label: String(year) }))}
              onChange={(year) => changeMonth(new Date(year, displayedMonth.getMonth(), 1))}
              className={classes.yearSelect}
            />
          </div>

          <Button
            intent="text"
            aria-label="Next month"
            disabled={isNextDisabled}
            onClick={() => changeMonth(addMonths(displayedMonth, 1))}
            className={cn('translate-x-0 translate-y-0 active:translate-x-0 active:translate-y-0 p-1', classes.nav)}
          >
            <NavIcon direction="next" />
          </Button>
        </div>

        <span className="sr-only" aria-live="polite">
          {formatMonthYear(displayedMonth, locale)}
        </span>

        <div
          role="grid"
          aria-label="Calendar"
          aria-multiselectable={mode === 'multiple'}
          onMouseLeave={() => setHoverDate(null)}
          onKeyDown={handleGridKeyDown}
          className={cn('grid grid-cols-7 border-t-2 border-l-2 border-(--lithos-border)', classes.grid)}
        >
          <div role="row" className="contents">
            {weekdayLabels.map((label) => (
              <div
                key={label}
                role="columnheader"
                className={cn(
                  'border-r-2 border-b-2 border-(--lithos-border) h-8 flex items-center justify-center font-sans font-bold text-xs',
                  classes.weekdays
                )}
              >
                {label}
              </div>
            ))}
          </div>

          {Array.from({ length: gridDays.length / 7 }).map((_, rowIndex) => (
            <div key={rowIndex} role="row" className="contents">
              {gridDays.slice(rowIndex * 7, (rowIndex + 1) * 7).map(({ date, isCurrentMonth }) => {
                const disabled = isDisabled(date)
                const selected =
                  mode === 'single'
                    ? isSameDay(currentValue as Date | null, date)
                    : mode === 'multiple'
                      ? asArray(currentValue).some((d) => isSameDay(d, date))
                      : isRangeMember(date)
                const customColor = mode === 'multiple' && selected ? getDateColor?.(date) : undefined
                const today = isToday(date)
                const key = toDateKey(date)

                return (
                  <div key={key} role="gridcell" aria-selected={selected} className={cn('border-r-2 border-b-2 border-(--lithos-border)', classes.cell)}>
                    <button
                      ref={(el) => {
                        if (el) dayButtonRefs.current.set(key, el)
                        else dayButtonRefs.current.delete(key)
                      }}
                      type="button"
                      tabIndex={isSameDay(date, focusedDate) ? 0 : -1}
                      aria-disabled={disabled}
                      aria-label={new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(date)}
                      disabled={disabled}
                      onClick={() => {
                        setFocusedDate(date)
                        handleDayClick(date)
                      }}
                      onMouseEnter={() => setHoverDate(date)}
                      style={customColor ? { backgroundColor: customColor, color: getContrastText(customColor) } : undefined}
                      className={cn(
                        'w-10 h-10 flex items-center justify-center font-sans text-sm cursor-pointer transition-colors duration-75',
                        !isCurrentMonth && 'text-(--lithos-muted)',
                        today && !selected && 'font-black underline',
                        selected && !customColor && 'bg-(--lithos-accent) text-(--lithos-accent-text) font-black',
                        selected && customColor && 'font-black',
                        !selected && 'hover:bg-(--lithos-muted)',
                        disabled && 'opacity-40 pointer-events-none cursor-not-allowed',
                        classes.day
                      )}
                    >
                      {date.getDate()}
                    </button>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }
)

Calendar.displayName = 'Calendar'
