import { useEffect, useState } from 'react'
import { getContrastText } from '../utils/yiq'
import { isHexColor, type HexColor } from './types'

export interface UseLithosThemeProps {
  accentColor?: string
  radius?: number
}

/**
 * Custom hook for managing theme state with localStorage persistence.
 *
 * Manages dark/light mode state by reading from and writing to localStorage.
 * The theme preference is persisted under the key 'lithos-theme-mode'.
 */
export const useLithosTheme = (config?: UseLithosThemeProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize from localStorage using direct string comparison
    return localStorage.getItem('lithos-theme-mode') === 'dark'
  })

  const [accentColor, setAccentColor] = useState(() => {
    const stored = localStorage.getItem('lithos-theme-color')
    if (stored && isHexColor(stored)) return stored as HexColor
    return '#00FF00' as HexColor
  })

  const [radius, setRadius] = useState(() => {
    return parseInt(localStorage.getItem('lithos-theme-radius') || '0', 10)
  })

  const updateAccentColor = (color: HexColor | string) => {
    let validColor = color
    if (!isHexColor(color)) {
      console.warn(`[Lithos UI] Invalid hex color provided: "${color}". Falling back to default #00FF00.`)
      validColor = '#00FF00'
    }
    setAccentColor(validColor as HexColor)
    localStorage.setItem('lithos-theme-color', validColor)
  }

  const updateRadius = (newRadius: number) => {
    setRadius(newRadius)
    localStorage.setItem('lithos-theme-radius', newRadius.toString())
  }

  useEffect(() => {
    if (config?.accentColor) {
      updateAccentColor(config.accentColor)
    }
  }, [config?.accentColor])

  useEffect(() => {
    if (config?.radius !== undefined) {
      updateRadius(config.radius)
    }
  }, [config?.radius])

  useEffect(() => {
    let styleTag = document.getElementById('lithos-theme-overrides')
    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = 'lithos-theme-overrides'
      document.head.appendChild(styleTag)
    }

    const text = getContrastText(accentColor)
    styleTag.innerHTML = `
      *, :root, .obsidian, body.obsidian, .dark {
        --lithos-accent: ${accentColor} !important;
        --lithos-accent-text: ${text} !important;
        --lithos-radius: ${radius}px !important;
      }
      ::selection {
        background-color: var(--lithos-accent) !important;
        color: var(--lithos-accent-text) !important;
      }
    `
  }, [accentColor, isDarkMode, radius])

  const toggleObsidian = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode
      localStorage.setItem('lithos-theme-mode', newMode ? 'dark' : 'light')

      if (newMode) {
        document.body.classList.add('obsidian', 'dark')
      } else {
        document.body.classList.remove('obsidian', 'dark')
      }

      window.dispatchEvent(new Event('lithos-theme-mode-changed'))
      return newMode
    })
  }

  // Ensure body receives the initial class on mount
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('obsidian', 'dark')
    } else {
      document.body.classList.remove('obsidian', 'dark')
    }
  }, [isDarkMode])

  return { isDarkMode, toggleObsidian, accentColor, updateAccentColor, radius, updateRadius } as const
}
