/**
 * @fileoverview Lithos UI Sidebar context hook and state primitive.
 * - Encapsulates `SidebarContext` consumption with strict boundary validation (`throws` error outside `<Sidebar>`).
 * - Exposes reactive state (`open`, `mode`, `role`, `activeBreakpointIndex`, `currentBreakpoint`) and dispatchers (`setOpen`, `setActiveWidth`) to nested sidebar primitives.
 */
import { createContext, useContext } from 'react'
import type { SidebarMode, SidebarRole, SidebarSetOpen, SidebarPlacement } from './sidebar.types'

/**
 * Context value structure for managing global Sidebar state and behavior.
 */
export interface SidebarContextType {
  /**
   * The structural mode of the sidebar (`'permanent'` or `'mini'`).
   * Determines layout behavior and responsive characteristics.
   */
  mode: SidebarMode

  /**
   * Accessibility ARIA role applied to the main sidebar container.
   */
  role: SidebarRole

  /**
   * Current expansion state of the sidebar.
   * `true` when expanded/visible, `false` when collapsed/hidden.
   */
  open: boolean

  /**
   * Function to update the sidebar expansion state.
   * Supports direct boolean assignment or function updater pattern.
   */
  setOpen: SidebarSetOpen

  /**
   * Layout side where the sidebar is positioned in the application (`'left'` or `'right'`).
   * Used by child components to adapt icon orientations, borders, and tooltip alignments.
   * Default: `'left'`.
   */
  placement: SidebarPlacement

  /**
   * Width breakpoints in pixels for snap/resize steps.
   * Array sorted in ascending order (e.g. `[64, 128, 224]`).
   */
  breakpoints: number[]

  /**
   * Current active width in pixels applied to the sidebar layout.
   */
  activeWidth: number

  /**
   * Dispatcher to update the active width state from resizer or content interactions.
   */
  setActiveWidth: (width: number | ((prev: number) => number)) => void

  /**
   * Derived zero-based index representing the current breakpoint step within `breakpoints`.
   * Evaluates to `-1` when `open` is `false`.
   */
  activeBreakpointIndex: number

  /**
   * Current breakpoint width in pixels if `open` is `true`, otherwise `null`.
   */
  currentBreakpoint: number | null

  /** Flag indicated whether the sidebar is currently being resized or dragged */
  isDragging: boolean

  /** Updates the dragging state */
  setIsDragging: (isDragging: boolean) => void
}

export const SidebarContext = createContext<SidebarContextType | null>(null)

export const useSidebar = () => {
  const context = useContext(SidebarContext)

  if (!context) throw Error('useSidebar must be used within <Sidebar>')

  return context
}
