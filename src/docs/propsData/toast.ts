import type { PropItem } from '../../components/ui/PropsTable'

export const toastProviderPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'The React node tree to be wrapped with the toast context.',
  },
]

export const toastPropsData: PropItem[] = [
  {
    name: 'message',
    type: 'string',
    required: true,
    description: 'The main body text displayed inside the toast notification.',
  },
  {
    name: 'title',
    type: 'string',
    required: false,
    description: 'Optional headline text rendered at the top of the toast.',
  },
  {
    name: 'type',
    type: '"default" | "success" | "error" | "warning" | "info"',
    defaultValue: '"default"',
    required: false,
    description: 'Defines the structural intent and default styling variant.',
  },
  {
    name: 'color',
    type: 'string',
    required: false,
    description: 'Custom inline CSS background or accent color variable.',
  },
]
