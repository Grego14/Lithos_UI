/**
 * @fileoverview Lithos UI Dropdown primitive type definitions and interface declarations.
 * - Exports TypeScript types, navigation structures, context contracts, and configuration props for dropdown components.
 */
import type { ReactNode, RefObject, Dispatch, SetStateAction } from 'react'
import type { PopoverProps, PopoverContentProps } from '../Popover'
import type { LithosElementProps } from '../../../core/types'
import type { ReferenceType } from '@floating-ui/react'

/** Placement anchor configurations for dropdown menus relative to their trigger elements. */
export type DropdownPlacement = 'bottom-start' | 'bottom-end'

/** Props configuration interface for the root `Dropdown` component. */
export interface DropdownProps extends PopoverProps {
  /** Alignment placement configuration of the dropdown floating panel. */
  placement?: DropdownPlacement
}

/** Props configuration interface for the `DropdownContent` component. */
export interface DropdownContentProps extends PopoverContentProps {
  /** Enables keyboard navigation wrapping loops from last to first item and vice versa. */
  loop?: boolean

  /** Callback function triggered to close nested submenu layers. */
  onCloseSubmenu?: () => void
}

/** Props configuration interface for the `DropdownGroup` component. */
export interface DropdownGroupProps extends LithosElementProps<'div'> {
  /** Optional section header label string describing the group category. */
  label?: string
}

/** Props configuration interface for the `DropdownItem` component. */
export type DropdownItemProps = LithosElementProps<'button'>

/**
 * Context value contract for dropdown list keyboard navigation and submenu interactions.
 */
export interface DropdownNavigation {
  /** Index position of the currently focused active item in the list. */
  activeIndex: number | null

  /** React state dispatcher function to update the active item index state. */
  setActiveIndex: Dispatch<SetStateAction<number | null>>

  /** Opens a nested submenu attached to a specific item index. */
  openSubmenuAtIndex: (index: number) => void

  /** Closes the parent submenu layer. */
  closeParentSubmenu: () => void
}

/** Props configuration interface for the `DropdownSeparator` divider component. */
export type DropdownSeparatorProps = LithosElementProps<'div'>

/** Props configuration interface for the `DropdownSub` nested menu component. */
export interface DropdownSubProps extends PopoverProps {
  /** Trigger content element or node rendered for the submenu item. */
  trigger: ReactNode

  /** Disables interaction and hover/focus triggers for the submenu. */
  disabled?: boolean
}

/** Context value contract for the root dropdown menu state and reference targets. */
export interface DropdownContextType {
  /** Indicates whether the dropdown menu panel is currently open. */
  open: boolean

  /** Toggles the open state of the dropdown menu. */
  toggle: () => void

  /** Closes the dropdown menu panel. */
  close: () => void

  /** Reference object tracking the trigger element anchor reference. */
  triggerRef: RefObject<ReferenceType | null>
}
