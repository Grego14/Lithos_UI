import * as React from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
  useId,
} from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'
import { cn } from '../../utils/cn'

interface PopoverOptions {
  initialOpen?: boolean
  placement?: Placement
  modal?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function usePopover({
  initialOpen = false,
  placement = 'bottom-start',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: PopoverOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen)
  const labelId = useId()
  const descriptionId = useId()

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({
        fallbackAxisSideDirection: 'end',
      }),
      shift({ padding: 8 }),
    ],
  })

  const context = data.context

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)

  const interactions = useInteractions([click, dismiss, role])

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
    }),
    [open, setOpen, interactions, data, modal, labelId, descriptionId]
  )
}

type ContextType = ReturnType<typeof usePopover> | null

const PopoverContext = React.createContext<ContextType>(null)

export const usePopoverContext = () => {
  const context = React.useContext(PopoverContext)
  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />')
  }
  return context
}

export function Popover({
  children,
  modal = false,
  ...restOptions
}: {
  children: React.ReactNode
} & PopoverOptions) {
  const popover = usePopover({ modal, ...restOptions })
  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>
}

interface PopoverTriggerProps extends React.HTMLProps<HTMLElement> {
  asChild?: boolean
}

export const PopoverTrigger = React.forwardRef<HTMLElement, PopoverTriggerProps>(function PopoverTrigger(
  { children, asChild = false, ...props },
  propRef
) {
  const context = usePopoverContext()
  const childrenRef = (children as any).ref
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<any>,
      context.getReferenceProps({
        ref,
        ...props,
        ...(children.props as any),
        'data-state': context.open ? 'open' : 'closed',
      })
    )
  }

  return (
    <button
      ref={ref as any}
      type="button"
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  )
})

export const PopoverContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(function PopoverContent(
  { style, className, ...props },
  propRef
) {
  const { context: floatingContext, ...context } = usePopoverContext()
  const ref = useMergeRefs([context.refs.setFloating, propRef])

  if (!floatingContext.open) return null

  return (
    <FloatingPortal>
      <FloatingFocusManager context={floatingContext} modal={context.modal}>
        <div
          ref={ref}
          style={{ ...context.floatingStyles, ...style }}
          aria-labelledby={context.labelId}
          aria-describedby={context.descriptionId}
          className={cn(
            'z-50 min-w-40 border-2 border-(--lithos-border) bg-(--lithos-surface) p-4 shadow-[4px_4px_0_0_var(--lithos-shadow)] text-(--lithos-text) outline-none rounded-(--lithos-radius)',
            className
          )}
          {...context.getFloatingProps(props)}
        >
          {props.children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  )
})

export const PopoverClose = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithRef<'button'>>(
  function PopoverClose({ children, onClick, ...props }, ref) {
    const { setOpen } = usePopoverContext()
    return (
      <button
        type="button"
        ref={ref}
        onClick={(e) => {
          onClick?.(e)
          setOpen(false)
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)
