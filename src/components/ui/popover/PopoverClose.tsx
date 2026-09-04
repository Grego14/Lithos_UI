/**
 * @fileoverview Lithos UI popover action close primitive.
 * - Closes the active popover on click while safely executing any existing `onClick` handlers.
 * - Supports `asChild` composition to convert any custom element into a dismiss trigger.
 */
import { cloneElement, isValidElement, type ComponentPropsWithRef, type HTMLProps, type MouseEvent } from 'react'
import { useMergeRefs } from '@floating-ui/react'
import { usePopoverContext } from './usePopover'
import { cn, type LithosClass } from '../../../utils/cn'

export interface PopoverCloseProps extends Omit<ComponentPropsWithRef<'button'>, 'className'> {
  asChild?: boolean
  className?: LithosClass
}

export const PopoverClose = ({
  children,
  asChild = false,
  onClick,
  ref: propRef,
  className,
  ...props
}: PopoverCloseProps) => {
  const { setOpen } = usePopoverContext()
  const childrenRef = isValidElement(children)
    ? (children as React.ReactElement & { ref?: React.Ref<unknown> }).ref
    : undefined
  const ref = useMergeRefs([propRef, childrenRef])

  const normalizedClass = cn(className)

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ref,
      ...props,
      className: normalizedClass,
      ...(children.props as Record<string, unknown>),
      onClick: (e: MouseEvent<HTMLElement>) => {
        onClick?.(e as MouseEvent<HTMLButtonElement>)
        const childOnClick = (children.props as Record<string, unknown>)['onClick']
        if (typeof childOnClick === 'function') {
          childOnClick(e)
        }
        setOpen(false)
      },
    } as HTMLProps<HTMLButtonElement>)
  }

  return (
    <button
      type="button"
      ref={propRef}
      onClick={(e) => {
        onClick?.(e)
        setOpen(false)
      }}
      className={normalizedClass}
      {...props}
    >
      {children}
    </button>
  )
}
