/**
 * @fileoverview Lithos UI button primitive.
 * - Centralizes `.lithos-click` physics behind a typed `variant` prop so call sites stop hand-rolling className strings.
 * - Text variant overrides `.lithos-click`'s border/shadow to stay flat: text only, no outline, no background fill.
 * - Zero-Gap Rule: `iconLeft`/`iconRight` spacing and `ButtonGroup` layout use explicit margins, never CSS `gap`.
 * - Native `type="button"` default prevents accidental form submission; opt into `type="submit"` explicitly.
 */
import type { ComponentPropsWithRef, ReactNode } from 'react'
import type { ButtonVariant } from '../../core/types'
import { cn, type LithosClass } from '../../utils/cn'
import { getContrastText } from '../../utils/yiq'

export interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'type' | 'className'> {
  variant?: ButtonVariant | undefined
  color?: string | undefined
  fullWidth?: boolean | undefined
  type?: 'button' | 'submit' | 'reset' | undefined
  iconLeft?: ReactNode
  iconRight?: ReactNode
  className?: LithosClass
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-(--lithos-accent) text-(--lithos-accent-text)',
  secondary: 'bg-(--lithos-surface) text-(--lithos-text)',
  accent: 'bg-(--lithos-surface) text-(--lithos-text) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text)',
  text: 'bg-transparent text-(--lithos-text) border-transparent shadow-none hover:shadow-none',
  solid: '',
}

export const Button = ({
  variant = 'primary',
  color,
  fullWidth = false,
  type = 'button',
  iconLeft,
  iconRight,
  className,
  children,
  style,
  ...rest
}: ButtonProps) => {
  const classes = [
    'lithos-click rounded-(--lithos-radius) disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    variantClass[variant],
    fullWidth && 'w-full',
    className,
  ]

  const isSolid = variant === 'solid'
  const solidColor = color || '#00FF00'
  const solidStyle = isSolid ? { backgroundColor: solidColor, color: getContrastText(solidColor) } : {}

  return (
    <button type={type} className={cn(classes)} style={{ ...solidStyle, ...style }} {...rest}>
      {iconLeft && (
        <span className="inline-flex shrink-0 mr-2" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      {children}
      {iconRight && (
        <span className="inline-flex shrink-0 ml-2" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  )
}

/**
 * ButtonGroup lays out `Button` primitives side by side (`horizontal`) or stacked (`vertical`).
 * `attached` fuses adjacent buttons into a single hard-bordered strip by collapsing the shared
 * border and popping the hovered/focused item's shadow above its neighbors via `z-10`.
 */
export interface ButtonGroupProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  mode?: 'horizontal' | 'vertical' | undefined
  attached?: boolean | undefined
  className?: LithosClass
}

export const ButtonGroup = ({
  mode = 'horizontal',
  attached = false,
  className,
  children,
  ...rest
}: ButtonGroupProps) => {
  const isVertical = mode === 'vertical'

  const classes = [
    'inline-flex flex-row',
    isVertical && 'flex-col',
    attached
      ? isVertical
        ? '[&>*:not(:first-child)]:-mt-0.5'
        : '[&>*:not(:first-child)]:-ml-0.5'
      : isVertical
        ? 'space-y-2'
        : 'space-x-2',
    className,
  ]

  return (
    <div role="group" className={cn(classes)} {...rest}>
      {children}
    </div>
  )
}
