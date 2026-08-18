/**
 * @fileoverview Lithos UI carousel controls primitive (`CarouselControls`).
 * - Header/footer toolbar providing title display and next/previous navigation triggers.
 * - Reactive button boundary guards: automatically disables navigation triggers at bounds when loop mode is inactive.
 */
import type { ComponentPropsWithRef } from 'react'
import { cn } from '../../../utils/cn'
import { CarouselNext, CarouselPrev } from './CarouselButton'
import type { ClassValue, ClassArray } from 'clsx'
import { useCarousel } from './useCarousel'

export interface CarouselControlsProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  title?: string | undefined
  bottomPositioned?: boolean
  className?: ClassValue | ClassArray
  loop?: boolean
}

export const CarouselControls = ({
  title,
  bottomPositioned = false,
  className,
  loop = false,
  ref,
  ...rest
}: CarouselControlsProps) => {
  const { currentIndex, totalSlides } = useCarousel()

  return (
    <div
      ref={ref}
      className={cn(
        bottomPositioned ? 'mt-3' : 'mb-3',
        'flex flex-col sm:flex-row items-center justify-between',
        className
      )}
      {...rest}
    >
      {title && <h3 className="text-center sm:text-start mb-2 sm:mb-0 font-body sm:text-sm lg:text-xl">{title}</h3>}

      <div className="flex items-center flex-row">
        <CarouselPrev className="mr-4" disabled={!loop && currentIndex === 0} />
        <CarouselNext disabled={!loop && currentIndex === totalSlides - 1} />
      </div>
    </div>
  )
}
