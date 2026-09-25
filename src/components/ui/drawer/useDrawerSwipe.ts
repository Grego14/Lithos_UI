import { useState, useRef, useCallback, useMemo, type PointerEvent, type CSSProperties } from 'react'
import type { UseDrawerSwipeOptions, DrawerVerticalPlacement } from './drawer.types'

const swipeOriginMap: Record<DrawerVerticalPlacement, string> = {
  bottom: 'bottom',
  top: 'top',
}

export const useDrawerSwipe = ({ placement, open, onClose, threshold = 100 }: UseDrawerSwipeOptions) => {
  const [dragOffset, setDragOffset] = useState(0)
  const pointerStart = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)

  const lastOffset = useRef(0)
  const isClosingViaSwipe = useRef(false)

  if (open && isClosingViaSwipe.current && dragOffset === 0) {
    isClosingViaSwipe.current = false
    lastOffset.current = 0
  }

  const handlePointerDownCapture = useCallback(
    (e: PointerEvent) => {
      if (!open) return

      const target = e.target as HTMLElement
      if (target.closest('button, input, textarea, select, a, [role="button"]')) return

      e.currentTarget.setPointerCapture(e.pointerId)
      pointerStart.current = { x: e.clientX, y: e.clientY }
      isDragging.current = true
    },
    [open]
  )

  const handlePointerMoveCapture = useCallback(
    (e: PointerEvent) => {
      if (!isDragging.current) return

      const deltaY = e.clientY - pointerStart.current.y

      let offset = 0

      if (placement === 'bottom' && deltaY > 0) {
        offset = deltaY
      } else if (placement === 'top' && deltaY < 0) {
        offset = Math.abs(deltaY)
      }

      if (offset > 0) {
        setDragOffset(offset)
        lastOffset.current = offset
      }
    },
    [placement]
  )

  const handlePointerUpCapture = useCallback(
    (e: PointerEvent) => {
      if (!isDragging.current) return

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId)
      }

      isDragging.current = false

      if (dragOffset >= threshold) {
        isClosingViaSwipe.current = true
        onClose()
      }

      setDragOffset(0)
    },
    [dragOffset, onClose, threshold]
  )

  const getSwipeStyle = useCallback((): CSSProperties => {
    const translateMap: Record<DrawerVerticalPlacement, string> = {
      bottom: `translateY(${dragOffset}px)`,
      top: `translateY(-${dragOffset}px)`,
    }

    if (dragOffset === 0) {
      if (isClosingViaSwipe.current) {
        const offset = lastOffset.current
        const translateValue = placement === 'bottom' ? `${offset}px` : `-${offset}px`

        return {
          // keep the swipe position while it hides
          transform: `translateY(${translateValue})`,
          transformOrigin: swipeOriginMap[placement],

          transitionProperty: 'translate, scale, transform, opacity',
        }
      }
      return {}
    }

    return {
      transform: translateMap[placement],
      transformOrigin: swipeOriginMap[placement],
      transitionDuration: '0ms',
      transitionProperty: 'none',
    }
  }, [dragOffset, placement])

  return useMemo(
    () => ({
      handlers: {
        onPointerDownCapture: handlePointerDownCapture,
        onPointerMoveCapture: handlePointerMoveCapture,
        onPointerUpCapture: handlePointerUpCapture,
      },
      style: getSwipeStyle(),
      isDragging: dragOffset > 0,
    }),
    [dragOffset, getSwipeStyle, handlePointerUpCapture, handlePointerDownCapture, handlePointerMoveCapture]
  )
}
