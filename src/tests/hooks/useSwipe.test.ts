import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useSwipe } from '../../core/hooks/useSwipe'

// Helper mock to simulate PointerEvents with pointer capture methods
const createMockPointerEvent = (type: string, props: Partial<PointerEvent> = {}) => {
  const target = props.target || document.createElement('div')
  const currentTarget = props.currentTarget || target

  if (!('hasPointerCapture' in currentTarget)) {
    ;(currentTarget as HTMLElement).hasPointerCapture = vi.fn().mockReturnValue(false)
  }
  if (!('setPointerCapture' in currentTarget)) {
    ;(currentTarget as HTMLElement).setPointerCapture = vi.fn()
  }
  if (!('releasePointerCapture' in currentTarget)) {
    ;(currentTarget as HTMLElement).releasePointerCapture = vi.fn()
  }

  return {
    type,
    clientX: 0,
    clientY: 0,
    pointerId: 1,
    target,
    currentTarget,
    preventDefault: vi.fn(),
    ...props,
  } as unknown as React.PointerEvent<HTMLElement>
}

describe('useSwipe', () => {
  const onDismissMock = vi.fn()

  beforeEach(() => vi.clearAllMocks())

  it('should initialize with default empty style and non-dragging state', () => {
    const { result } = renderHook(() =>
      useSwipe({
        placement: 'bottom',
        open: true,
        onDismiss: onDismissMock,
      })
    )

    expect(result.current.isDragging).toBe(false)
    expect(result.current.dragOffset).toBe(0)
    expect(result.current.style).toEqual({})
  })

  it('should ignore gesture capture when open is false', () => {
    const { result } = renderHook(() =>
      useSwipe({
        placement: 'bottom',
        open: false,
        onDismiss: onDismissMock,
      })
    )

    const pointerDownEvent = createMockPointerEvent('pointerdown', {
      clientX: 100,
      clientY: 100,
    })

    act(() => {
      result.current.handlers.onPointerDownCapture(pointerDownEvent)
    })

    const pointerMoveEvent = createMockPointerEvent('pointermove', {
      clientX: 100,
      clientY: 150,
    })

    act(() => {
      result.current.handlers.onPointerMoveCapture(pointerMoveEvent)
    })

    expect(result.current.isDragging).toBe(false)
    expect(result.current.dragOffset).toBe(0)
  })

  it('should ignore gesture start when clicking interactive controls', () => {
    const { result } = renderHook(() =>
      useSwipe({
        placement: 'bottom',
        open: true,
        onDismiss: onDismissMock,
      })
    )

    const buttonElement = document.createElement('button')
    const pointerDownEvent = createMockPointerEvent('pointerdown', {
      target: buttonElement,
      clientX: 100,
      clientY: 100,
    })

    act(() => {
      result.current.handlers.onPointerDownCapture(pointerDownEvent)
    })

    const pointerMoveEvent = createMockPointerEvent('pointermove', {
      clientX: 100,
      clientY: 150,
    })

    act(() => {
      result.current.handlers.onPointerMoveCapture(pointerMoveEvent)
    })

    expect(result.current.isDragging).toBe(false)
    expect(result.current.dragOffset).toBe(0)
  })

  it('should calculate positive dragOffset and dynamic transform style during valid swipe', () => {
    const { result } = renderHook(() =>
      useSwipe({
        placement: 'bottom',
        open: true,
        onDismiss: onDismissMock,
      })
    )

    const container = document.createElement('div')

    act(() => {
      result.current.handlers.onPointerDownCapture(
        createMockPointerEvent('pointerdown', {
          currentTarget: container,
          target: container,
          clientX: 100,
          clientY: 100,
        })
      )
    })

    act(() => {
      result.current.handlers.onPointerMoveCapture(
        createMockPointerEvent('pointermove', {
          currentTarget: container,
          target: container,
          clientX: 100,
          clientY: 150,
        })
      )
    })

    expect(result.current.isDragging).toBe(true)
    expect(result.current.dragOffset).toBe(50)
    expect(result.current.style).toEqual({
      transform: 'translateY(50px)',
      transformOrigin: 'bottom',
      transitionDuration: '0ms',
      transitionProperty: 'none',
    })
  })

  it('should trigger onDismiss when dragOffset meets or exceeds threshold', () => {
    const { result } = renderHook(() =>
      useSwipe({
        placement: 'bottom',
        open: true,
        onDismiss: onDismissMock,
        threshold: 100,
      })
    )

    const container = document.createElement('div')

    act(() => {
      result.current.handlers.onPointerDownCapture(
        createMockPointerEvent('pointerdown', {
          currentTarget: container,
          target: container,
          clientX: 100,
          clientY: 100,
        })
      )
    })

    act(() => {
      result.current.handlers.onPointerMoveCapture(
        createMockPointerEvent('pointermove', {
          currentTarget: container,
          target: container,
          clientX: 100,
          clientY: 220,
        })
      )
    })

    expect(result.current.dragOffset).toBe(120)

    act(() => {
      result.current.handlers.onPointerUpCapture(
        createMockPointerEvent('pointerup', {
          currentTarget: container,
          target: container,
        })
      )
    })

    expect(onDismissMock).toHaveBeenCalledTimes(1)
    expect(result.current.isDragging).toBe(false)
    expect(result.current.dragOffset).toBe(0)
  })

  it('should not trigger onDismiss when release occurs below threshold', () => {
    const { result } = renderHook(() =>
      useSwipe({
        placement: 'bottom',
        open: true,
        onDismiss: onDismissMock,
        threshold: 100,
      })
    )

    const container = document.createElement('div')

    act(() => {
      result.current.handlers.onPointerDownCapture(
        createMockPointerEvent('pointerdown', {
          currentTarget: container,
          target: container,
          clientX: 100,
          clientY: 100,
        })
      )
    })

    act(() => {
      result.current.handlers.onPointerMoveCapture(
        createMockPointerEvent('pointermove', {
          currentTarget: container,
          target: container,
          clientX: 100,
          clientY: 150,
        })
      )
    })

    expect(result.current.dragOffset).toBe(50)

    act(() => {
      result.current.handlers.onPointerUpCapture(
        createMockPointerEvent('pointerup', {
          currentTarget: container,
          target: container,
        })
      )
    })

    expect(onDismissMock).not.toHaveBeenCalled()
    expect(result.current.isDragging).toBe(false)
    expect(result.current.dragOffset).toBe(0)
  })

  it('should reset swipe state on pointer cancel', () => {
    const { result } = renderHook(() =>
      useSwipe({
        placement: 'right',
        open: true,
        onDismiss: onDismissMock,
      })
    )

    const container = document.createElement('div')

    act(() => {
      result.current.handlers.onPointerDownCapture(
        createMockPointerEvent('pointerdown', {
          currentTarget: container,
          target: container,
          clientX: 100,
          clientY: 100,
        })
      )
    })

    act(() => {
      result.current.handlers.onPointerMoveCapture(
        createMockPointerEvent('pointermove', {
          currentTarget: container,
          target: container,
          clientX: 180,
          clientY: 100,
        })
      )
    })

    expect(result.current.isDragging).toBe(true)

    act(() => {
      result.current.handlers.onPointerCancelCapture(
        createMockPointerEvent('pointercancel', {
          currentTarget: container,
          target: container,
        })
      )
    })

    expect(result.current.isDragging).toBe(false)
    expect(result.current.dragOffset).toBe(0)
  })

  it('should block native browser drag behavior on drag start', () => {
    const { result } = renderHook(() =>
      useSwipe({
        placement: 'bottom',
        open: true,
        onDismiss: onDismissMock,
      })
    )

    const preventDefaultMock = vi.fn()
    const dragEvent = {
      preventDefault: preventDefaultMock,
    } as unknown as React.DragEvent<HTMLDivElement>

    act(() => {
      result.current.handlers.onDragStartCapture(dragEvent)
    })

    expect(preventDefaultMock).toHaveBeenCalledTimes(1)
  })
})
