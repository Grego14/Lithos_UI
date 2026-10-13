import type { PropItem } from '../../components/ui/PropsTable'

export const iconPropsData: PropItem[] = [
  {
    name: 'size',
    type: 'number | string',
    defaultValue: '16',
    required: false,
    description: 'Icon dimensions in pixels or CSS units.',
  },
  {
    name: 'strokeWidth',
    type: 'number | string',
    defaultValue: '2',
    required: false,
    description: 'Vector stroke thickness.',
  },
  {
    name: 'color',
    type: 'string',
    defaultValue: '"currentColor"',
    required: false,
    description: 'Stroke color. Inherits currentColor by default.',
  },
]
