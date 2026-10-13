/**
 * @fileoverview Lithos UI Dropdown context and hook utilities.
 * - Provides strict context boundaries and consumer hooks for accessing dropdown state.
 */
import { createContext, useContext } from 'react'
import type { DropdownContextType } from './dropdown.types'

/**
 * React Context instance for the root dropdown menu state and actions.
 */
export const DropdownContext = createContext<DropdownContextType | null>(null)

/**
 * Custom hook to consume root dropdown context values safely.
 *
 * @throws {Error} If called outside of a valid `<Dropdown>` component tree.
 * @returns Current dropdown context values.
 */
export const useDropdown = () => {
  const context = useContext(DropdownContext)

  if (!context) throw Error('Dropdown subcomponents must be used within <Dropdown>')

  return context
}
