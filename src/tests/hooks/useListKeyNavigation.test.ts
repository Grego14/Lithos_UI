import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useListKeyNavigation } from '../../core/hooks/useListKeyNavigation'
import type { KeyboardEvent } from 'react'

const createKeyboardEvent = (key: string): KeyboardEvent<HTMLElement> =>
  ({
    key,
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
  }) as unknown as KeyboardEvent<HTMLElement>

describe('useListKeyNavigation Hook', () => {
  it('navigates to first non-disabled item on Home key', () => {
    const setActiveIndex = vi.fn()
    const { result } = renderHook(() =>
      useListKeyNavigation({
        getItemCount: () => 4,
        // the first is initially disabled so the activeIndex must be 1
        isItemDisabled: (index) => index === 0,
      })
    )

    const event = createKeyboardEvent('Home')
    result.current.handleKeyDown({
      event,
      activeIndex: 2,
      setActiveIndex,
    })

    expect(event.preventDefault).toHaveBeenCalled()
    expect(setActiveIndex).toHaveBeenCalledWith(1)
  })

  it('navigates to last non-disabled item on End key', () => {
    const setActiveIndex = vi.fn()
    const { result } = renderHook(() =>
      useListKeyNavigation({
        getItemCount: () => 4,
        isItemDisabled: (index) => index === 3,
      })
    )

    const event = createKeyboardEvent('End')
    result.current.handleKeyDown({
      event,
      activeIndex: 0,
      setActiveIndex,
    })

    expect(event.preventDefault).toHaveBeenCalled()
    expect(setActiveIndex).toHaveBeenCalledWith(2)
  })

  it('triggers onOpenSubmenu on ArrowRight when horizontal nav is enabled', () => {
    const onOpenSubmenu = vi.fn()
    const { result } = renderHook(() =>
      useListKeyNavigation({
        getItemCount: () => 3,
        isItemDisabled: () => false,
      })
    )

    const event = createKeyboardEvent('ArrowRight')
    result.current.handleKeyDown({
      event,
      activeIndex: 1,
      setActiveIndex: vi.fn(),
      onOpenSubmenu,
      enableHorizontalNav: true,
    })

    expect(event.preventDefault).toHaveBeenCalled()
    expect(onOpenSubmenu).toHaveBeenCalledWith(1)
  })

  it('triggers onCloseSubmenu on ArrowLeft when horizontal nav is enabled', () => {
    const onCloseSubmenu = vi.fn()
    const { result } = renderHook(() =>
      useListKeyNavigation({
        getItemCount: () => 3,
        isItemDisabled: () => false,
      })
    )

    const event = createKeyboardEvent('ArrowLeft')
    result.current.handleKeyDown({
      event,
      activeIndex: 1,
      setActiveIndex: vi.fn(),
      onCloseSubmenu,
      enableHorizontalNav: true,
    })

    expect(event.preventDefault).toHaveBeenCalled()
    expect(onCloseSubmenu).toHaveBeenCalled()
  })
})
