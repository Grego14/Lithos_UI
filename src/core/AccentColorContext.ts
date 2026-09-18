import { createContext } from 'react'
import type { HexColor } from './types'

export interface AccentColorContextType {
  accentColor: HexColor
  contrastedAccentColor: string
}

export const AccentColorContext = createContext<AccentColorContextType | null>(null)
