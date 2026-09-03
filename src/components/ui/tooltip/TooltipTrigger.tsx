import {
  cloneElement,
  isValidElement,
  type ReactNode,
  forwardRef,
  type HTMLProps,
  type ReactElement,
  type Ref,
} from 'react'
import { useMergeRefs } from '@floating-ui/react'
import { useTooltipContext } from './useTooltip'

export interface TooltipTriggerProps {
  children: ReactNode
  asChild?: boolean
}

export const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ children, asChild = false, ...props }, propRef) => {
    const context = useTooltipContext()
    const childrenRef = isValidElement(children) ? (children as ReactElement & { ref?: Ref<unknown> }).ref : null
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

    if (asChild && isValidElement(children)) {
      return cloneElement(
        children,
        context.getReferenceProps({
          ref,
          ...props,
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
        {...context.getReferenceProps(props)}
      >
        {children}
      </button>
    )
  }
)

TooltipTrigger.displayName = 'TooltipTrigger'
