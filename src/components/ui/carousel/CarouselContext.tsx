/* eslint-disable react-refresh/only-export-components */

/**
 * @fileoverview Lithos UI carousel context provider and type definitions.
 * - Centralizes navigation methods, orientation flags, and indexing state for sub-components via `CarouselContext`.
 * - Memoizes provider value to prevent unnecessary re-renders across consumers (`CarouselControls`, `CarouselPagination`, `CarouselButton`).
 */
import { createContext, useMemo, type ReactNode } from 'react'

export type CarouselDirection = 'forwards' | 'backwards'
export type ScrollFuncProp = CarouselDirection | number
export type ScrollFunc = (direction: ScrollFuncProp) => void
export type SliderSelector = 'dots' | 'numbers'
export type CarouselMode = 'horizontal' | 'vertical'

export interface CarouselContextValue {
  scroll: ScrollFunc
  currentIndex: number
  totalSlides: number
  mode: CarouselMode
}

export const CarouselContext = createContext<CarouselContextValue | null>(null)

export interface CarouselProviderProps {
  children: ReactNode
  scroll: ScrollFunc
  currentIndex?: number
  totalSlides?: number
  mode?: CarouselMode
}

export const CarouselProvider = ({
  children,
  scroll,
  currentIndex = 0,
  totalSlides = 0,
  mode = 'horizontal',
}: CarouselProviderProps) => {
  const value = useMemo(
    () => ({
      scroll,
      currentIndex,
      totalSlides,
      mode,
    }),
    [scroll, currentIndex, totalSlides, mode]
  )

  return <CarouselContext.Provider value={value}>{children}</CarouselContext.Provider>
}
