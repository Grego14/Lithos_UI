import {
  cloneElement,
  isValidElement,
  type ReactNode,
  type HTMLProps,
  type ReactElement,
  type Ref,
  type ComponentPropsWithRef,
} from 'react'
import { useMergeRefs } from '@floating-ui/react'
import { useTooltipContext } from './useTooltip'

export interface TooltipTriggerProps extends ComponentPropsWithRef<'button'> {
  children: ReactNode
  asChild?: boolean
}

export const TooltipTrigger = ({ children, asChild = false, ref: propRef, ...props }: TooltipTriggerProps) => {
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
    <button ref={ref} type="button" data-state={context.open ? 'open' : 'closed'} {...context.getReferenceProps(props)}>
      {children}
    </button>
  )
}

TooltipTrigger.displayName = 'TooltipTrigger'
