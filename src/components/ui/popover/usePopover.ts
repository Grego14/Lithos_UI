/**
 * @fileoverview Lithos UI popover state primitive.
 * - Manages floating placement, backdrop interactions, open state (controlled/uncontrolled), and ARIA attributes.
 * - Encapsulates `@floating-ui/react` logic into a single reusable hook and Context provider.
 */
import { useState, useMemo, createContext, useContext, useId } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useInteractions,
  size,
  type ElementProps,
  type Placement,
  type UseFloatingReturn,
} from '@floating-ui/react'

export interface PopoverOptions {
  initialOpen?: boolean
  placement?: Placement
  modal?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  interactions?: ElementProps[]
  offset?: number
}

export type PopoverReturn = {
  open: boolean
  setOpen: (open: boolean) => void
  modal?: boolean | undefined
  labelId: string
  descriptionId: string
} & ReturnType<typeof useInteractions> &
  UseFloatingReturn

export const usePopover = ({
  initialOpen = false,
  placement = 'bottom-start',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  interactions: extraInteractions = [],
  offset: consumerOffset,
}: PopoverOptions = {}): PopoverReturn => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)
  const labelId = useId()
  const descriptionId = useId()

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(consumerOffset ?? 0),
      flip({
        fallbackAxisSideDirection: 'end',
      }),
      shift({ padding: 8 }),
      size({
        apply: ({ rects, elements }) => {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          })
        },
      }),
    ],
  })

  const context = data.context

  const click = useClick(context)
  const dismiss = useDismiss(context)

  const interactions = useInteractions([click, dismiss, ...extraInteractions])

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
    }),
    [open, setOpen, interactions, data, modal, labelId, descriptionId]
  )
}

export type PopoverContextType = PopoverReturn | null

export const PopoverContext = createContext<PopoverContextType>(null)

export const usePopoverContext = (): PopoverReturn => {
  const context = useContext(PopoverContext)
  if (!context) throw new Error('Popover components must be wrapped in <Popover />')

  return context
}
