/**
 * @fileoverview Type definitions for Lithos UI Sidebar primitive suite.
 * - Discriminated union types supporting both button and polymorphic `asChild` child delegation (`SidebarItemProps`).
 * - Accessible landmark role mappings, layout modes, and strict type safety for compound sidebar subcomponents.
 */
import type { ReactNode, ComponentPropsWithRef, ElementType } from 'react'
import type { LithosClass } from '../../../utils/cn'
import type { ButtonProps } from '../Button'
import type { AsChildProps } from '../../../core/types'

/**
 * Defines the behavior mode of the sidebar.
 * - 'permanent': Always displayed at expanded width.
 * - 'mini': Can toggle between expanded and collapsed widths.
 */
export type SidebarMode = 'permanent' | 'mini'

/**
 * Accessible ARIA landmarks mapped to container HTML elements.
 */
export type SidebarRole = 'complementary' | 'region' | 'navigation'

/**
 * Callback function to update the sidebar open/collapsed state.
 */
export type SidebarSetOpen = (open: boolean) => void

/**
 * HTML container elements mapped from ARIA landmark roles.
 */
export type SidebarContainerElement = 'div' | 'section' | 'nav' | 'aside'

/**
 * Props for the root `Sidebar` provider wrapper.
 */
export interface SidebarProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  /** Controls whether the mini sidebar is expanded. */
  open?: boolean

  /** State updater callback for `open`. */
  setOpen?: SidebarSetOpen

  /** Layout mode of the sidebar. Default: `'permanent'`. */
  mode?: SidebarMode

  /** ARIA landmark role that defines the semantic container tag. Default: `'complementary'`. */
  role?: SidebarRole

  /** Children nodes. */
  children?: ReactNode

  /** Additional CSS classes for the root container. */
  className?: LithosClass
}

/**
 * Props for the main structural container of the sidebar.
 */
export type SidebarContentProps<T extends ElementType = 'aside'> = {
  /** Tailwind width class for collapsed state (e.g. `'w-16'`). */
  collapsedWidth?: string

  /** Tailwind width class for expanded state (e.g. `'w-56'`). */
  expandedWidth?: string

  /** Additional CSS classes. */
  className?: LithosClass
} & Omit<ComponentPropsWithRef<T>, 'className'>

/** Base properties shared across all SidebarTrigger variants. */
export type BaseSidebarTriggerProps = {
  /** Custom icon or content for the toggle button. */
  children?: ReactNode

  /** Additional CSS classes for the button. */
  className?: LithosClass

  /** Accessible label added to the trigger button. */
  label?: string

  /** Pixel dimension for default render icons. Default: `18`. */
  iconSize?: number
}

/**
 * Component props for SidebarTrigger, supporting both standard button rendering
 * and child component delegation via `asChild`.
 */
export type SidebarTriggerProps<T extends ElementType = 'button'> = AsChildProps<BaseSidebarTriggerProps, 'button', T>

/** Base properties shared across all SidebarItem variants. */
export type BaseSidebarItemProps = {
  /** Icon displayed on the left or centered when collapsed. */
  icon?: ReactNode

  /** Active navigation state. */
  active?: boolean

  /** Additional CSS classes. */
  className?: LithosClass
}

/**
 * Component props for SidebarItem, supporting both standard button rendering
 * and child component delegation via `asChild`.
 */
export type SidebarItemProps<T extends ElementType = 'button'> = AsChildProps<
  BaseSidebarItemProps & Omit<ButtonProps, 'className'>,
  'button',
  T
>
