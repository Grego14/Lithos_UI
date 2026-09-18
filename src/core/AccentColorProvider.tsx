import React from 'react'
import { isHexColor, type HexColor } from './types'
import { getContrastText } from '../utils/yiq'
import { AccentColorContext } from './AccentColorContext'

export const AccentColorProvider = ({ color, children }: { color: HexColor | string; children: React.ReactNode }) => {
  const accentColor = (isHexColor(color) ? color : '#00FF00') as HexColor
  const contrastedAccentColor = getContrastText(accentColor)

  return (
    <AccentColorContext.Provider value={{ accentColor, contrastedAccentColor }}>{children}</AccentColorContext.Provider>
  )
}
