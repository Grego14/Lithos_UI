import { createContext, useContext, useState, type ComponentPropsWithRef, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

const useTabs = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider')
  }
  return context
}

export interface TabsProps extends Omit<ComponentPropsWithRef<'div'>, 'defaultValue' | 'value' | 'onChange'> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: ReactNode
}

export const Tabs = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
  ref,
  ...rest
}: TabsProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '')

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div ref={ref} className={cn('w-full', className)} data-state={value} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export interface TabsListProps extends ComponentPropsWithRef<'div'> {}

export const TabsList = ({ className, children, ref, ...rest }: TabsListProps) => {
  return (
    <div
      ref={ref}
      role="tablist"
      className={cn('flex flex-wrap items-center [&>*:not(:first-child)]:ml-4', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export interface TabsTriggerProps extends Omit<ComponentPropsWithRef<'button'>, 'value'> {
  value: string
}

export const TabsTrigger = ({ value, className, children, ref, ...rest }: TabsTriggerProps) => {
  const { value: selectedValue, onValueChange } = useTabs()
  const isSelected = selectedValue === value

  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      aria-selected={isSelected}
      data-state={isSelected ? 'active' : 'inactive'}
      onClick={() => onValueChange(value)}
      className={cn(
        'lithos-click',
        'inline-flex items-center justify-center whitespace-nowrap px-6 py-2.5',
        'border-2 border-(--lithos-border) text-sm font-bold transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--lithos-accent)',
        'disabled:pointer-events-none disabled:opacity-50',
        'bg-(--lithos-surface) text-(--lithos-text)',
        'shadow-[4px_4px_0_0_var(--lithos-border)]',
        'hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--lithos-border)]',
        'data-[state=active]:translate-x-[4px] data-[state=active]:translate-y-[4px] data-[state=active]:shadow-none',
        'data-[state=active]:bg-(--lithos-accent) data-[state=active]:text-(--lithos-accent-text)',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export interface TabsContentProps extends Omit<ComponentPropsWithRef<'div'>, 'value'> {
  value: string
}

export const TabsContent = ({ value, className, children, ref, ...rest }: TabsContentProps) => {
  const { value: selectedValue } = useTabs()
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div
      ref={ref}
      role="tabpanel"
      data-state={isSelected ? 'active' : 'inactive'}
      className={cn(
        'mt-6 border-2 border-(--lithos-border) bg-(--lithos-surface) p-6 text-(--lithos-text)',
        'shadow-[8px_8px_0_0_var(--lithos-border)]',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
