import type { ComponentPropsWithRef } from 'react'
import type { HexColor } from '../../../core/types'
import type { LithosClass } from '../../../utils/cn'

export type CalendarMode = 'single' | 'multiple' | 'range' | 'rainbow'

export interface DateRange {
  from: Date | null
  to: Date | null
}

export type CalendarValue = Date | null | Date[] | DateRange

export interface CalendarProps extends Omit<ComponentPropsWithRef<'div'>, 'defaultValue' | 'onChange'> {
  mode?: CalendarMode
  value?: CalendarValue
  defaultValue?: CalendarValue
  onChange?: (value: CalendarValue) => void
  month?: Date
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  minDate?: Date
  maxDate?: Date
  disabledDates?: (Date | number)[]
  isDateDisabled?: (date: Date) => boolean
  /** mode='multiple' only — assigns distinct colors per group of selected dates (e.g. leave types). */
  dateColors?: { dates: (Date | number)[]; color: HexColor | string }[]
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  locale?: string
  yearRange?: [number, number]

  classes?: {
    container?: LithosClass
    header?: LithosClass
    nav?: LithosClass
    monthSelect?: LithosClass
    yearSelect?: LithosClass
    weekdays?: LithosClass
    grid?: LithosClass
    cell?: LithosClass
    day?: LithosClass
  }
}
