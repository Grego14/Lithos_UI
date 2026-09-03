import { forwardRef, type ComponentPropsWithRef } from 'react'
import { useMergeRefs, FloatingPortal, FloatingArrow } from '@floating-ui/react'
import { cn, type LithosClass } from '../../../utils/cn'
import { useTooltipContext } from './useTooltip'

export interface TooltipContentProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  portaled?: boolean
  className?: LithosClass
}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ style, className, portaled = true, ...props }, propRef) => {
    const { context: floatingContext, floatingStyles, refs, getFloatingProps, arrowRef } = useTooltipContext()
    const ref = useMergeRefs([refs.setFloating, propRef])

    if (!floatingContext.open) return null

    const content = (
      <div
        ref={ref}
        style={{ ...floatingStyles, ...style }}
        className={cn(
          'z-50 border-2 border-(--lithos-border) bg-(--lithos-surface) px-3 py-1.5 text-sm font-bold text-(--lithos-text) shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)',
          className
        )}
        {...getFloatingProps(props)}
      >
        {props.children}
        <FloatingArrow
          ref={arrowRef}
          context={floatingContext}
          fill="var(--lithos-surface)"
          stroke="var(--lithos-border)"
          strokeWidth={2}
        />
      </div>
    )

    if (!portaled) return content

    return <FloatingPortal>{content}</FloatingPortal>
  }
)

TooltipContent.displayName = 'TooltipContent'
