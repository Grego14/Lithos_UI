/**
 * @fileoverview Lithos UI DropdownSeparator primitive.
 * - Renders a horizontal divider line with `role="separator"` using global `--lithos-border`.
 * - Spans full container width with negative margins (`-mx-1`) to visually break up menu sections.
 */
import type { ComponentPropsWithRef } from 'react'
import { cn, type LithosClass } from '../../../utils/cn'

export interface DropdownSeparatorProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  className?: LithosClass
}

export const DropdownSeparator = ({ className, ...props }: DropdownSeparatorProps) => {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn('-mx-1 my-1 h-px bg-(--lithos-border)', className)}
      {...props}
    />
  )
}
