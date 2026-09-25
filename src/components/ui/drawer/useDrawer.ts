/**
 * @fileoverview Lithos UI Drawer context and hook utilities.
 * - Provides strict context boundaries and consumer hooks for accessing the drawer state.
 */
import { createContext, useContext } from 'react'

export interface DrawerContextValue {
  /**
   * Current open state of the parent drawer.
   */
  open: boolean

  /**
   * Callback to request opening or closing the parent drawer.
   */
  onOpenChange: (open: boolean) => void
}

export const DrawerContext = createContext<DrawerContextValue | null>(null)

export const useDrawer = () => {
  const context = useContext(DrawerContext)

  if (!context) throw new Error('useDrawer must be used within <Drawer>')

  return context
}
