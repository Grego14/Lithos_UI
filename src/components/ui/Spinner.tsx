/**
 * @fileoverview Lithos UI Spinner primitive.
 * - Neobrutalism inspired loading indicator.
 * - Uses FiLoader for the spinning icon.
 */
import type { ComponentPropsWithRef } from 'react'
import { FiLoader } from 'react-icons/fi'
import { cn, type LithosClass } from '../../utils/cn'

export interface SpinnerProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  size?: number | string
  color?: string
  className?: LithosClass
}

export const Spinner = ({ size = 24, color, className, ...rest }: SpinnerProps) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('inline-flex items-center justify-center animate-spin', className)}
      style={{ color }}
      {...rest}
    >
      <FiLoader size={size} strokeWidth={3} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
