/**
 * @fileoverview Lithos UI DropdownMenu context and hook utilities.
 * - Provides strict context boundaries and consumer hooks for accessing dropdown state.
 */
import { createContext, useContext, type RefObject } from 'react'
import type { ReferenceType } from '@floating-ui/react'

interface DropdownContext {
  open: boolean
  toggle: () => void
  close: () => void
  triggerRef: RefObject<ReferenceType | null>
}

export const DropdownContext = createContext<DropdownContext | null>(null)

export const useDropdown = () => {
  const context = useContext(DropdownContext)

  if (!context) throw new Error('DropdownMenu subcomponents must be used within <DropdownMenu>')

  return context
}
