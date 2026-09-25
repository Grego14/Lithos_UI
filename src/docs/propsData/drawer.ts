import type { PropItem } from '../../components/ui/PropsTable'

export const drawerPropsData: PropItem[] = [
  {
    name: 'open',
    type: 'boolean',
    required: true,
    description: 'Controls the visibility state of the drawer.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    required: true,
    description: 'Callback fired when the open state changes.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'The content to be rendered inside the drawer container.',
  },
  {
    name: 'trigger',
    type: 'ReactNode',
    defaultValue: 'undefined',
    required: false,
    description: 'The element that triggers the drawer. Required when mode is "temporary".',
  },
  {
    name: 'mode',
    type: "'temporary' | 'permanent' | 'mini'",
    defaultValue: "'temporary'",
    required: false,
    description:
      'The display mode of the drawer. Temporary renders an overlay modal, while permanent and mini integrate into the document layout.',
  },
  {
    name: 'placement',
    type: "'left' | 'right' | 'top' | 'bottom'",
    defaultValue: "'right'",
    required: false,
    description: 'Position from where the drawer slides in. Permanent and mini modes only accept "left" or "right".',
  },
  {
    name: 'transition',
    type: 'DrawerTransition',
    defaultValue: "'slide'",
    required: false,
    description: 'Type of animation applied when opening or closing the drawer.',
  },
  {
    name: 'transformOrigin',
    type: 'DrawerTransformOrigin',
    defaultValue: "'center'",
    required: false,
    description: 'Sets the transform-origin point for zoom or scale transition effects.',
  },
  {
    name: 'transitionDuration',
    type: 'DrawerTransitionDuration',
    defaultValue: '150',
    required: false,
    description: 'Duration of the opening and closing transitions.',
  },
  {
    name: 'collapsedWidth',
    type: 'string',
    defaultValue: "'w-0'",
    required: false,
    description:
      'Width class applied when the drawer is collapsed in "permanent" or "mini" modes. (uses w-16 by default on "mini")',
  },
  {
    name: 'expandedWidth',
    type: 'string',
    defaultValue: "'w-64'",
    required: false,
    description: 'Width class applied when the drawer is expanded in "permanent" or "mini" modes.',
  },
  {
    name: 'indicator',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Displays a visual pull-handle or bar indicator for drag gestures.',
  },
  {
    name: 'indicatorLabel',
    type: 'string',
    defaultValue: "'Drag handle'",
    required: false,
    description: 'Accessible label for the drag indicator handle.',
  },
  {
    name: 'swipeOnlyOnIndicator',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'When true, drag-to-close swipe gestures are restricted exclusively to the indicator element.',
  },
  {
    name: 'threshold',
    type: 'number',
    defaultValue: '100',
    required: false,
    description: 'Minimum drag distance in pixels required to trigger auto-closing on swipe.',
  },
  {
    name: 'onEnter',
    type: '() => void',
    required: false,
    description: 'Callback fired when the open transition finishes.',
  },
  {
    name: 'onExit',
    type: '() => void',
    required: false,
    description: 'Callback fired when the close transition finishes.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes applied to the drawer content container.',
  },
  {
    name: 'backdropClass',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes applied to the backdrop layer.',
  },
  {
    name: 'role',
    type: 'DrawerRole',
    defaultValue: "'dialog'",
    required: false,
    description: 'ARIA role assigned to the drawer container for accessibility.',
  },
  {
    name: 'aria-describedby',
    type: 'string',
    required: false,
    description: 'Identifies the element that describes the content inside the drawer.',
  },
]

export const useDrawerReturnData: PropItem[] = [
  {
    name: 'open',
    type: 'boolean',
    required: true,
    description: 'Current open state of the parent drawer.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    required: true,
    description: 'Function to manually trigger opening or closing the parent drawer.',
  },
]
