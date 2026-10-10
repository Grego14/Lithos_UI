/**
 * @fileoverview Lithos UI toast context and consumer hook.
 * - Exposes the `useToast` hook for dispatching and dismissing toast notifications anywhere in the component tree.
 * - Enforces provider boundary checks to prevent runtime context consumption errors.
 */
import { createContext, useContext } from 'react'
import type { ToastContextType } from './toast.types'

export const ToastContext = createContext<ToastContextType | null>(null)

/**
 * Custom hook to access toast dispatchers within a `ToastProvider` subtree.
 *
 * @throws {Error} If called outside of a `ToastProvider`.
 * @returns Object containing `addToast` and `removeToast` functions.
 */
export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) throw Error('useToast must be used within a ToastProvider')

  return context
}
