import type { ReactNode, RefObject } from 'react'
import type { PopoverOptions, PopoverContentProps } from '../Popover'

/**
 * Props for the root Tooltip component.
 * Extends PopoverOptions without modal configuration, as tooltips are strictly non-modal overlays.
 */
export type TooltipProps = Omit<PopoverOptions, 'modal'> & {
  /** The trigger and content components that form the tooltip UI. */
  children: ReactNode
}

/**
 * Return type provided by the Tooltip context.
 * Exposes open state controls alongside the SVG arrow element reference.
 */
export type TooltipReturn = {
  /** Indicates whether the tooltip is currently visible. */
  open: boolean

  /** Callback to programmatically update the tooltip visibility state. */
  setOpen: (open: boolean) => void

  /** Ref object attached to the FloatingArrow element inside TooltipContent. */
  arrowRef: RefObject<SVGSVGElement | null>
}

/**
 * Visual variant styles for the tooltip content surface.
 * - `default`: Standard dark/light surface using `--lithos-surface`.
 * - `primary`: Highlighted surface using `--lithos-accent`.
 * - `inverse`: High-contrast inverted surface using `--lithos-text`.
 */
export type TooltipVariant = 'default' | 'primary' | 'inverse'

/**
 * Props for the TooltipContent component.
 * Inherits all popover content props while introducing visual variant selection.
 */
export interface TooltipContentProps extends PopoverContentProps {
  /**
   * The visual appearance variant of the tooltip overlay.
   * @default 'default'
   */
  variant?: TooltipVariant
}
