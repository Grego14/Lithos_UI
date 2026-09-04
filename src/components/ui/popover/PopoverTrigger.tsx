/**
 * @fileoverview Lithos UI popover trigger primitive.
 * - Attaches reference refs and accessibility attributes (`data-state`) to open or close the popover.
 * - Supports `asChild` composition via React `cloneElement` to forward props to custom children.
 */
import {
  cloneElement,
  isValidElement,
  type ComponentPropsWithRef,
  type Ref,
  type ReactElement,
  type HTMLProps,
} from 'react'
import { useMergeRefs } from '@floating-ui/react'
import { usePopoverContext } from './usePopover'
import { cn, type LithosClass } from '../../../utils/cn'

export interface PopoverTriggerProps extends Omit<ComponentPropsWithRef<'button'>, 'className'> {
  asChild?: boolean
  className?: LithosClass
}

export const PopoverTrigger = ({
  children,
  asChild = false,
  ref: propRef,
  className,
  ...props
}: PopoverTriggerProps) => {
  const context = usePopoverContext()
  const childrenRef = (children as ReactElement & { ref?: Ref<unknown> }).ref
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

  const normalizedClass = cn(className)

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        className: normalizedClass,
        ...(children.props as Record<string, unknown>),
        'data-state': context.open ? 'open' : 'closed',
      } as HTMLProps<HTMLButtonElement> & { 'data-state'?: string })
    )
  }

  return (
    <button
      ref={ref}
      type="button"
      data-state={context.open ? 'open' : 'closed'}
      className={normalizedClass}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  )
}
