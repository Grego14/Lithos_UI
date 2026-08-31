import type { CalendarMode, CalendarValue, DateRange } from './calendar.types'

export const ROYGBIV = [
  '#fa5252', // Red
  '#fd7e14', // Orange
  '#fcc419', // Yellow
  '#40c057', // Green
  '#228be6', // Blue
  '#4c6ef5', // Indigo
  '#be4bdb', // Violet
]

export const getEmptyValue = (mode: CalendarMode): CalendarValue => {
  if (mode === 'multiple' || mode === 'rainbow') return []
  if (mode === 'range') return { from: null, to: null }
  return null
}

export const asRange = (value: CalendarValue): DateRange =>
  value && !Array.isArray(value) && !(value instanceof Date) ? (value as DateRange) : { from: null, to: null }

export const asArray = (value: CalendarValue): Date[] => (Array.isArray(value) ? value : [])

export const inferSeedDate = (mode: CalendarMode, value: CalendarValue | undefined): Date | null => {
  if (!value) return null
  if (mode === 'single') return value as Date
  if (mode === 'multiple' || mode === 'rainbow') return (value as Date[])[0] ?? null
  return (value as DateRange).from
}

// used to save the grid cell 'date' as dataset
export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// used to parse the grid cell 'date' from the dataset
export const parseDateString = (rawDate: string | undefined): Date | null => {
  if (!rawDate) return null
  const [year, month, day] = rawDate.split('-').map(Number)

  if (year === undefined || month === undefined || day === undefined) return null
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return null

  return new Date(year, month - 1, day)
}

export const NAVIGATION_KEYS = new Set([
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  'PageUp',
  'PageDown',
  'Enter',
  ' ',
])
