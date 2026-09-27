/**
 * @fileoverview Lithos UI DrawerHeader component.
 * - Encloses top title and navigation elements within the Drawer primitive.
 * - Switches to DialogHeader when responsive desktop view is activated.
 */
import type { ComponentPropsWithRef } from 'react'
import { DialogHeader } from '../Dialog'
import { cn, type LithosClass } from '../../../utils/cn'
import { useDrawer } from './useDrawer'

export interface DrawerHeaderProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  className?: LithosClass
}

export const DrawerHeader = ({ className, children, ...props }: DrawerHeaderProps) => {
  const { mode, isDesktop } = useDrawer()

  if (mode === 'responsive' && isDesktop) {
    return (
      <DialogHeader className={className} {...props}>
        {children}
      </DialogHeader>
    )
  }

  return (
    <div className={cn('flex-shrink-0 p-4 border-b border-(--lithos-border)', className)} {...props}>
      {children}
    </div>
  )
}
