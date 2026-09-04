/**
 * @fileoverview Lithos UI carousel slide item (`CarouselSlide`).
 * - CSS snap-point target (`snap-start`) designed for zero-shrink layouts within the carousel viewport track.
 * - Accessible slide container utilizing `role="group"`, `aria-roledescription="slide"`, and automatic indexing labels.
 * - Focus and accessibility boundary management: applies `inert` and `aria-hidden` attributes to non-active slides to prevent off-screen tab focus.
 */
import type { ComponentPropsWithRef } from 'react'
import { cn, type LithosClass } from '../../../utils/cn'
import { useCarousel } from './useCarousel'

export interface CarouselSlideProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  index?: number
  label?: string
  className?: LithosClass
}

export const CarouselSlide = ({ index, label, className, children, ...rest }: CarouselSlideProps) => {
  const { currentIndex, totalSlides } = useCarousel()

  const slideIndex = index ?? 0
  const isActive = currentIndex === slideIndex
  const slideLabel = label || `${slideIndex + 1} of ${totalSlides}`

  // in case of height change, please also update the height of the children
  // container on the ../Carousel.tsx file (trackClass variable)
  const classes = cn(
    'snap-start shrink-0 w-full border-2 border-(--lithos-border) h-80 flex items-center justify-center',
    className
  )

  return (
    <div
      className={classes}
      role="group"
      aria-roledescription="slide"
      aria-label={slideLabel}
      aria-hidden={!isActive}
      inert={!isActive ? true : undefined}
      {...rest}
    >
      {children}
    </div>
  )
}
