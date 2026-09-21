/**
 * @fileoverview Lithos UI DropdownMenuSub primitive for nested menus.
 * - Instantiates a nested `Popover` configured with `right-start` placement by default.
 * - Leverages `useHover` with `safePolygon` to keep submenus open during diagonal cursor movements.
 * - Uses a custom trigger item that opens the nested surface on hover or focus without closing the root menu.
 */
import { useRef, useState, useMemo, type ReactNode } from 'react'
import { Popover, PopoverTrigger, type PopoverProps } from '../Popover'
import { Button } from '../Button'
import {
  useFloatingNodeId,
  useFloatingParentNodeId,
  FloatingNode,
  useMergeRefs,
  useListItem,
  FloatingPortal,
  safePolygon,
} from '@floating-ui/react'
import { DropdownMenuContent } from './DropdownMenuContent'

import { menuItemClass } from './DropdownMenu'

export interface DropdownMenuSubProps extends PopoverProps {
  trigger: ReactNode
  disabled?: boolean
}

export const DropdownMenuSub = ({
  children,
  trigger,
  placement = 'right-start',
  disabled,
  ...props
}: DropdownMenuSubProps) => {
  const [open, setOpen] = useState(false)
  const { ref: listItemRef, index } = useListItem()
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const mergedRef = useMergeRefs([listItemRef, triggerRef])

  const nodeId = useFloatingNodeId()
  const parentId = useFloatingParentNodeId()

  const popoverProps = useMemo(
    () => ({
      open,
      onOpenChange: setOpen,
      placement,
      nodeId,
      focus: true,
      parentId,
      hover: {
        delay: { open: 300, close: 150 },
        restMs: 100,
        handleClose: safePolygon(),
      },
      ...props,
    }),
    [nodeId, open, parentId, placement, props]
  )

  const handleCloseSubmenu = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <FloatingNode id={nodeId}>
      <Popover {...popoverProps}>
        <PopoverTrigger asChild ref={mergedRef}>
          <Button
            variant="text"
            aria-haspopup="menu"
            role="menuitem"
            data-index={index}
            tabIndex={0}
            className={menuItemClass}
            disabled={disabled}
          >
            {trigger}
          </Button>
        </PopoverTrigger>

        {open && (
          <FloatingPortal>
            <DropdownMenuContent onCloseSubmenu={handleCloseSubmenu}>{children}</DropdownMenuContent>
          </FloatingPortal>
        )}
      </Popover>
    </FloatingNode>
  )
}
