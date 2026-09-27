import type { ReactNode } from 'react'
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ThemeProvider } from '../../core/ThemeProvider'
import { useTheme } from '../../core/hooks/useTheme'

describe('ThemeProvider & useTheme integration', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.style.cssText = ''
    document.body.className = ''
  })

  it('should synchronize state between two components consuming useTheme', () => {
    // Both hooks share the exact same Provider instance
    const wrapper = ({ children }: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>

    const { result } = renderHook(
      () => ({
        consumerA: useTheme(),
        consumerB: useTheme(),
      }),
      { wrapper }
    )

    // Verify initial state
    expect(result.current.consumerA.accentColor).toBe('#00FF00')
    expect(result.current.consumerB.accentColor).toBe('#00FF00')

    // Consumer A updates accent color
    act(() => {
      result.current.consumerA.updateAccentColor('#FF0000')
    })

    // Both consumers reflect the changes instantly
    expect(result.current.consumerA.accentColor).toBe('#FF0000')
    expect(result.current.consumerB.accentColor).toBe('#FF0000')

    // Consumer B toggles obsidian (dark mode)
    act(() => {
      result.current.consumerB.toggleObsidian()
    })

    expect(result.current.consumerA.isDarkMode).toBe(true)
    expect(result.current.consumerB.isDarkMode).toBe(true)
  })

  it('should sync state with localStorage and documentElement styles', () => {
    const wrapper = ({ children }: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>

    const { result } = renderHook(() => useTheme(), { wrapper })

    act(() => {
      result.current.updateRadius(12)
    })

    expect(result.current.radius).toBe(12)

    expect(document.documentElement.style.getPropertyValue('--lithos-radius')).toBe('12px')

    // Verify localStorage sync
    expect(localStorage.setItem).toHaveBeenCalledWith('lithos-theme-radius', '12')
  })

  it('should handle custom window events on theme changes', () => {
    const listener = vi.fn()

    const wrapper = ({ children }: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>

    // Attach listener BEFORE mounting the provider to capture events cleanly
    window.addEventListener('lithos-theme-mode-changed', listener)

    const { result } = renderHook(() => useTheme(), { wrapper })

    // Reset initial mount invocation count
    listener.mockClear()

    act(() => {
      result.current.toggleObsidian()
    })

    expect(listener).toHaveBeenCalledTimes(1)

    window.removeEventListener('lithos-theme-mode-changed', listener)
  })
})
