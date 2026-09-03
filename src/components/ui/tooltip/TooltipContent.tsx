import { forwardRef, type ComponentPropsWithRef } from 'react'
import { useMergeRefs, FloatingPortal, FloatingArrow } from '@floating-ui/react'
import { cn, type LithosClass } from '../../../utils/cn'
import { useTooltipContext } from './useTooltip'

export type TooltipVariant = 'default' | 'primary' | 'inverse'

export interface TooltipContentProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  portaled?: boolean
  variant?: TooltipVariant
  className?: LithosClass
}

const variantStyles: Record<TooltipVariant, { container: string; fill: string; stroke: string }> = {
  default: {
    container: 'bg-(--lithos-surface) text-(--lithos-text) border-(--lithos-border)',
    fill: 'var(--lithos-surface)',
    stroke: 'var(--lithos-border)',
  },
  primary: {
    container: 'bg-(--lithos-accent) text-(--lithos-accent-text) border-(--lithos-border)',
    fill: 'var(--lithos-accent)',
    stroke: 'var(--lithos-border)',
  },
  inverse: {
    container: 'bg-(--lithos-text) text-(--lithos-bg) border-(--lithos-border)',
    fill: 'var(--lithos-text)',
    stroke: 'var(--lithos-border)',
  },
}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ style, className, portaled = true, variant = 'default', ...props }, propRef) => {
    const { context: floatingContext, floatingStyles, refs, getFloatingProps, arrowRef } = useTooltipContext()
    const ref = useMergeRefs([refs.setFloating, propRef])

    if (!floatingContext.open) return null

    const currentVariant = variantStyles[variant]

    const content = (
      <div
        ref={ref}
        style={{ ...floatingStyles, ...style }}
        className={cn(
          'z-50 border-2 px-3 py-1.5 text-sm font-bold shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)',
          currentVariant.container,
          className
        )}
        {...getFloatingProps(props)}
      >
        {props.children}
        <FloatingArrow
          ref={arrowRef}
          context={floatingContext}
          fill={currentVariant.fill}
          stroke={currentVariant.stroke}
          strokeWidth={2}
        />
      </div>
    )

    if (!portaled) return content

    return <FloatingPortal>{content}</FloatingPortal>
  }
)

TooltipContent.displayName = 'TooltipContent'
