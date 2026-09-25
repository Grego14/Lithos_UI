import type { PropItem } from '../../components/ui/PropsTable'

export const commandPropsData: PropItem[] = [
  {
    name: 'value',
    type: 'string',
    required: false,
    description: 'Controlled search query value.',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    required: false,
    description: 'Callback triggered whenever the search query value changes.',
  },
  {
    name: 'filter',
    type: '(value: string, search: string, keywords?: string[]) => boolean',
    required: false,
    description: 'Custom filtering predicate to override standard substring matching.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes applied to the root container.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Command components composed together (CommandInput, CommandList, etc.).',
  },
]

export const commandInputPropsData: PropItem[] = [
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: "'Type a command or search...'",
    required: false,
    description: 'Placeholder string for the search input.',
  },
  {
    name: 'value',
    type: 'string',
    required: false,
    description: 'Controlled input string value.',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    required: false,
    description: 'Callback fired on every input character mutation.',
  },
  {
    name: 'icon',
    type: 'ReactNode',
    required: false,
    description: 'Custom search prefix icon, defaults to IconSearch.',
  },
  {
    name: 'clearable',
    type: 'boolean',
    defaultValue: 'true',
    required: false,
    description: 'Displays a quick clear button (IconClose) when query text is typed.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes for the input field.',
  },
]

export const commandItemPropsData: PropItem[] = [
  {
    name: 'value',
    type: 'string',
    required: false,
    description: 'Unique text value for the item used for search matching and onSelect.',
  },
  {
    name: 'keywords',
    type: 'string[]',
    required: false,
    description: 'Supplemental search terms for fuzzy/keyword matching.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Prevents selection and skips this item in keyboard navigation.',
  },
  {
    name: 'onSelect',
    type: '(value: string) => void',
    required: false,
    description: 'Callback fired when the item is activated via click, Enter, or Space.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes applied to the item.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Item content, icon, label, and CommandShortcut.',
  },
]

export const commandGroupPropsData: PropItem[] = [
  {
    name: 'heading',
    type: 'ReactNode',
    required: false,
    description: 'Group label heading shown above child items.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes for the group wrapper.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'CommandItem and CommandSeparator elements inside this group.',
  },
]

export const commandDialogPropsData: PropItem[] = [
  {
    name: 'open',
    type: 'boolean',
    required: true,
    description: 'Controls visibility of the command palette modal dialog.',
  },
  {
    name: 'onClose',
    type: '() => void',
    required: true,
    description: 'Callback invoked when Escape is pressed or the backdrop is clicked.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes applied to the modal dialog shell.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Typically a Command root composed with input and list.',
  },
]
