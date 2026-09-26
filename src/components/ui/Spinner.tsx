/**
 * @fileoverview Lithos UI Spinner primitive.
 * - Neobrutalism inspired loading indicator.
 * - Uses FiLoader for the spinning icon.
 */
import type { ComponentPropsWithRef, ElementType } from 'react'
import { FiLoader } from 'react-icons/fi'
import { cn, type LithosClass } from '../../utils/cn'

export type SpinnerVariant = 'default' | 'accent' | 'inverse'

export interface SpinnerProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  size?: number | string
  color?: string
  variant?: SpinnerVariant
  icon?: ElementType
  className?: LithosClass
}

const variantClass: Record<SpinnerVariant, string> = {
  default: 'text-(--lithos-text)',
  accent: 'text-(--lithos-accent)',
  inverse: 'text-(--lithos-bg)',
}

export const Spinner = ({
  size = 24,
  color,
  variant = 'default',
  icon: Icon = FiLoader,
  className,
  ...rest
}: SpinnerProps) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('inline-flex items-center justify-center animate-spin', !color && variantClass[variant], className)}
      style={{ color }}
      {...rest}
    >
      <Icon size={size} strokeWidth={3} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
