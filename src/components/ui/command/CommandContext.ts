/**
 * @fileoverview Lithos UI Command context provider and custom hook.
 * - Manages centralized state for search queries, active navigation indexes, and item registries.
 * - Enforces context boundary validation, throwing an error if consumed outside of a `<Command>` root.
 */
import { createContext, useContext } from 'react'
import type { CommandContextValue, GroupContextValue } from './command.types'

/**
 * React Context instance for the command palette primitive suite.
 */
export const CommandContext = createContext<CommandContextValue | null>(null)

/**
 * Custom hook to access command palette context state and action methods.
 *
 * @throws {Error} If called outside of a valid `<Command>` root component tree.
 * @returns Current command context values.
 */
export const useCommand = (): CommandContextValue => {
  const context = useContext(CommandContext)

  if (!context) throw Error('Command components must be used within a <Command> root.')

  return context
}

/**
 * React Context instance for tracking nested command group identifiers.
 */
export const GroupContext = createContext<GroupContextValue | null>(null)

/**
 * Custom hook to access the parent command group context safely.
 *
 * @returns Parent group context values or null if outside a group.
 */
export const useGroup = () => useContext(GroupContext)
