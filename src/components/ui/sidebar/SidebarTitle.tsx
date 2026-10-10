/**
 * @fileoverview Lithos UI SidebarTitle typography component.
 * - Displays brand titles or section headers using the `Typography` primitive.
 * - Consumes `useSidebar` context to automatically hide rendering when the sidebar is collapsed.
 */
import { useSidebar } from './useSidebar'
import { cn } from '../../../utils/cn'
import type { SidebarTitleProps } from './sidebar.types'

import { Typography } from '../Typography'

export const SidebarTitle = ({ children, className, variant = 'h4', ...rest }: SidebarTitleProps) => {
  const { open } = useSidebar()

  if (!open) return null

  return (
    <Typography variant={variant} className={cn('tracking-wider uppercase', className)} {...rest}>
      {children}
    </Typography>
  )
}
