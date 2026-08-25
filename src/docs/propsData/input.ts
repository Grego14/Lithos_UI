import type { PropItem } from '../../components/ui/PropsTable'

export const inputPropsData: PropItem[] = [
  {
    name: 'className',
    type: 'ClassValue | ClassArray',
    defaultValue: '""',
    required: false,
    description: 'Additional CSS classes to apply custom styles.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Applies the system error color to the border for validation feedback.',
  },
  {
    name: 'ref',
    type: 'Ref<HTMLInputElement>',
    required: false,
    description: 'Ref forwarded to the underlying input element.',
  },
  {
    name: '...props',
    type: 'ComponentPropsWithRef<"input">',
    required: false,
    description:
      'All native input attributes (type, placeholder, value, onChange, disabled, etc.) are forwarded to the element.',
  },
]
