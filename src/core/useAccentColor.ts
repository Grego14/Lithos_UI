import { useState, useEffect } from 'react'
import { isHexColor, type HexColor } from './types'
import { getYiqValue } from '../utils/yiq'
import { getContrastText } from '../utils/yiq'

export const useAccentColor = () => {
  const [accentColor, setAccentColor] = useState<HexColor>(() => {
    if (typeof window === 'undefined') return '#00FF00' as HexColor
    const stored = localStorage.getItem('lithos-theme-color')
    const storedColor = stored && isHexColor(stored) ? (stored as HexColor) : ('#00FF00' as HexColor)
    const isDarkMode = localStorage.getItem('lithos-theme-mode') === 'dark'

    const yiq = getYiqValue(storedColor)
    if (!isDarkMode && yiq > 240) return '#000000' as HexColor
    if (isDarkMode && yiq < 15) return '#FFFFFF' as HexColor

    return storedColor
  })

  const contrastedAccentColor = getContrastText(accentColor)

  useEffect(() => {
    const handleSync = () => {
      const stored = localStorage.getItem('lithos-theme-color')
      const storedColor = stored && isHexColor(stored) ? (stored as HexColor) : ('#00FF00' as HexColor)
      const isDarkMode =
        document.body.classList.contains('dark') || localStorage.getItem('lithos-theme-mode') === 'dark'

      const yiq = getYiqValue(storedColor)
      let adaptiveAccent = storedColor
      if (!isDarkMode && yiq > 240) adaptiveAccent = '#000000' as HexColor
      if (isDarkMode && yiq < 15) adaptiveAccent = '#FFFFFF' as HexColor

      setAccentColor(adaptiveAccent)
    }

    window.addEventListener('storage', handleSync)
    window.addEventListener('lithos-theme-color-changed', handleSync)
    window.addEventListener('lithos-theme-mode-changed', handleSync)
    return () => {
      window.removeEventListener('storage', handleSync)
      window.removeEventListener('lithos-theme-color-changed', handleSync)
      window.removeEventListener('lithos-theme-mode-changed', handleSync)
    }
  }, [])

  return { accentColor, contrastedAccentColor } as const
}
