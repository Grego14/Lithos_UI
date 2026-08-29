/**
 * @fileoverview Lithos UI Popover components.
 * - Floating overlay primitive powered by @floating-ui/react.
 * - Handles collision-detection, placement, and focus trapping.
 * - Composed of Popover, PopoverTrigger, PopoverContent, and PopoverClose.
 */
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
import type { Placement, ReferenceType, UseFloatingReturn, UseInteractionsReturn } from '@floating-ui/react'

export interface PopoverReturn extends UseFloatingReturn<ReferenceType>, UseInteractionsReturn {
  open: boolean
  setOpen: (open: boolean) => void
  modal: boolean | undefined
  labelId: string | undefined
  descriptionId: string | undefined
}
import { cn } from '../../utils/cn'

interface PopoverOptions {
  initialOpen?: boolean
  placement?: Placement
  modal?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePopover = ({
  initialOpen = false,
  placement = 'bottom-start',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: PopoverOptions = {}): PopoverReturn => {
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

type ContextType = PopoverReturn | null

const PopoverContext = React.createContext<ContextType>(null)

// eslint-disable-next-line react-refresh/only-export-components
export const usePopoverContext = (): PopoverReturn => {
  const context = React.useContext(PopoverContext)
  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />')
  }
  return context
}

export const Popover = ({
  children,
  modal = false,
  ...restOptions
}: {
  children: React.ReactNode
} & PopoverOptions) => {
  const popover = usePopover({ modal, ...restOptions })
  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>
}

export interface PopoverTriggerProps extends React.HTMLProps<HTMLElement> {
  asChild?: boolean
  ref?: React.Ref<HTMLElement>
}

export const PopoverTrigger = ({ children, asChild = false, ref: propRef, ...props }: PopoverTriggerProps) => {
  const context = usePopoverContext()
  const childrenRef = (children as React.ReactElement & { ref?: React.Ref<unknown> }).ref
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<React.HTMLProps<HTMLElement>>,
      context.getReferenceProps({
        ref,
        ...props,
        ...(children.props as Record<string, unknown>),
        'data-state': context.open ? 'open' : 'closed',
      } as React.HTMLProps<HTMLElement> & { 'data-state'?: string })
    )
  }

  return (
    <button
      ref={ref as React.LegacyRef<HTMLButtonElement>}
      type="button"
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  )
}

export interface PopoverContentProps extends React.HTMLProps<HTMLDivElement> {
  portaled?: boolean
  ref?: React.Ref<HTMLDivElement>
}

export const PopoverContent = ({ style, className, portaled = true, ref: propRef, ...props }: PopoverContentProps) => {
  const { context: floatingContext, ...context } = usePopoverContext()
  const ref = useMergeRefs([context.refs.setFloating, propRef])

  if (!floatingContext.open) return null

  const content = (
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
  )

  if (!portaled) return content

  return <FloatingPortal>{content}</FloatingPortal>
}

export interface PopoverCloseProps extends React.ComponentPropsWithRef<'button'> {
  asChild?: boolean
}

export const PopoverClose = ({ children, asChild = false, onClick, ref: propRef, ...props }: PopoverCloseProps) => {
  const { setOpen } = usePopoverContext()
  const childrenRef = React.isValidElement(children)
    ? (children as React.ReactElement & { ref?: React.Ref<unknown> }).ref
    : undefined
  const ref = useMergeRefs([propRef, childrenRef])

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<React.HTMLProps<HTMLElement>>,
      {
        ref,
        ...props,
        ...(children.props as Record<string, unknown>),
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          onClick?.(e as React.MouseEvent<HTMLButtonElement>)
          const childOnClick = (children.props as Record<string, unknown>)['onClick']
          if (typeof childOnClick === 'function') {
            childOnClick(e)
          }
          setOpen(false)
        },
      } as React.HTMLProps<HTMLElement>
    )
  }

  return (
    <button
      type="button"
      ref={propRef}
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
