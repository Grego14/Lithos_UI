import { useState, useMemo, createContext, useContext } from 'react'
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

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(consumerOffset),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift({ padding: 8 }),
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
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data]
  )
}

export type TooltipContextType = TooltipReturn | null

export const TooltipContext = createContext<TooltipContextType>(null)

export const useTooltipContext = (): TooltipReturn => {
  const context = useContext(TooltipContext)
  if (!context) throw new Error('Tooltip components must be wrapped in <Tooltip />')

  return context
}
