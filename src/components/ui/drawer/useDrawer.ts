/**
 * @fileoverview Lithos UI Drawer context and hook utilities.
 * - Provides strict context boundaries and consumer hooks for accessing the drawer state.
 */
import { createContext, useContext } from 'react'
import type { DrawerContextValue } from './drawer.types'

/** React Context instance for the drawer primitive suite. */
export const DrawerContext = createContext<DrawerContextValue | null>(null)

/**
 * Custom hook to consume drawer context values safely.
 *
 * @throws {Error} If called outside of a valid `<Drawer>` component hierarchy.
 * @returns Current drawer context values.
 */
export const useDrawer = () => {
  const context = useContext(DrawerContext)

  if (!context) throw new Error('useDrawer must be used within <Drawer>')

  return context
}
