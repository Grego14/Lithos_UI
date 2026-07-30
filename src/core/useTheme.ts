import { useEffect, useState } from 'react'
import { getContrastText, getYiqValue } from '../utils/yiq'
import type { HexColor } from './types'

/**
 * Custom hook for managing theme state with localStorage persistence.
 *
 * Manages dark/light mode state by reading from and writing to localStorage.
 * The theme preference is persisted under the key 'lithos-theme-mode'.
 */
export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize from localStorage using direct string comparison
    return localStorage.getItem('lithos-theme-mode') === 'dark'
  })

  const [accentColor, setAccentColor] = useState(() => {
    return (localStorage.getItem('lithos-theme-color') as HexColor | null) || ('#00FF00' as HexColor)
  })

  useEffect(() => {
    let styleTag = document.getElementById('lithos-theme-overrides')
    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = 'lithos-theme-overrides'
      document.head.appendChild(styleTag)
    }

    // YIQ Logic: Ensure the accent color remains visible against the background.
    // Instead of a binary light/dark check which breaks bright colors like cyan or yellow in light mode,
    // we only override colors that are EXTREMELY close to the background color.
    const yiq = getYiqValue(accentColor)
    let adaptiveAccent = accentColor

    // YIQ of pure white is 255. YIQ of pure black is 0.
    if (!isDarkMode && yiq > 240) {
      adaptiveAccent = '#000000' as HexColor
    } else if (isDarkMode && yiq < 15) {
      adaptiveAccent = '#FFFFFF' as HexColor
    }

    const text = getContrastText(adaptiveAccent)
    styleTag.innerHTML = `
      *, :root, .obsidian, body.obsidian, .dark {
        --lithos-accent: ${adaptiveAccent} !important;
        --lithos-accent-text: ${text} !important;
      }
      ::selection {
        background-color: var(--lithos-accent) !important;
        color: var(--lithos-accent-text) !important;
      }
    `
  }, [accentColor, isDarkMode])

  const toggleObsidian = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode
      // Save as raw string to match the original architecture
      localStorage.setItem('lithos-theme-mode', newMode ? 'dark' : 'light')
      return newMode
    })
  }

  const updateAccentColor = (color: HexColor) => {
    setAccentColor(color)
    localStorage.setItem('lithos-theme-color', color)
  }

  return { isDarkMode, toggleObsidian, accentColor, updateAccentColor } as const
}
