/**
 * @fileoverview Lithos UI Drawer type definitions and interface declarations.
 * - Exports TypeScript types, unions, and accessibility-compliant props for drawer components and hooks.
 */
import type { ReactNode } from 'react'
import type { LithosClass } from '../../../utils/cn'

export type DrawerHorizontalPlacement = 'left' | 'right'
export type DrawerVerticalPlacement = 'top' | 'bottom'
export type DrawerPlacement = DrawerHorizontalPlacement | DrawerVerticalPlacement
export type DrawerTransition = 'slide' | 'fade' | 'zoom'
export type DrawerTransformOrigin =
  'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type DrawerMode = 'temporary' | 'permanent' | 'mini'
export type DrawerRole = 'dialog' | 'navigation' | 'complementary' | 'region'
export type DrawerTransitionDuration = number | { enter: number; exit: number }

type AccessibleNameProps =
  | {
      /**
       * Accessible label for the drawer. Required if `aria-labelledby` is not provided.
       */
      'aria-label': string
      'aria-labelledby'?: string
    }
  | {
      'aria-label'?: string
      /**
       * ID of the element that labels the drawer. Required if `aria-label` is not provided.
       */
      'aria-labelledby': string
    }

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
   * Origin point for CSS transform animations (useful for custom scale/zoom transitions).
   * @default 'center'
   */
  transformOrigin?: DrawerTransformOrigin

  /**
   * Content to render inside the drawer.
   */
  children: ReactNode

  /**
   * Callback fired when the enter transition starts.
   */
  onEnter?: () => void

  /**
   * Callback fired when the exit transition ends.
   */
  onExit?: () => void

  /**
   * Additional CSS classes for the drawer main panel container.
   */
  className?: LithosClass

  /**
   * Additional CSS classes for the backdrop overlay (only active in `temporary` mode).
   */
  backdropClass?: LithosClass

  /**
   * WAI-ARIA role attribute applied to the drawer container or landmark.
   * - `dialog`: Default for `temporary` mode.
   * - `complementary`: Default for `permanent` / `mini` modes (renders an `<aside>`).
   * - `navigation`: Recommended for main navigation links (renders a `<nav>`).
   * - `region`: Useful for generic landmark sections (renders a `<section>`).
   *
   * @note In `permanent` / `mini` modes, the root element dynamically adapts its HTML tag
   * (`<aside>`, `<nav>`, `<section>`) based on the assigned role.
   * In `temporary` mode, the root container preserves `role="dialog"` for modal accessibility
   * and wraps internal content with the corresponding semantic HTML landmark tag.
   */
  role?: DrawerRole

  /**
   * ID of the element that describes the drawer content for screen readers.
   */
  'aria-describedby'?: string

  /**
   * Transition duration in milliseconds. Can be a single number or an object with `enter` and `exit` values.
   * @default 150
   */
  transitionDuration?: DrawerTransitionDuration

  /**
   * Whether to display a visual swipe handle indicator.
   * @default false
   */
  indicator?: boolean

  /**
   * Accessible label for the swipe handle indicator.
   */
  indicatorLabel?: string

  /**
   * If `true`, drag/swipe gestures will only trigger when dragging directly from the handle indicator.
   * @default false
   */
  swipeOnlyOnIndicator?: boolean

  /**
   * Minimum swipe distance in pixels required to trigger the close action.
   * @default 50
   */
  threshold?: number
} & (
    | {
        /**
         * Display mode of the drawer.
         * - `temporary`: Displays over a backdrop overlay (modal behavior).
         * @default 'temporary'
         */
        mode?: 'temporary'

        /**
         * Side from which the drawer enters the screen.
         * @default 'left'
         */
        placement?: DrawerPlacement

        /**
         * Optional element that acts as a trigger to open the drawer.
         */
        trigger?: ReactNode

        collapsedWidth?: never
        expandedWidth?: never
      }
    | {
        /**
         * Display mode of the drawer.
         * - `permanent`: Integrates directly into the layout, expanding/collapsing in flow.
         * - `mini`: Collapses into a thin icon rail without hiding completely.
         */
        mode: 'permanent' | 'mini'

        /**
         * Horizontal side where the layout drawer is docked.
         * @default 'left'
         */
        placement?: DrawerHorizontalPlacement

        /**
         * Optional element that acts as a trigger to open the drawer.
         */
        trigger?: ReactNode

        /**
         * Custom CSS width class applied when collapsed in `mini` mode (e.g. `'w-16'`).
         */
        collapsedWidth?: string

        /**
         * Custom CSS width class applied when expanded in `permanent` or `mini` mode (e.g. `'w-64'`).
         */
        expandedWidth?: string
      }
  )

export interface UseDrawerSwipeOptions {
  /**
   * Vertical placement orientation for gesture detection.
   */
  placement: DrawerVerticalPlacement

  /**
   * Current open state.
   */
  open: boolean

  /**
   * Handler called when a swipe threshold is met to request closing.
   */
  onClose: () => void

  /**
   * Distance threshold in pixels required to register a swipe gesture.
   * @default 50
   */
  threshold?: number
}
