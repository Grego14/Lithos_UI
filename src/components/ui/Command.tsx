/**
 * @fileoverview Lithos UI Neo-Brutalist Command Palette primitive.
 * - Zero-dependency, accessible keyboard-driven command menu and dialog.
 * - Real-time client-side search filtering across items and item groups.
 * - Keyboard navigation (ArrowUp, ArrowDown, Home, End, Enter, Escape).
 * - Neo-brutalist hard 2px borders, 0px blur drop shadows, and dynamic YIQ contrast.
 * - Zero-Gap Rule: margin/padding based layout without CSS gap.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentPropsWithRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import { cn, type LithosClass } from '../../utils/cn'
import { IconSearch } from './icons/IconSearch'
import { Dialog, type DialogProps } from './Dialog'

/* -------------------------------------------------------------------------------------------------
 * Context & Types
 * -----------------------------------------------------------------------------------------------*/

interface CommandItemMeta {
  id: string
  value: string
  groupId?: string | undefined
  disabled?: boolean | undefined
  keywords?: string[] | undefined
  onSelect?: (() => void) | undefined
}

interface CommandContextValue {
  search: string
  setSearch: (search: string) => void
  activeId: string | null
  setActiveId: (id: string | null) => void
  registerItem: (meta: CommandItemMeta) => () => void
  filterItem: (itemValue: string, keywords?: string[]) => boolean
  listId: string
  items: Map<string, CommandItemMeta>
  visibleItemsCount: number
  isGroupVisible: (groupId: string) => boolean
}

const CommandContext = createContext<CommandContextValue | null>(null)

const useCommand = () => {
  const context = useContext(CommandContext)
  if (!context) {
    throw new Error('Command components must be used within a <Command> root.')
  }
  return context
}

const GroupContext = createContext<{ groupId: string } | null>(null)

/* -------------------------------------------------------------------------------------------------
 * Root: Command
 * -----------------------------------------------------------------------------------------------*/

export interface CommandProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  value?: string
  onValueChange?: (value: string) => void
  filter?: (value: string, search: string, keywords?: string[]) => boolean
  className?: LithosClass
  children?: ReactNode
}

