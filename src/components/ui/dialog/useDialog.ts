/**
 * @fileoverview Lithos UI Dialog context provider and custom consumer hook.
 * - Manages shared dialog state and enforces context boundaries, throwing an error if consumed outside of a `<Dialog>`.
 */
import { useContext, createContext } from 'react'
import type { DialogContextType } from './dialog.types'

/**
 * React Context instance for the dialog primitive suite.
 */
export const DialogContext = createContext<DialogContextType | null>(null)

/**
 * Custom hook to consume dialog context values safely.
 *
 * @throws {Error} If called outside of a valid `<Dialog>` component tree.
 * @returns Current dialog context values.
 */
export const useDialog = () => {
  const context = useContext(DialogContext)

  if (!context) throw Error('DialogHeader/DialogTitle/DialogBody/DialogFooter must be used within a <Dialog>')

  return context
}
