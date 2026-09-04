export const popoverPropsData = [
  {
    name: 'initialOpen',
    type: 'boolean',
    defaultValue: 'false',
    description: 'The initial open state of the popover in uncontrolled mode.',
  },
  {
    name: 'placement',
    type: 'Placement',
    defaultValue: '"bottom-start"',
    description:
      'The preferred placement of the popover relative to the trigger. (e.g., top, bottom, left-end, right-start)',
  },
  {
    name: 'modal',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the popover acts as a modal, trapping focus inside and preventing outside interaction.',
  },
  {
    name: 'open',
    type: 'boolean',
    description: 'The controlled open state of the popover. Must be used with onOpenChange.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    description: 'Event handler called when the open state changes.',
  },
]

export const popoverTriggerPropsData = [
  {
    name: 'asChild',
    type: 'boolean',
    defaultValue: 'false',
    description: 'If true, merges its props and refs onto its child element instead of rendering a wrapper <button>.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional CSS classes to apply to the trigger button.',
  },
]

export const popoverContentPropsData = [
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional CSS classes to apply to the content container.',
  },
]

export const popoverClosePropsData = [
  {
    name: 'onClick',
    type: 'function',
    description: 'Optional click handler executed before closing the popover.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional CSS classes to apply to the close button.',
  },
]
