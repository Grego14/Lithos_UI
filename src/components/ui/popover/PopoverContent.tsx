/**
 * @fileoverview Lithos UI popover floating surface primitive.
 * - Renders the floating popover body with neo-brutalist styling, focus trapping, and optional portaling.
 * - Automatically links to reference element dimensions and attaches ARIA attributes.
 */
import type { ComponentPropsWithRef } from 'react'
import { useMergeRefs, FloatingFocusManager, FloatingPortal } from '@floating-ui/react'
import { cn, type LithosClass } from '../../../utils/cn'
import { usePopoverContext } from './usePopover'

export interface PopoverContentProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  portaled?: boolean
  className?: LithosClass
}

export const PopoverContent = ({ style, className, portaled = true, ref: propRef, ...props }: PopoverContentProps) => {
  const {
    context: floatingContext,
    floatingStyles,
    labelId,
    descriptionId,
    refs,
    getFloatingProps,
    modal,
  } = usePopoverContext()
  const ref = useMergeRefs([refs.setFloating, propRef])

  if (!floatingContext.open) return null

  const content = (
    <FloatingFocusManager context={floatingContext} modal={modal}>
      <div
        ref={ref}
        style={{ ...floatingStyles, ...style }}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        className={cn(
          'z-50 min-w-40 border-2 border-(--lithos-border) bg-(--lithos-surface) p-4 shadow-[4px_4px_0_0_var(--lithos-shadow)] text-(--lithos-text) outline-none rounded-(--lithos-radius)',
          className
        )}
        {...getFloatingProps(props)}
      >
        {props.children}
      </div>
    </FloatingFocusManager>
  )

  if (!portaled) return content

  return <FloatingPortal>{content}</FloatingPortal>
}
