/**
 * @fileoverview Native single-value slider with Lithos track and thumb geometry.
 * - The browser owns pointer, touch, keyboard, bounds, and uncontrolled form state.
 * - Track/thumb styles use theme tokens and zero-blur shadows without layout gaps.
 * - Exception to lithos-click: translating a range input would move its hit target
 *   during a drag. Only the thumb shadow changes on interaction instead.
 */
import type { LithosElementProps } from '../../core/types'
import { cn } from '../../utils/cn'
import { getContrastText } from '../../utils/yiq'

/** Props for a horizontal, single-value native range input. */
export interface SliderProps extends Omit<
  LithosElementProps<'input'>,
  'type' | 'size' | 'value' | 'defaultValue' | 'min' | 'max' | 'step' | 'children'
> {
  /** Controlled numeric value. Use with onValueChange or onChange. */
  value?: number
  /** Initial uncontrolled value; defaults to the browser's midpoint. */
  defaultValue?: number
  /** Lower bound. @default 0 */
  min?: number
  /** Upper bound. @default 100 */
  max?: number
  /** Allowed increment, or 'any' for continuous values. @default 1 */
  step?: number | 'any'
  /** Thumb size; the focusable input stays at least 44px tall. @default 'md' */
  size?: 'sm' | 'md' | 'lg'
  /** Track and thumb shape. Omit to follow the global radius token. */
  shape?: 'square' | 'round'
  /** Custom thumb color. Its border contrast is resolved by the YIQ engine. */
  color?: string
  /** Called with the native numeric value on every user change. */
  onValueChange?: (value: number) => void
}

const sizes = {
  sm: '[&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:-mt-1.5 [&::-moz-range-thumb]:size-4',
  md: '[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:-mt-2 [&::-moz-range-thumb]:size-5',
  lg: '[&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:-mt-2.5 [&::-moz-range-thumb]:size-6',
}

const shapes = {
  square:
    '[&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:rounded-none [&::-webkit-slider-runnable-track]:rounded-none [&::-moz-range-track]:rounded-none',
  round:
    '[&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-runnable-track]:rounded-full [&::-moz-range-track]:rounded-full',
}

/** A native slider; supply a visible label or aria-label for its accessible name. */
export const Slider = ({
  className,
  size = 'md',
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onValueChange,
  shape,
  color,
  style,
  ...props
}: SliderProps) => (
  <input
    {...props}
    type="range"
    min={min}
    max={max}
    step={step}
    className={cn(
      'block h-11 w-full min-w-0 cursor-pointer appearance-none bg-transparent rounded-(--lithos-radius) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--lithos-border) disabled:cursor-not-allowed disabled:opacity-50',
      '[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-(--lithos-radius) [&::-webkit-slider-runnable-track]:border-2 [&::-webkit-slider-runnable-track]:border-(--lithos-border) [&::-webkit-slider-runnable-track]:bg-(--lithos-surface) [&::-webkit-slider-runnable-track]:shadow-[2px_2px_0_0_var(--lithos-shadow)]',
      '[&::-moz-range-track]:box-border [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-(--lithos-radius) [&::-moz-range-track]:border-2 [&::-moz-range-track]:border-(--lithos-border) [&::-moz-range-track]:bg-(--lithos-surface) [&::-moz-range-track]:shadow-[2px_2px_0_0_var(--lithos-shadow)]',
      '[&::-webkit-slider-thumb]:box-border [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-(--lithos-radius) [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--slider-border,var(--lithos-border))] [&::-webkit-slider-thumb]:bg-[var(--slider-color,var(--lithos-accent))] [&::-webkit-slider-thumb]:shadow-[2px_2px_0_0_var(--lithos-shadow)]',
      '[&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:rounded-(--lithos-radius) [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[var(--slider-border,var(--lithos-border))] [&::-moz-range-thumb]:bg-[var(--slider-color,var(--lithos-accent))] [&::-moz-range-thumb]:shadow-[2px_2px_0_0_var(--lithos-shadow)]',
      'enabled:active:[&::-webkit-slider-thumb]:shadow-none enabled:active:[&::-moz-range-thumb]:shadow-none',
      sizes[size],
      shape && shapes[shape],
      className
    )}
    style={color ? { '--slider-color': color, '--slider-border': getContrastText(color), ...style } : style}
    onChange={
      onValueChange
        ? (event) => {
            const nextValue = event.currentTarget.valueAsNumber
            onChange?.(event)
            onValueChange(nextValue)
          }
        : onChange
    }
  />
)
