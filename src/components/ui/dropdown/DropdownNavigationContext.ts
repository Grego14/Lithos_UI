/**
 * @fileoverview Lithos UI Dropdown navigation context and hook utilities.
 * - Provides internal focus, active index, and submenu navigation state.
 * - Ensures consumer components remain strictly bound within a DropdownMenuContent tree.
 */
import { createContext, useContext } from 'react'
import type { DropdownNavigation } from './dropdown.types'

/**
 * React Context instance for dropdown list navigation and index states.
 */
export const DropdownNavigationContext = createContext<DropdownNavigation | null>(null)

/**
 * Custom hook to consume dropdown navigation context values safely.
 *
 * @throws {Error} If called outside of a valid `<DropdownContent>` component tree.
 * @returns Current dropdown navigation context values.
 */
export const useDropdownNavigation = () => {
  const context = useContext(DropdownNavigationContext)

  if (!context) throw Error('useDropdownNavigation must be used within <DropdownContent>')

  return context
}
