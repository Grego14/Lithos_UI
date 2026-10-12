/**
 * @fileoverview Lithos UI command palette type definitions and interfaces.
 * - Defines metadata structures, context contracts, and configuration props for command palette primitives.
 */
import type { ReactNode } from 'react'
import type { LithosElementProps } from '../../../core/types'
import type { DialogProps } from '../Dialog'
import type { KbdProps, KbdSize, KbdVariant } from '../Kbd'
import type { BadgeProps } from '../Badge'

/**
 * Internal metadata structure representing a registered command item.
 */
export interface CommandItemMeta {
  /** Unique identifier for the command item. */
  id: string

  /** Display text value used for search filtering. */
  value: string

  /** Identifier of the parent command group, if nested. */
  groupId?: string | undefined

  /** Disables interaction and selection for the item. */
  disabled?: boolean | undefined

  /** Alternative search keywords associated with the item. */
  keywords?: string[] | undefined

  /** Callback function triggered upon item selection. */
  onSelect?: (() => void) | undefined
}

/**
 * Context value contract providing command palette state and action dispatchers.
 */
export interface CommandContextValue {
  /** Current search query string. */
  search: string

  /** Setter function to update the search query. */
  setSearch: (search: string) => void

  /** Identifier of the currently focused active item. */
  activeId: string | null

  /** Setter function to update the active item identifier. */
  setActiveId: (id: string | null) => void

  /** Registration method called by items to announce themselves to the command list. */
  registerItem: (meta: CommandItemMeta) => () => void

  /** Filtering validation function checking values and keywords against the search query. */
  filterItem: (itemValue: string, keywords?: string[]) => boolean

  /** HTML identifier assigned to the command listbox. */
  listId: string

  /** Map collection of all registered items. */
  items: Map<string, CommandItemMeta>

  /** Total count of items currently matching search filters. */
  visibleItemsCount: number

  /** Evaluates whether a specific group contains visible items. */
  isGroupVisible: (groupId: string) => boolean

  /** Enforces that search query must be present to display results. */
  requireSearch?: boolean

  /** Indicates whether the command palette container is currently open/visible. */
  isOpen: boolean

  /** Setter function to update open state visibility. */
  setIsOpen: (isOpen: boolean) => void
}

/**
 * Context value contract for nested command groups.
 */
export interface GroupContextValue {
  /** Unique group identifier string. */
  groupId: string
}

/**
 * Props for the root `Command` component.
 */
export interface CommandProps extends LithosElementProps<'div'> {
  /** Controlled search query value string. */
  value?: string

  /** Callback function triggered when search query changes. */
  onValueChange?: (value: string) => void

  /** Custom filtering function evaluating items against search queries and keywords. */
  filter?: (value: string, search: string, keywords?: string[]) => boolean

  /** Enforces that search query must be present to display items. */
  requireSearch?: boolean

  /** Child elements containing command inputs, lists, and items. */
  children?: ReactNode
}

/**
 * Props for the `CommandInput` component.
 */
export interface CommandInputProps extends Omit<LithosElementProps<'input'>, 'value' | 'onChange'> {
  /** Controlled input text value string. */
  value?: string

  /** Callback function triggered when input text changes. */
  onValueChange?: (value: string) => void

  /** Custom leading icon element rendered inside the input wrapper. */
  icon?: ReactNode

  /** Displays a clear button when the input contains text. */
  clearable?: boolean
}

/**
 * Props for the `CommandList` container component.
 */
export interface CommandListProps extends LithosElementProps<'div'> {
  /** Child items, groups, and separators. */
  children?: ReactNode
}

/**
 * Props for the `CommandEmpty` component.
 */
export type CommandEmptyProps = LithosElementProps<'div'>

/**
 * Props for the `CommandLoading` component.
 */
export type CommandLoadingProps = LithosElementProps<'div'>

/**
 * Props for the `CommandGroup` component.
 */
export interface CommandGroupProps extends LithosElementProps<'div'> {
  /** Heading header node for the command group section. */
  heading?: ReactNode

  /** Group items. */
  children?: ReactNode
}

/**
 * Props for the `CommandItem` component.
 */
export interface CommandItemProps extends Omit<LithosElementProps<'div'>, 'onSelect'> {
  /** Explicit custom string value for search indexing. */
  value?: string

  /** Alternative search keywords. */
  keywords?: string[]

  /** Disables item selection. */
  disabled?: boolean

  /** Callback function triggered upon selection. */
  onSelect?: (value: string) => void

  /** Item content. */
  children?: ReactNode
}

/**
 * Props for the `CommandShortcut` component.
 */
export interface CommandShortcutProps extends Omit<KbdProps, 'size'> {
  /** Keyboard badge size scale. */
  size?: KbdSize

  /** Visual style variant. */
  variant?: KbdVariant

  /** Keyboard shortcut key identifiers. */
  children?: ReactNode
}

/**
 * Props for the `CommandBadge` component.
 */
export type CommandBadgeProps = BadgeProps

/**
 * Props for the `CommandSeparator` divider component.
 */
export type CommandSeparatorProps = LithosElementProps<'div'>

/**
 * Props for the `CommandItemDescription` component.
 */
export interface CommandItemDescriptionProps extends LithosElementProps<'span'> {
  /** Explanatory description content. */
  children?: ReactNode
}

/**
 * Props for the `CommandFooter` component.
 */
export interface CommandFooterProps extends LithosElementProps<'div'> {
  /** Displays standard keyboard navigation hints in the footer. */
  showNavigationHints?: boolean

  /** Displays visible items counter in the footer. */
  showItemCount?: boolean

  /** Custom footer content overrides. */
  children?: ReactNode
}

/**
 * Props for the `CommandDialog` component.
 */
export interface CommandDialogProps extends Omit<DialogProps, 'size' | 'variant'> {
  /** Command palette container elements. */
  children?: ReactNode
}
