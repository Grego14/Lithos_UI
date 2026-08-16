/**
 * @fileoverview Native Date/Intl date-math helpers for the Calendar component.
 * No date library dependency by design — Lithos UI keeps zero-dependency date math.
 */

export const startOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), 1)

export const endOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth() + 1, 0)

export const addMonths = (date: Date, amount: number): Date => new Date(date.getFullYear(), date.getMonth() + amount, 1)

export const addDays = (date: Date, amount: number): Date => {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

export const getDaysInMonth = (date: Date): number => endOfMonth(date).getDate()

export const getFirstWeekdayOfMonth = (date: Date, firstDayOfWeek = 0): number =>
  (startOfMonth(date).getDay() - firstDayOfWeek + 7) % 7

export const normalizeToMidnight = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate())

export const isSameDay = (a: Date | null | undefined, b: Date | null | undefined): boolean => {
  if (!a || !b) return false
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export const isSameMonth = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()

export const isToday = (date: Date): boolean => isSameDay(date, new Date())

export const isBeforeDay = (a: Date, b: Date): boolean =>
  normalizeToMidnight(a).getTime() < normalizeToMidnight(b).getTime()

export const isAfterDay = (a: Date, b: Date): boolean =>
  normalizeToMidnight(a).getTime() > normalizeToMidnight(b).getTime()

export const isDateInRange = (date: Date, range: { from: Date | null; to: Date | null }): boolean => {
  if (!range.from || !range.to) return false
  const time = normalizeToMidnight(date).getTime()
  return time >= normalizeToMidnight(range.from).getTime() && time <= normalizeToMidnight(range.to).getTime()
}

export const isDateOutOfBounds = (date: Date, min?: Date, max?: Date): boolean => {
  if (min && isBeforeDay(date, min)) return true
  if (max && isAfterDay(date, max)) return true
  return false
}

export const clampDate = (date: Date, min?: Date, max?: Date): Date => {
  if (min && isBeforeDay(date, min)) return min
  if (max && isAfterDay(date, max)) return max
  return date
}

export interface CalendarGridDay {
  date: Date
  isCurrentMonth: boolean
}

/** Always returns exactly 42 entries (6 weeks) so the grid height never jumps between months. */
export const getCalendarGridDays = (month: Date, firstDayOfWeek = 0): CalendarGridDay[] => {
  const monthStart = startOfMonth(month)
  const leadingCount = getFirstWeekdayOfMonth(month, firstDayOfWeek)
  const gridStart = addDays(monthStart, -leadingCount)

  return Array.from({ length: 42 }, (_, i) => {
    const date = addDays(gridStart, i)
    return { date, isCurrentMonth: isSameMonth(date, month) }
  })
}

export const getWeekdayLabels = (firstDayOfWeek = 0, locale?: string): string[] => {
  // 2023-01-01 is a known Sunday, used as a stable reference week.
  const referenceSunday = new Date(2023, 0, 1)
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' })

  return Array.from({ length: 7 }, (_, i) => formatter.format(addDays(referenceSunday, firstDayOfWeek + i)))
}

export const getMonthLabels = (locale?: string): string[] => {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'long' })
  return Array.from({ length: 12 }, (_, i) => formatter.format(new Date(2023, i, 1)))
}

export const formatMonthYear = (date: Date, locale?: string): string =>
  new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date)

export const toDateKey = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
