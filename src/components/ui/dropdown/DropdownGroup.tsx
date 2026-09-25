/**
 * @fileoverview Lithos UI DropdownGroup primitive.
 * - Wraps a set of related menu items under a shared container with `role="group"`.
 * - Renders an optional non-interactive section header text via `label` for semantic categorization.
 */
import type { ComponentPropsWithRef } from 'react'
import { cn, type LithosClass } from '../../../utils/cn'

export interface DropdownGroupProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  label?: string
  className?: LithosClass
}

export const DropdownGroup = ({ children, label, className, ...props }: DropdownGroupProps) => {
  return (
    <div role="group" aria-label={label} className={cn('px-1 py-1', className)} {...props}>
      {label && (
        <div role="presentation" className="px-2 py-1 text-xs font-semibold text-(--lithos-text)/70">
          {label}
        </div>
      )}
      {children}
    </div>
  )
}
