import type { PropItem } from '../../components/ui/PropsTable'

export const tooltipPropsData: PropItem[] = [
  {
    name: 'initialOpen',
    type: 'boolean',
    defaultValue: 'false',
    description: 'The initial open state of the tooltip in uncontrolled mode.',
  },
  {
    name: 'placement',
    type: 'Placement',
    defaultValue: '"top"',
    description:
      'The preferred placement of the tooltip relative to the trigger. (e.g., top, bottom, left-end, right-start)',
  },
  {
    name: 'open',
    type: 'boolean',
    description: 'The controlled open state of the tooltip. Must be used with onOpenChange.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    description: 'Event handler called when the open state changes.',
  },
  {
    name: 'offset',
    type: 'number',
    defaultValue: '4',
    description: 'The distance in pixels between the tooltip and the trigger.',
  },
]

export const tooltipTriggerPropsData: PropItem[] = [
  {
    name: 'asChild',
    type: 'boolean',
    defaultValue: 'false',
    description: 'If true, merges its props and refs onto its child element instead of rendering a wrapper <button>.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional CSS classes to apply to the trigger.',
  },
]

export const tooltipContentPropsData: PropItem[] = [
  {
    name: 'variant',
    type: '"default" | "primary" | "inverse"',
    defaultValue: '"default"',
    description: 'The visual style variant of the tooltip.',
  },
  {
    name: 'portaled',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Whether to render the tooltip content in a React portal.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the content container.',
  },
]
