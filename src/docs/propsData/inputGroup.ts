import type { PropItem } from '../../components/ui/PropsTable'

export const inputGroupPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'The InputGroupInput and InputGroupAddon elements composing the field.',
  },
  {
    name: 'className',
    type: 'ClassValue | ClassArray',
    defaultValue: '""',
    required: false,
    description: 'Additional CSS classes for the frame. Use max-w-* here to constrain the group width.',
  },
  {
    name: 'ref',
    type: 'Ref<HTMLDivElement>',
    required: false,
    description: 'Ref forwarded to the group container.',
  },
]

export const inputGroupInputPropsData: PropItem[] = [
  {
    name: '...props',
    type: 'ComponentPropsWithRef<"input">',
    required: false,
    description:
      'Every prop accepted by the Input primitive (placeholder, type, disabled, invalid, etc.) is forwarded.',
  },
]

export const inputGroupAddonPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Addon content, usually an icon or short helper text.',
  },
  {
    name: 'align',
    type: '"inline-start" | "inline-end"',
    defaultValue: '"inline-start"',
    required: false,
    description: 'Pins the addon to the leading or trailing edge of the group, independent of DOM order.',
  },
  {
    name: 'className',
    type: 'ClassValue | ClassArray',
    defaultValue: '""',
    required: false,
    description: 'Additional CSS classes for the addon segment.',
  },
]
