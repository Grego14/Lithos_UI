/**
 * @fileoverview Lithos UI select context hook primitive.
 * - Exposes select state, value handlers, and list navigation refs to composite subcomponents.
 * - Guarantees safe usage by asserting context existence inside consumer components.
 */
import { useContext, createContext } from 'react'
import type { SelectContextType } from './select.types'

export const SelectContext = createContext<SelectContextType | null>(null)

export const useSelect = () => {
  const context = useContext(SelectContext)

  if (!context) throw new Error('Select subcomponents must be used within <Select>')

  return context
}