export const Command = ({
  value: controlledValue,
  onValueChange,
  filter,
  className,
  children,
  ...rest
}: CommandProps) => {
  const [uncontrolledSearch, setUncontrolledSearch] = useState('')
  const search = controlledValue !== undefined ? controlledValue : uncontrolledSearch
  const listId = useId()

  const setSearch = useCallback(
    (newSearch: string) => {
      if (controlledValue === undefined) {
        setUncontrolledSearch(newSearch)
      }
      onValueChange?.(newSearch)
    },
    [controlledValue, onValueChange]
  )

  const [items, setItems] = useState<Map<string, CommandItemMeta>>(new Map())
  const [activeId, setActiveId] = useState<string | null>(null)

  const registerItem = useCallback((meta: CommandItemMeta) => {
    setItems((prev) => {
      const next = new Map(prev)
      next.set(meta.id, meta)
      return next
    })
    return () => {
      setItems((prev) => {
        const next = new Map(prev)
        next.delete(meta.id)
        return next
      })
    }
  }, [])

  const defaultFilter = useCallback((itemValue: string, query: string, keywords?: string[]) => {
    if (!query.trim()) return true
    const q = query.toLowerCase().trim()
    if (itemValue.toLowerCase().includes(q)) return true
    if (keywords && keywords.some((k) => k.toLowerCase().includes(q))) return true
    return false
  }, [])

  const filterItem = useCallback(
    (itemValue: string, keywords?: string[]) => {
      if (filter) {
        return filter(itemValue, search, keywords)
      }
      return defaultFilter(itemValue, search, keywords)
    },
    [filter, search, defaultFilter]
  )

  // Visible items calculation
  const visibleItems = useMemo(() => {
    const list: CommandItemMeta[] = []
    items.forEach((item) => {
      if (filterItem(item.value, item.keywords)) {
        list.push(item)
      }
    })
    return list
  }, [items, filterItem])

  const visibleItemsCount = visibleItems.length

  // Derive effective active item during render without cascading effects
  const effectiveActiveId = useMemo(() => {
    if (visibleItems.length === 0) return null
    const currentActive = visibleItems.find((item) => item.id === activeId)
    if (currentActive && !currentActive.disabled) return currentActive.id
    const firstEnabled = visibleItems.find((item) => !item.disabled)
    return firstEnabled ? firstEnabled.id : null
  }, [visibleItems, activeId])

  const isGroupVisible = useCallback(
    (groupId: string) => {
      if (!search.trim()) return true
      let hasVisible = false
      items.forEach((item) => {
        if (item.groupId === groupId && filterItem(item.value, item.keywords)) {
          hasVisible = true
        }
      })
      return hasVisible
    },
    [items, filterItem, search]
  )

  const contextValue = useMemo<CommandContextValue>(
    () => ({
      search,
      setSearch,
      activeId: effectiveActiveId,
      setActiveId,
      registerItem,
      filterItem,
      listId,
      items,
      visibleItemsCount,
      isGroupVisible,
    }),
    [search, setSearch, effectiveActiveId, registerItem, filterItem, listId, items, visibleItemsCount, isGroupVisible]
  )

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (visibleItems.length === 0) return

    const enabledItems = visibleItems.filter((i) => !i.disabled)
    if (enabledItems.length === 0) return

    const currentIndex = enabledItems.findIndex((i) => i.id === effectiveActiveId)

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = currentIndex < enabledItems.length - 1 ? currentIndex + 1 : 0
      const nextItem = enabledItems[nextIndex]
      if (nextItem) setActiveId(nextItem.id)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : enabledItems.length - 1
      const prevItem = enabledItems[prevIndex]
      if (prevItem) setActiveId(prevItem.id)
    } else if (e.key === 'Home') {
      e.preventDefault()
      const first = enabledItems[0]
      if (first) setActiveId(first.id)
    } else if (e.key === 'End') {
      e.preventDefault()
      const last = enabledItems[enabledItems.length - 1]
      if (last) setActiveId(last.id)
    } else if (e.key === 'Enter') {
      const target = e.target as HTMLElement | null
      if (target?.getAttribute('data-slot') === 'command-input' || target === e.currentTarget) {
        const active = enabledItems.find((i) => i.id === effectiveActiveId)
        if (active?.onSelect) {
          e.preventDefault()
          active.onSelect()
        }
      }
    }
  }

  const classes = cn(
    'flex flex-col w-full overflow-hidden border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) rounded-(--lithos-radius) shadow-[4px_4px_0_0_var(--lithos-shadow)]',
    className
  )

  return (
    <CommandContext.Provider value={contextValue}>
      <div data-slot="command" role="application" tabIndex={-1} onKeyDown={handleKeyDown} className={classes} {...rest}>
        {children}
      </div>
    </CommandContext.Provider>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Input: CommandInput
 * -----------------------------------------------------------------------------------------------*/

export interface CommandInputProps extends Omit<ComponentPropsWithRef<'input'>, 'className' | 'value' | 'onChange'> {
  value?: string
  onValueChange?: (value: string) => void
  icon?: ReactNode
  className?: LithosClass
}

export const CommandInput = ({
  placeholder = 'Type a command or search...',
  value,
  onValueChange,
  icon,
  className,
  'aria-label': ariaLabel,
  ...rest
}: CommandInputProps) => {
  const { search, setSearch, listId } = useCommand()
  const inputValue = value !== undefined ? value : search

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value
    setSearch(next)
    onValueChange?.(next)
  }

  return (
    <div
      data-slot="command-input-wrapper"
      className="relative flex items-center border-b-2 border-(--lithos-border) px-3 py-2 bg-(--lithos-surface)"
    >
      <span className="inline-flex shrink-0 mr-2 opacity-60 text-(--lithos-text)" aria-hidden="true">
        {icon || <IconSearch size={18} />}
      </span>
      <input
        data-slot="command-input"
        type="text"
        role="combobox"
        aria-label={ariaLabel || placeholder}
        aria-controls={listId}
        aria-expanded="true"
        aria-autocomplete="list"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'w-full bg-transparent font-sans text-sm font-medium text-(--lithos-text) placeholder:text-(--lithos-text)/50 outline-none border-none p-0 focus:ring-0',
          className
        )}
        {...rest}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * List: CommandList
 * -----------------------------------------------------------------------------------------------*/

export interface CommandListProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  className?: LithosClass
  children?: ReactNode
}

