import type { PropItem } from '../../components/ui/PropsTable'

export const toggleProps: PropItem[] = [
  {
    name: 'checked',
    type: 'boolean',
    required: true,
    description: 'Controls the toggle state. True renders the thumb translated and inverted colors.'
  },
  {
    name: 'onToggle',
    type: '() => void',
    required: true,
    description: 'Callback fired when the toggle is clicked.'
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '"Theme Changed"',
    required: false,
    description: 'Accessible label announced by screen readers and used as aria-label.'
  }
]
