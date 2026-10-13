import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useResizer } from '../../core/hooks/useResizer'

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

describe('useResizer', () => {
  const onSnapMock = vi.fn()
  const onDismissMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with base width and default style state', () => {
    const { result } = renderHook(() =>
      useResizer({
        placement: 'right',
        baseWidthPx: 250,
        minWidthPx: 100,
        maxWidthPx: 500,
      })
    )

    expect(result.current.isDragging).toBe(false)
    expect(result.current.currentWidth).toBe(250)
    expect(result.current.style).toEqual({})
  })

  it('should update currentWidth dynamically while dragging', () => {
    const { result } = renderHook(() =>
      useResizer({
        placement: 'right',
        baseWidthPx: 200,
        minWidthPx: 100,
        maxWidthPx: 400,
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
          clientX: 50, // Delta x = -50 -> rawWidth = 200 - (-50) = 250
          clientY: 100,
        })
      )
    })

    expect(result.current.isDragging).toBe(true)
    expect(result.current.currentWidth).toBe(250)
    expect(result.current.style).toEqual({
      width: '250px',
      transitionDuration: '0ms',
      transitionProperty: 'none',
    })
  })

  it('should clamp width between minWidthPx and maxWidthPx boundaries', () => {
    const { result } = renderHook(() =>
      useResizer({
        placement: 'right',
        baseWidthPx: 200,
        minWidthPx: 100,
        maxWidthPx: 300,
      })
    )

    const container = document.createElement('div')

    act(() => {
      result.current.handlers.onPointerDownCapture(
        createMockPointerEvent('pointerdown', {
          currentTarget: container,
          target: container,
          clientX: 200,
          clientY: 100,
        })
      )
    })

    // drag to the left far from the maximum (200 - (-200) = 400 -> clamped to 300)
    act(() => {
      result.current.handlers.onPointerMoveCapture(
        createMockPointerEvent('pointermove', {
          currentTarget: container,
          target: container,
          clientX: 0,
          clientY: 100,
        })
      )
    })

    expect(result.current.currentWidth).toBe(300)

    // drag to the right far from the minimum (200 - 150 = 50 -> clamped to 100)
    act(() => {
      result.current.handlers.onPointerMoveCapture(
        createMockPointerEvent('pointermove', {
          currentTarget: container,
          target: container,
          clientX: 350,
          clientY: 100,
        })
      )
    })

    expect(result.current.currentWidth).toBe(100)
  })

  it('should handle snapPoints calculation and call onSnap on release', () => {
    const snapPoints = [80, 160, 240, 320]
    const { result } = renderHook(() =>
      useResizer({
        placement: 'right',
        baseWidthPx: 200,
        snapPoints,
        onSnap: onSnapMock,
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
          clientX: 65, // offset = -35 -> rawWidth = 235
          clientY: 100,
        })
      )
    })

    expect(result.current.currentWidth).toBe(235)

    act(() => {
      result.current.handlers.onPointerUpCapture(
        createMockPointerEvent('pointerup', {
          currentTarget: container,
          target: container,
          clientX: 65,
          clientY: 100,
        })
      )
    })

    // closest snap point of 235 is 240
    expect(onSnapMock).toHaveBeenCalledWith(240)
    expect(result.current.isDragging).toBe(false)
  })

  it('should call onDismiss when resizing at or below minWidthPx', () => {
    const { result } = renderHook(() =>
      useResizer({
        placement: 'right',
        baseWidthPx: 100,
        minWidthPx: 80,
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
          clientX: 130, // offset = 30 -> rawWidth = 70 -> clamped to 80
          clientY: 100,
        })
      )
    })

    expect(result.current.currentWidth).toBe(80)

    act(() => {
      result.current.handlers.onPointerUpCapture(
        createMockPointerEvent('pointerup', {
          currentTarget: container,
          target: container,
          clientX: 130,
          clientY: 100,
        })
      )
    })

    expect(onDismissMock).toHaveBeenCalledTimes(1)
  })

  it('should ignore gestures when clicking on interactive content controls', () => {
    const { result } = renderHook(() =>
      useResizer({
        placement: 'right',
        baseWidthPx: 200,
        allowGestureOnContent: true,
      })
    )

    const button = document.createElement('button')

    act(() => {
      result.current.handlers.onPointerDownCapture(createMockPointerEvent('pointerdown', { target: button }))
    })

    act(() => {
      result.current.handlers.onPointerMoveCapture(
        createMockPointerEvent('pointermove', {
          clientX: 50,
          clientY: 100,
        })
      )
    })

    expect(result.current.isDragging).toBe(false)
    expect(result.current.currentWidth).toBe(200)
  })

  it('should cancel drag operation on orthogonal scroll', () => {
    const { result } = renderHook(() =>
      useResizer({
        placement: 'right',
        baseWidthPx: 200,
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
          clientY: 250,
        })
      )
    })

    expect(result.current.isDragging).toBe(false)
  })

  it('should prevent native browser dragging when drag starts', () => {
    const { result } = renderHook(() =>
      useResizer({
        placement: 'right',
        allowGestureOnContent: true,
      })
    )

    const preventDefault = vi.fn()
    const dragEvent = { preventDefault } as unknown as React.DragEvent<HTMLDivElement>

    act(() => {
      result.current.handlers.onDragStartCapture(dragEvent)
    })

    expect(preventDefault).toHaveBeenCalledTimes(1)
  })
})