export const CommandList = ({ className, children, ...rest }: CommandListProps) => {
  const { listId } = useCommand()
  const classes = cn('max-h-72 overflow-x-hidden overflow-y-auto p-1.5 focus:outline-none', className)

  return (
    <div
      data-slot="command-list"
      id={listId}
      role="listbox"
      aria-label="Commands"
      className={classes}
      tabIndex={-1}
      {...rest}
    >
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Empty: CommandEmpty
 * -----------------------------------------------------------------------------------------------*/

export interface CommandEmptyProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  className?: LithosClass
  children?: ReactNode
}

export const CommandEmpty = ({ className, children = 'No results found.', ...rest }: CommandEmptyProps) => {
  const { search, visibleItemsCount } = useCommand()

  // Only display empty message if search is actively typed and no items match
  if (!search.trim() || visibleItemsCount > 0) return null

  return (
    <div
      data-slot="command-empty"
      role="status"
      aria-live="polite"
      className={cn('py-8 text-center text-sm font-medium opacity-60 text-(--lithos-text)', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Group: CommandGroup
 * -----------------------------------------------------------------------------------------------*/

export interface CommandGroupProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  heading?: ReactNode
  className?: LithosClass
  children?: ReactNode
}

export const CommandGroup = ({ heading, className, children, ...rest }: CommandGroupProps) => {
  const groupId = useId()
  const { isGroupVisible } = useCommand()

  const visible = isGroupVisible(groupId)

  if (!visible) return null

  return (
    <GroupContext.Provider value={{ groupId }}>
      <div data-slot="command-group" role="group" className={cn('overflow-hidden py-1', className)} {...rest}>
        {heading && (
          <div className="px-2 py-1 text-xs font-black tracking-wider uppercase opacity-50 select-none text-(--lithos-text)">
            {heading}
          </div>
        )}
        <div className="flex flex-col">{children}</div>
      </div>
    </GroupContext.Provider>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Item: CommandItem
 * -----------------------------------------------------------------------------------------------*/

export interface CommandItemProps extends Omit<ComponentPropsWithRef<'div'>, 'className' | 'onSelect'> {
  value?: string
  keywords?: string[]
  disabled?: boolean
  onSelect?: (value: string) => void
  className?: LithosClass
  children?: ReactNode
}

export const CommandItem = ({
  value,
  keywords,
  disabled = false,
  onSelect,
  className,
  children,
  ...rest
}: CommandItemProps) => {
  const id = useId()
  const groupContext = useContext(GroupContext)
  const itemRef = useRef<HTMLDivElement | null>(null)

  const derivedValue = useMemo(() => {
    if (value !== undefined) return value
    if (typeof children === 'string') return children
    return id
  }, [value, children, id])

  const { activeId, setActiveId, registerItem, filterItem } = useCommand()

  const handleSelect = useCallback(() => {
    if (disabled) return
    onSelect?.(derivedValue)
  }, [disabled, onSelect, derivedValue])

  useEffect(() => {
    return registerItem({
      id,
      value: derivedValue,
      groupId: groupContext?.groupId,
      disabled,
      keywords,
      onSelect: handleSelect,
    })
  }, [id, derivedValue, groupContext?.groupId, disabled, keywords, handleSelect, registerItem])

  const isVisible = filterItem(derivedValue, keywords)
  const isSelected = activeId === id

  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({ block: 'nearest' })
    }
  }, [isSelected])

  if (!isVisible) return null

  const handleClick = () => {
    handleSelect()
  }

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      handleSelect()
    }
  }

  const handleMouseEnter = () => {
    if (!disabled) {
      setActiveId(id)
    }
  }

  const classes = cn(
    'relative flex items-center px-3 py-2 text-sm font-semibold cursor-pointer select-none rounded-(--lithos-radius) transition-colors duration-75',
    isSelected
      ? 'bg-(--lithos-accent) text-(--lithos-accent-text)'
      : 'text-(--lithos-text) hover:bg-(--lithos-accent)/15',
    disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
    className
  )

  return (
    <div
      ref={itemRef}
      data-slot="command-item"
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      data-selected={isSelected ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      tabIndex={isSelected ? 0 : -1}
      className={classes}
      {...rest}
    >
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Shortcut: CommandShortcut
 * -----------------------------------------------------------------------------------------------*/

export interface CommandShortcutProps extends Omit<ComponentPropsWithRef<'span'>, 'className'> {
  className?: LithosClass
  children?: ReactNode
}

export const CommandShortcut = ({ className, children, ...rest }: CommandShortcutProps) => {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        'ml-auto inline-flex items-center text-xs font-mono font-bold tracking-widest px-1.5 py-0.5 border border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) rounded-(--lithos-radius)',
        className
      )}
      {...rest}
    >
      {children}
    </span>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Separator: CommandSeparator
 * -----------------------------------------------------------------------------------------------*/

export interface CommandSeparatorProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  className?: LithosClass
}

export const CommandSeparator = ({ className, ...rest }: CommandSeparatorProps) => {
  return (
    <div
      data-slot="command-separator"
      role="separator"
      className={cn('my-1 -mx-1.5 border-b-2 border-(--lithos-border)', className)}
      {...rest}
    />
  )
}

/* -------------------------------------------------------------------------------------------------
 * Dialog: CommandDialog
 * -----------------------------------------------------------------------------------------------*/

export interface CommandDialogProps extends Omit<DialogProps, 'size' | 'variant'> {
  children?: ReactNode
}

export const CommandDialog = ({ open, onClose, className, children, ...rest }: CommandDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      size="md"
      variant="bare"
      className={cn('p-0 overflow-hidden shadow-[6px_6px_0_0_var(--lithos-shadow)]', className)}
      {...rest}
    >
      {children}
    </Dialog>
  )
}
