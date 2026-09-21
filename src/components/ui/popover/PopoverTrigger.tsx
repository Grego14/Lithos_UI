/**
 * @fileoverview Lithos UI popover trigger primitive.
 * - Attaches reference refs and accessibility attributes (`data-state`) to open or close the popover.
 * - Supports `asChild` composition via React `cloneElement` to forward props to custom children.
 */
import { cloneElement, isValidElement, type ComponentPropsWithRef, type HTMLProps } from 'react'
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
  const { context, refs, getReferenceProps } = usePopoverContext()
  const ref = useMergeRefs([refs.setReference, propRef])

  const normalizedClass = cn(className)

  if (asChild && isValidElement(children)) {
    const childProps = children.props as Record<string, unknown>

    return cloneElement(
      children,
      getReferenceProps({
        ref,
        ...props,
        ...childProps,
        className: cn(normalizedClass, childProps['className'] as string),
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
      {...getReferenceProps(props)}
    >
      {children}
    </button>
  )
}
