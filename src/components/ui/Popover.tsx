/**
 * @fileoverview Lithos UI Popover components.
 * - Floating overlay primitive powered by @floating-ui/react.
 * - Handles collision-detection, placement, and focus trapping.
 * - Composed of Popover, PopoverTrigger, PopoverContent, and PopoverClose.
 */
import * as React from 'react'
import { useMergeRefs, FloatingPortal, FloatingFocusManager } from '@floating-ui/react'

import { cn } from '../../utils/cn'

import { PopoverContext, usePopover, usePopoverContext, type PopoverOptions } from './popover/usePopover'

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
