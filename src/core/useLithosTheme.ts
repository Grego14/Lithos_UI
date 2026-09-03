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

  const [prevConfigAccent, setPrevConfigAccent] = useState(config?.accentColor)

  if (config?.accentColor !== undefined && config.accentColor !== prevConfigAccent) {
    setPrevConfigAccent(config.accentColor)
    let validColor = config.accentColor
    if (!isHexColor(validColor)) {
      console.warn(`[Lithos UI] Invalid hex color provided: "${validColor}". Falling back to default #00FF00.`)
      validColor = '#00FF00'
    }
    setAccentColor(validColor as HexColor)
  }

  const [radius, setRadius] = useState(() => {
    return parseInt(localStorage.getItem('lithos-theme-radius') || '0', 10)
  })

  const [prevConfigRadius, setPrevConfigRadius] = useState(config?.radius)

  if (config?.radius !== undefined && config.radius !== prevConfigRadius) {
    setPrevConfigRadius(config.radius)
    setRadius(config.radius)
  }

  const updateAccentColor = (color: HexColor | string) => {
    let validColor = color
    if (!isHexColor(color)) {
      console.warn(`[Lithos UI] Invalid hex color provided: "${color}". Falling back to default #00FF00.`)
      validColor = '#00FF00'
    }
    setAccentColor(validColor as HexColor)
  }

  const updateRadius = (newRadius: number) => {
    setRadius(newRadius)
  }

  // Side-effect: sync accentColor to localStorage and dispatch event
  useEffect(() => {
    localStorage.setItem('lithos-theme-color', accentColor)
    window.dispatchEvent(new Event('lithos-theme-color-changed'))
  }, [accentColor])

  // Side-effect: sync radius to localStorage
  useEffect(() => {
    localStorage.setItem('lithos-theme-radius', radius.toString())
  }, [radius])

  // Side-effect: sync dark mode to localStorage, DOM, and dispatch event
  useEffect(() => {
    localStorage.setItem('lithos-theme-mode', isDarkMode ? 'dark' : 'light')

    if (isDarkMode) {
      document.body.classList.add('obsidian', 'dark')
    } else {
      document.body.classList.remove('obsidian', 'dark')
    }

    window.dispatchEvent(new Event('lithos-theme-mode-changed'))
  }, [isDarkMode])

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
    setIsDarkMode((prevMode) => !prevMode)
  }

  return { isDarkMode, toggleObsidian, accentColor, updateAccentColor, radius, updateRadius } as const
}
