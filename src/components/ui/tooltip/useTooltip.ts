/**
 * @fileoverview Lithos UI tooltip context and state hook.
 * - Holds the internal `arrowRef` required by FloatingArrow inside TooltipContent.
 * - Exposes `useTooltip` to guarantee subcomponents are rendered within a `<Tooltip />` provider.
 */
import { createContext, useContext, type RefObject } from 'react'
import type { TooltipReturn } from './tooltip.types'

export const useTooltip = () => {
  const context = useContext(TooltipContext)
  if (!context) throw Error('Tooltip components must be wrapped in <Tooltip />')

  return context
}

export type TooltipContextType =
  | (TooltipReturn & {
      arrowRef: RefObject<SVGSVGElement | null>
    })
  | null

export const TooltipContext = createContext<TooltipContextType>(null)
