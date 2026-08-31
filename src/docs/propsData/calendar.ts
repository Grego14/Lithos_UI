import type { PropItem } from '../../components/ui/PropsTable'
import type { LithosClass } from '../../utils/cn'

export const calendarPropsData: PropItem[] = [
  {
    name: 'mode',
    type: '"single" | "multiple" | "range" | "rainbow"',
    defaultValue: '"single"',
    required: false,
    description: 'Selection mode for the calendar.',
  },
  {
    name: 'value',
    type: 'CalendarValue',
    required: false,
    description: 'Controlled selected date(s).',
  },
  {
    name: 'defaultValue',
    type: 'CalendarValue',
    required: false,
    description: 'Initial selected date(s).',
  },
  {
    name: 'onChange',
    type: '(value: CalendarValue) => void',
    required: false,
    description: 'Callback when selection changes.',
  },
  {
    name: 'month',
    type: 'Date',
    required: false,
    description: 'Controlled displayed month.',
  },
  {
    name: 'defaultMonth',
    type: 'Date',
    required: false,
    description: 'Initial displayed month.',
  },
  {
    name: 'onMonthChange',
    type: '(month: Date) => void',
    required: false,
    description: 'Callback when month changes.',
  },
  {
    name: 'minDate',
    type: 'Date',
    required: false,
    description: 'Minimum selectable date.',
  },
  {
    name: 'maxDate',
    type: 'Date',
    required: false,
    description: 'Maximum selectable date.',
  },
  {
    name: 'disabledDates',
    type: '(Date | number)[]',
    required: false,
    description: 'Specific dates that cannot be selected.',
  },
  {
    name: 'isDateDisabled',
    type: '(date: Date) => boolean',
    required: false,
    description: 'Callback to determine if a date should be disabled.',
  },
  {
    name: 'dateColors',
    type: '{ dates: (Date | number)[], color: HexColor | string }[]',
    required: false,
    description: 'Assigns distinct colors per group of selected dates (e.g. leave types).',
  },
  {
    name: 'firstDayOfWeek',
    type: '0 | 1 | 2 | 3 | 4 | 5 | 6',
    defaultValue: '0',
    required: false,
    description: 'First day of the week (0 = Sunday, 1 = Monday, etc).',
  },
  {
    name: 'locale',
    type: 'string',
    required: false,
    description: 'Locale string for date formatting.',
  },
  {
    name: 'yearRange',
    type: '[number, number]',
    required: false,
    description: 'Min and max year range in the year dropdown.',
  },
  {
    name: 'classes',
    type: '{ [key in "container" | "header" | "nav" | "monthSelect" | "yearSelect" | "weekdays" | "grid" | "cell" | "day"]?: LithosClass }',
    required: false,
    description: 'Custom class overrides for calendar internal elements.',
  },
]
