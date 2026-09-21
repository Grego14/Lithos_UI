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
  useHover,
  useInteractions,
  size,
  type ElementProps,
  type Placement,
  type UseFloatingReturn,
  type UseHoverProps,
} from '@floating-ui/react'

export interface PopoverOptions {
  initialOpen?: boolean
  placement?: Placement
  modal?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  interactions?: ElementProps[]
  offset?: number
  hover?: boolean | UseHoverProps
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
  hover: hoverOptions = false,
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
          const width = `${rects.reference.width}px`

          if (elements.floating.style.width !== width) {
            elements.floating.style.width = width
          }
        },
      }),
    ],
  })

  const { context } = data

  const hover = useHover(context, {
    enabled: !!hoverOptions,
    ...(typeof hoverOptions === 'object' ? hoverOptions : {}),
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const interactions = useInteractions([click, hover, dismiss, ...extraInteractions])

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
