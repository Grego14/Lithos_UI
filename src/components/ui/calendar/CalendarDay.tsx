/**
 * @fileoverview Atomic cell primitive representing a single day in the calendar grid.
 * - Handles inline dynamic styles (YIQ contrast text for custom/rainbow colors).
 * - Exposes data attributes (`data-date`, `data-grid-button`) for grid event delegation.
 */
import type { CalendarValue, CalendarMode, CalendarProps } from './calendar.types'
import { formatDate } from './calendar.utils'
import { isSameDay, isToday, toDateKey } from '../../../utils/date'
import { cn } from '../../../utils/cn'
import { getContrastText } from '../../../utils/yiq'

interface CalendarDayProps {
  date: Date
  isCurrentMonth: boolean
  focusedDate: Date
  currentValue: CalendarValue
  mode: CalendarMode
  disabled: boolean
  selected: boolean
  customColor?: string | undefined
  classes?: CalendarProps['classes']
  dateFormatter: Intl.DateTimeFormat
  onRegisterRef: (key: string, el: HTMLButtonElement | null) => void
}

export const CalendarDay = ({
  date,
  isCurrentMonth,
  focusedDate,
  disabled,
  selected,
  customColor,
  classes = {},
  dateFormatter,
  onRegisterRef,
}: CalendarDayProps) => {
  const today = isToday(date)
  const key = toDateKey(date)

  return (
    <div
      role="gridcell"
      aria-selected={selected}
      className={cn('border-r-2 border-b-2 border-(--lithos-border)', classes.cell)}
    >
      <button
        ref={(el) => onRegisterRef(key, el)}
        type="button"
        tabIndex={isSameDay(date, focusedDate) ? 0 : -1}
        aria-disabled={disabled}
        aria-label={dateFormatter.format(date)}
        data-date={formatDate(date)}
        data-grid-button
        disabled={disabled}
        style={customColor ? { backgroundColor: customColor, color: getContrastText(customColor) } : undefined}
        className={cn(
          'h-8 w-full flex items-center justify-center font-mono text-sm cursor-pointer transition-colors duration-75 select-none',
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
}
