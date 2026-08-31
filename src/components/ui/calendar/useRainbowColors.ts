/**
 * @fileoverview Custom hook for managing dynamic sequential ROYGBIV color assignment.
 * - Tracks date selection order in `rainbow` mode without re-triggering parent renders.
 * - Automatically purges deselected dates so re-selecting them gets the next active rainbow color.
 */
import { useState } from 'react'
import { ROYGBIV } from './calendar.utils'
import { toDateKey } from '../../../utils/date'

interface RainbowState {
  colorsMap: Map<string, string>
  colorIndex: number
  prevArray: Date[]
}

export const useRainbowColors = (mode: string, currentArray: Date[]) => {
  const [state, setState] = useState<RainbowState>(() => ({
    colorsMap: new Map(),
    colorIndex: 0,
    prevArray: currentArray,
  }))

  if (mode !== 'rainbow') {
    return new Map<string, string>()
  }

  if (state.prevArray !== currentArray) {
    const currentKeys = new Set(currentArray.map(toDateKey))
    const nextMap = new Map(state.colorsMap)
    let nextIndex = state.colorIndex

    currentArray.forEach((date) => {
      const key = toDateKey(date)
      if (!nextMap.has(key)) {
        nextMap.set(key, ROYGBIV[nextIndex % ROYGBIV.length] as string)
        nextIndex++
      }
    })

    // clean des-selected keys without doing anything on the selected ones
    for (const key of nextMap.keys()) {
      if (!currentKeys.has(key)) {
        nextMap.delete(key)
      }
    }

    const nextState = {
      colorsMap: nextMap,
      colorIndex: nextIndex,
      prevArray: currentArray,
    }

    setState(nextState)
    return nextMap
  }

  return state.colorsMap
}
