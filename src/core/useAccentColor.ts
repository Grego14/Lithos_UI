import { useState } from 'react'
import type { HexColor } from './types'

export const useAccentColor = () => {
  const [accentColor] = useState<HexColor>(() => {
    const live = getComputedStyle(document.documentElement).getPropertyValue('--lithos-accent').trim()
    return (live || '#00FF00') as HexColor
  })

  return { accentColor } as const
}
