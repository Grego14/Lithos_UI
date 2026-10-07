/**
 * @fileoverview Lithos UI Sidebar context hook and state primitive.
 * - Encapsulates `SidebarContext` consumption with strict boundary validation (`throws` error outside `<Sidebar>`).
 * - Exposes reactive state (`open`, `mode`, `role`) and dispatchers (`setOpen`) to nested sidebar primitives.
 */
import { createContext, useContext } from 'react'
import type { SidebarMode, SidebarRole, SidebarSetOpen } from './sidebar.types'

export interface SidebarContextType {
  mode: SidebarMode
  role: SidebarRole
  open: boolean
  setOpen: SidebarSetOpen
}

export const SidebarContext = createContext<SidebarContextType | null>(null)

export const useSidebar = () => {
  const context = useContext(SidebarContext)

  if (!context) throw Error('useSidebar must be used within <Sidebar>')

  return context
}
