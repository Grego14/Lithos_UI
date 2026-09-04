/**
 * @fileoverview Lithos UI accordion primitive.
 * - Dual-mode state architecture: works seamlessly as an uncontrolled/standalone item via local state, or co-op inside `AccordionGroup` via Context API.
 * - Dynamic shadow offset shifts from 2px to 4px on open state to retain hard geometry.
 */
import { useId, createContext, useContext, useState, type ComponentPropsWithRef, type ReactNode } from 'react'
import { Button } from './Button'
import { cn, type LithosClass } from '../../utils/cn'
import { IconChevronUp } from './icons/IconChevronUp'

interface AccordionContextType {
  toggleItem: (item: string) => void
  isItemOpen: (value: string) => boolean
}

const AccordionContext = createContext<AccordionContextType | null>(null)

export interface AccordionProps extends Omit<ComponentPropsWithRef<'div'>, 'title' | 'className'> {
  defaultOpen?: boolean | undefined
  title: ReactNode
  classes?: {
    container?: LithosClass
    header?: LithosClass
    content?: LithosClass
  }
  open?: boolean
  value?: string
  className?: LithosClass
}

export interface AccordionGroupProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  allowMultiple?: boolean
  defaultActive?: string | string[]
  className?: LithosClass
}

export const AccordionGroup = ({
  allowMultiple = false,
  children,
  defaultActive,
  className,
  ...rest
}: AccordionGroupProps) => {
  const [activedValues, setActivedValues] = useState<string | string[]>(() => {
    if (allowMultiple) {
      if (Array.isArray(defaultActive)) return defaultActive

      return defaultActive ? [defaultActive] : []
    }

    return typeof defaultActive === 'string' ? defaultActive : ''
  })

  const toggleItem = (value: string) => {
    setActivedValues((current) => {
      if (allowMultiple) {
        const list = Array.isArray(current) ? current : []

        return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
      }

      return current === value ? '' : value
    })
  }

  const isItemOpen = (value: string) => {
    if (allowMultiple) {
      return Array.isArray(activedValues) && activedValues.includes(value)
    }

    return activedValues === value
  }

  const containerClass = cn('flex flex-col items-center', className)

  return (
    <AccordionContext.Provider value={{ toggleItem, isItemOpen }}>
      <div className={containerClass} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const defaultClasses = {
  container:
    'w-full self-start border-2 border-(--lithos-border) duration-75 ease-out transition-shadow shadow-[2px_2px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius) overflow-hidden',
  content: 'p-4 min-h-0 overflow-hidden font-body',
  header: 'justify-between text-lg text-start p-3 rounded-none',
}

export const Accordion = ({
  defaultOpen = false,
  open,
  children,
  title,
  value,
  classes = {},
  className,
  ...rest
}: AccordionProps) => {
  const context = useContext(AccordionContext)

  // local state fallback if Accordion is used standalone without group
  const [isOpenLocal, setIsOpenLocal] = useState(defaultOpen)

  // if is not controlled externally via the open prop, use the Context or the local state
  const isOpen = open !== undefined ? open : context && value ? context.isItemOpen(value) : isOpenLocal
  const isGrouped = !!context

  const handleToggle = () => {
    if (context && value) {
      context.toggleItem(value)
      return
    }

    setIsOpenLocal(!isOpenLocal)
  }

  const label = isOpen ? 'Collapse' : 'Expand'
  const iconRotation = !isOpen ? 'rotate-180' : 'rotate-0'

  const containerClass = cn(
    defaultClasses.container,
    isOpen && 'shadow-[4px_4px_0_0_var(--lithos-shadow)] h-auto',
    isGrouped && 'mt-4',
    classes.container,
    className
  )

  const generatedId = useId()
  const itemId = value || generatedId
  const buttonId = `accordion-button-${itemId}`
  const contentId = `accordion-content-${itemId}`

  return (
    <div className={containerClass} {...rest}>
      <h3 className="m-0 p-0 antialiased">
        <Button
          className={cn(
            defaultClasses.header,
            classes.header,
            'translate-x-0 translate-y-0 active:translate-x-0 active:translate-y-0'
          )}
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={handleToggle}
          variant="text"
          fullWidth
        >
          <span>{title}</span>
          <div className="ml-2 w-4 min-w-4">
            <IconChevronUp className={`max-w-full h-auto ${iconRotation}`} title={label} />
          </div>
        </Button>
      </h3>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-75 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(defaultClasses.content, classes.content)}
            aria-hidden={!isOpen}
            id={contentId}
            role="region"
            aria-labelledby={buttonId}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
