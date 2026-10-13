/**
 * @fileoverview Lithos UI icon primitive type definitions and geometry constants.
 */
import type { IconBaseProps } from 'react-icons'

/**
 * Default geometry values for Lithos UI icons.
 */
export const iconDefaults = {
  size: 16,
  strokeWidth: 2,
} as const

/**
 * Props for Lithos UI icon primitives extending `react-icons`.
 */
export interface IconProps extends IconBaseProps {
  /**
   * Width and height of the icon.
   * @default 16
   */
  size?: number | string

  /**
   * Vector stroke thickness.
   * @default 2
   */
  strokeWidth?: number | string

  /**
   * Stroke color. Defaults to cascading from text color.
   * @default 'currentColor'
   */
  color?: string
}
