import type { ReactNode } from 'react'
import { useTooltip, TooltipContext, type TooltipOptions } from './useTooltip'

export interface TooltipProps extends TooltipOptions {
  children: ReactNode
}

export const Tooltip = ({ children, ...options }: TooltipProps) => {
  const tooltip = useTooltip(options)

  return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>
}
