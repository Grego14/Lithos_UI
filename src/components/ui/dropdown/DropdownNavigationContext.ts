/**
 * @fileoverview Lithos UI Dropdown navigation context and hook utilities.
 * - Provides internal focus, active index, and submenu navigation state.
 * - Ensures consumer components remain strictly bound within a DropdownMenuContent tree.
 */
import { createContext, useContext } from 'react'

interface DropdownNavigation {
  activeIndex: number | null
  setActiveIndex: (index: number | null | ((prev: number | null) => number | null)) => void
  openSubmenuAtIndex: (index: number) => void
  closeParentSubmenu: () => void
}

export const DropdownNavigationContext = createContext<DropdownNavigation | null>(null)

export const useDropdownNavigation = () => {
  const context = useContext(DropdownNavigationContext)

  if (!context) throw new Error('useDropdownNavigation must be used within <DropdownContent>')

  return context
}
