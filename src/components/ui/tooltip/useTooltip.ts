import React, { useState, useMemo, createContext, useContext } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  arrow,
  type Placement,
  type UseFloatingReturn,
} from '@floating-ui/react'

export interface TooltipOptions {
  initialOpen?: boolean
  placement?: Placement
  open?: boolean
  onOpenChange?: (open: boolean) => void
  offset?: number
}

export type TooltipReturn = {
  open: boolean
  setOpen: (open: boolean) => void
  arrowRef: React.MutableRefObject<SVGSVGElement | null>
} & ReturnType<typeof useInteractions> &
  UseFloatingReturn

export const useTooltip = ({
  initialOpen = false,
  placement = 'top',
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  offset: consumerOffset = 4,
}: TooltipOptions = {}): TooltipReturn => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)
  const arrowRef = React.useRef<SVGSVGElement | null>(null)

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(consumerOffset + 8),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift({ padding: 8 }),
      arrow({ element: arrowRef, padding: 8 }),
    ],
  })

  const { context } = data

  const hover = useHover(context, { move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const interactions = useInteractions([hover, focus, dismiss, role])

  return useMemo(
    () => ({
      open,
      setOpen,
      arrowRef,
      ...interactions,
      ...data,
    }),
    [open, setOpen, arrowRef, interactions, data]
  )
}

export type TooltipContextType = TooltipReturn | null

export const TooltipContext = createContext<TooltipContextType>(null)

export const useTooltipContext = (): TooltipReturn => {
  const context = useContext(TooltipContext)
  if (!context) throw new Error('Tooltip components must be wrapped in <Tooltip />')

  return context
}
