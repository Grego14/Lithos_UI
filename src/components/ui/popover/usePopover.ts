import * as React from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useId,
  size,
  type ElementProps,
} from '@floating-ui/react'
import type { Placement, ReferenceType, UseFloatingReturn, UseInteractionsReturn } from '@floating-ui/react'

export interface PopoverReturn extends UseFloatingReturn<ReferenceType>, UseInteractionsReturn {
  open: boolean
  setOpen: (open: boolean) => void
  modal: boolean | undefined
  labelId: string | undefined
  descriptionId: string | undefined
}

export interface PopoverOptions {
  initialOpen?: boolean
  placement?: Placement
  modal?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  interactions?: ElementProps[]
}

export const usePopover = ({
  initialOpen = false,
  placement = 'bottom-start',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  interactions: extraInteractions = [],
}: PopoverOptions = {}): PopoverReturn => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen)
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
      offset(0),
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
  const role = useRole(context)

  const interactions = useInteractions([click, dismiss, role, ...extraInteractions])

  return React.useMemo(
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

type ContextType = PopoverReturn | null

export const PopoverContext = React.createContext<ContextType>(null)

export const usePopoverContext = (): PopoverReturn => {
  const context = React.useContext(PopoverContext)
  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />')
  }
  return context
}
