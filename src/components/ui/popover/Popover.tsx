/**
 * @fileoverview Lithos UI popover root container primitive.
 * - Instantiates the popover state via `usePopover` and exposes it down the tree through Context.
 * - Accepts both controlled and uncontrolled open options alongside positioning configurations.
 */
import type { ReactNode } from 'react'
import { usePopover, PopoverContext, type PopoverOptions } from './usePopover'

export interface PopoverProps extends PopoverOptions {
  children: ReactNode
}

export const Popover = ({ children, modal = false, ...restOptions }: PopoverProps) => {
  const popover = usePopover({ modal, ...restOptions })
  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>
}
