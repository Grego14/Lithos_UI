import type { PropItem } from '../../components/ui/PropsTable'

export const iconPropsData: PropItem[] = [
  {
    name: 'size',
    type: 'number | string',
    defaultValue: '16',
    required: false,
    description: 'Width and height of the icon in pixels or CSS units.',
  },
  {
    name: 'strokeWidth',
    type: 'number | string',
    defaultValue: '2',
    required: false,
    description: 'Vector stroke thickness used to control the geometric weight of the icon lines.',
  },
  {
    name: 'color',
    type: 'string',
    defaultValue: '"currentColor"',
    required: false,
    description: 'Stroke color. Defaults to currentColor to automatically match text color or tokens.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    defaultValue: '""',
    required: false,
    description: 'Additional CSS classes for custom utility styling or animations.',
  },
  {
    name: 'fill',
    type: 'string',
    defaultValue: '"none"',
    required: false,
    description: 'Fill color for supported icons (such as IconHeart or radius preview icons).',
  },
]
