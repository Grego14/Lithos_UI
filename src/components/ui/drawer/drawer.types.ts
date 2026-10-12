/**
 * @fileoverview Lithos UI Drawer type definitions and interface declarations.
 * - Exports TypeScript types, unions, and accessibility-compliant props for drawer components and hooks.
 */
import type { ReactNode } from 'react'
import type { LithosClass } from '../../../utils/cn'
import type { LithosElementProps, SurfaceGestureHandlers } from '../../../core/types'

/**
 * Horizontal placement edge configurations for the drawer container.
 */
export type DrawerHorizontalPlacement = 'left' | 'right'

/**
 * Vertical placement edge configurations for the drawer container.
 */
export type DrawerVerticalPlacement = 'top' | 'bottom'

/**
 * All supported edge placement directions for the drawer container.
 */
export type DrawerPlacement = DrawerHorizontalPlacement | DrawerVerticalPlacement

/**
 * Animation transition effect styles applied during open/close cycles.
 */
export type DrawerTransition = 'slide' | 'fade' | 'zoom'

/**
 * Origin coordinate points for CSS transform scaling and positioning.
 */
export type DrawerTransformOrigin =
  'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

/**
 * Operational rendering modes supported by the drawer.
 */
export type DrawerMode = 'default' | 'responsive'

/**
 * Transition duration configuration scale in milliseconds.
 */
export type DrawerTransitionDuration = number | { enter: number; exit: number }

/**
 * Enforces accessible naming conventions requiring either an aria-label or an aria-labelledby reference.
 */
type AccessibleNameProps =
  | {
      /** Accessible string label for the drawer. Required if `aria-labelledby` is omitted. */
      'aria-label': string

      /** Identifier of the element labeling the drawer. */
      'aria-labelledby'?: string
    }
  | {
      /** Accessible string label for the drawer. */
      'aria-label'?: string

      /** Identifier of the element labeling the drawer. Required if `aria-label` is omitted. */
      'aria-labelledby': string
    }

/**
 * Context value contract shared across drawer sub-components.
 */
export interface DrawerContextValue {
  /** Current open visibility state of the parent drawer. */
  open: boolean

  /** Callback function triggered to request opening or closing the parent drawer. */
  onOpenChange: (open: boolean) => void

  /** Operational rendering mode of the drawer container. */
  mode?: DrawerMode

  /** Indicates whether the current viewport matches the desktop breakpoint media query. */
  isDesktop?: boolean

  /** Unique HTML identifier assigned to the drawer title element for accessibility associations. */
  titleId?: string
}

/**
 * Props configuration interface for the root `Drawer` component.
 */
export type DrawerProps = AccessibleNameProps & {
  /**
   * Controls the open state of the drawer.
   */
  open: boolean

  /**
   * Callback fired when the drawer open state changes.
   */
  onOpenChange: (open: boolean) => void

  /**
   * Transition effect applied when opening or closing the drawer.
   * @default 'slide'
   */
  transition?: DrawerTransition

  /**
   * Origin point for CSS transform animations.
   * @default 'center'
   */
  transformOrigin?: DrawerTransformOrigin

  /** Content to render inside the drawer. */
  children: ReactNode

  /** Callback fired when the enter transition starts. */
  onEnter?: () => void

  /** Callback fired when the exit transition ends. */
  onExit?: () => void

  /** Additional CSS classes for the drawer main panel container. */
  className?: LithosClass

  /**
   * Additional CSS classes for the backdrop overlay.
   * @default 'bg-black/50'
   */
  backdropClass?: LithosClass

  /** ID of the element that describes the drawer content for screen readers. */
  'aria-describedby'?: string

  /**
   * Transition duration in milliseconds. Can be a single number or an object with `enter` and `exit` values.
   * @default 150
   */
  transitionDuration?: DrawerTransitionDuration

  /**
   * Whether to display a visual swipe handle indicator.
   * @default placement === 'bottom' || placement === 'top'
   */
  indicator?: boolean

  /** Accessible label for the swipe handle indicator. */
  indicatorLabel?: string

  /**
   * If `true`, drag/swipe gestures will only trigger when dragging directly from the handle indicator.
   * @default false
   */
  swipeOnlyOnIndicator?: boolean

  /**
   * Whether swipe/drag gesture is allowed directly on the drawer content.
   * If set to `false`, interactive elements won't capture pointer drag events.
   * @default true
   */
  allowSwipeOnContent?: boolean

  /**
   * Minimum swipe distance in pixels required to trigger the close action.
   * @default 100
   */
  threshold?: number

  /**
   * Drawer rendering mode. Responsive mode automatically converts to a Dialog on desktop.
   * @default 'default'
   */
  mode?: DrawerMode

  /**
   * Placement edge where the drawer enters from.
   * @default mode === 'responsive' ? 'bottom' : 'right'
   */
  placement?: DrawerPlacement

  /** Trigger element used to open the drawer. */
  trigger?: ReactNode
}

/**
 * Props configuration interface for the `DrawerHeader` component.
 */
export type DrawerHeaderProps = LithosElementProps<'div'>

/**
 * Props configuration interface for the `DrawerBody` component.
 */
export type DrawerBodyProps = LithosElementProps<'div'>

/**
 * Props configuration interface for the `DrawerFooter` component.
 */
export type DrawerFooterProps = LithosElementProps<'div'>

/**
 * Props configuration interface for the `DrawerTitle` component.
 */
export type DrawerTitleProps = LithosElementProps<'h2'>

/**
 * Props configuration interface for the `DrawerIndicator` component.
 */
export interface DrawerIndicatorProps {
  /** Edge placement orientation of the drawer. */
  placement: DrawerPlacement

  /** Gesture event handlers for drag interactions. */
  swipeHandlers?: SurfaceGestureHandlers | undefined

  /**
   * Accessible label for the drag handle.
   * @default 'Drag handle'
   */
  'aria-label'?: string | undefined
}
