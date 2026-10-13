/**
 * @fileoverview Lithos UI CheckboxGroup context definition.
 * - Provides shared state and mutation handlers across grouped checkboxes.
 */
import { createContext, useContext } from 'react'
import type { CheckboxGroupContextType } from './checkbox.types'

/**
 * React Context instance for managing multi-select checkbox group state.
 */
export const CheckboxGroupContext = createContext<CheckboxGroupContextType | null>(null)

/**
 * Custom hook to consume the checkbox group context safely.
 *
 * @throws {Error} If called outside of a valid `<CheckboxGroup>` provider tree.
 * @returns Checkbox group context values.
 */
export const useCheckboxGroup = () => {
  const context = useContext(CheckboxGroupContext)

  if (!context) throw new Error('useCheckboxGroup must be used within a <CheckboxGroup>')

  return context
}
