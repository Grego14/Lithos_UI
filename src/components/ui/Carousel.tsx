import { forwardRef, useEffect, useRef, useState, Children, type ComponentPropsWithoutRef, type KeyboardEvent } from 'react'
import { Button } from './Button'
import { cn } from '../../utils/cn'

export type SliderSelector = 'dots' | 'numbers'
export type CarouselSlideDirection = 'prev' | 'next' | number
export type ScrollFunc = (val: CarouselSlideDirection) => void

export interface CarouselProps extends ComponentPropsWithoutRef<'div'> {
  controlsPosition?: 'top' | 'bottom' | undefined
  title?: string | undefined
  hideExtras?: boolean | undefined
  hideControls?: boolean | undefined
  extras?: {
    slidersSelector?: SliderSelector | undefined
    currentSlider?: boolean | undefined
  } | undefined
  playInfinite?: boolean | undefined
  playInterval?: number | undefined
  playDirection?: 'right' | 'left'
  stopOnHover?: boolean | undefined
}

// used on the dots svg
const iconClass = {
  default: 'w-2 h-2',
  visible: 'w-3 h-3',
  selected: 'w-4 h-4'
}

interface ControlsProps {
  title?: string | undefined
  scroll: ScrollFunc
  bottomPositioned?: boolean | undefined
}

const CarouselControls = forwardRef<HTMLDivElement, ControlsProps>(
  ({ title, scroll, bottomPositioned = false, ...rest }, ref) => {
    return (
      <div
        className={`${bottomPositioned ? 'mt-3' : 'mb-3'} flex flex-col sm:flex-row items-center justify-between border-t-4 border-(--lithos-border) pt-2`}
        ref={ref}
        {...rest}
      >
        <h3 className='text-center sm:text-start mb-2 sm:mb-0'>{title}</h3>
        <div className='flex items-center'>
          <Button className='mr-4' aria-label='Previous slide' onClick={() => scroll('prev')}>
            <svg className='w-6 h-6 lg:w-8 lg:h-8' width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g><path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g>
            </svg>
          </Button>
          <Button aria-label='Next slide' onClick={() => scroll('next')}>
            <svg className='w-6 h-6 lg:w-8 lg:h-8' width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g><path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g>
            </svg>
          </Button>
        </div>
      </div>
    )
  }
)

interface CarouselExtrasProps {
  index: number
  slides: number
  scroll: ScrollFunc
  sliderSelector: SliderSelector
  currentSlider: boolean
  bottomControls: boolean
}

const CarouselExtras = forwardRef<HTMLDivElement, CarouselExtrasProps>(
  ({ index, slides, scroll, sliderSelector = 'dots', currentSlider = false, bottomControls = false }, ref) => {
    const slidersSelector = []

    for (let i = 0; i < slides; i++) {
      const isLast = i === slides - 1
      const isSelected = i === index
      const extraVisible = i === index - 1 || i === index + 1
      const shouldHide = i < index - 2 || i > index + 2

      const classes = [
        isLast ? 'mr-0' : 'mr-4',
        extraVisible ? 'opacity-85' : 'opacity-60',
        shouldHide && 'absolute invisible opacity-0',
        isSelected && 'opacity-100'
      ]

      const dotSize = isSelected ? iconClass['selected'] : iconClass[extraVisible ? 'visible' : 'default']

      slidersSelector.push(
        <Button
          className={classes}
          intent={isSelected ? 'primary' : 'text'}
          onClick={() => scroll(i)}
          key={`slider-selector-${i}`}
          aria-label={`Move to the ${i + 1} slide`}
          aria-hidden={shouldHide}
        >
          {sliderSelector === 'dots' && (
            <svg
              className={dotSize}
              width="100"
              height="100"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <g><path fill="currentColor" d="M8 3a5 5 0 100 10A5 5 0 008 3z"></path></g>
            </svg>
          )}
          {sliderSelector === 'numbers' && i + 1}
        </Button>
      )
    }

    return (
      <div className={`${bottomControls ? 'mb-4' : 'mt-2'} flex items-center justify-center`} ref={ref}>
        <div className={`flex ml-auto ${!currentSlider ? 'mx-auto' : ''}`}>
          {slidersSelector}
        </div>
        {currentSlider && (
          <span className='ml-auto'>{index + 1}/{slides}</span>
        )}
      </div>
    )
  }
)

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({
    controlsPosition = 'top',
    title,
    children,
    className,
    hideExtras = false,
    hideControls = false,
    extras,
    playInfinite = false,
    playInterval = 5000,
    playDirection = 'right',
    stopOnHover = true,
    ...rest
  }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [index, setIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const defaultConfig = {
      slidersSelector: 'dots',
      currentSlider: true
    }
    const extrasConfig = Object.assign(defaultConfig, extras)

    const slides = Children.count(children)
    const normalizedSlides = slides - 1 // we use a 0 indexed list
    const isTop = controlsPosition === 'top'

    // ensure the carousel always resets to slide 0 when mounting
    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollLeft = 0
      }
    }, [])

    // realigns the exact scroll if the window is resized
    useEffect(() => {
      const carousel = containerRef.current

      if (!carousel) return

      const handleResize = () => {
        carousel.scrollTo({ left: index * carousel.clientWidth, behavior: 'instant' })
      }

      const observer = new ResizeObserver(handleResize)
      observer.observe(carousel)

      return () => observer.disconnect()
    }, [index])

    const scroll = (direction: CarouselSlideDirection) => {
      const carousel = containerRef.current

      if (!carousel || !slides) return

      const amount = carousel.clientWidth
      const isNext = direction === 'next'

      let newIndex

      // allow moving to a specific slide
      if (typeof direction === 'number') {
        carousel.scrollTo({ left: direction * amount, behavior: 'instant' })
        newIndex = direction
      } else {
        const moveToFirst = index === normalizedSlides && isNext
        const moveToLast = index === 0 && !isNext

        const getMoveTo = () => {
          if (moveToFirst) return 0 // initial slide
          if (moveToLast) return amount * normalizedSlides // last slide
          if (isNext) return amount * (index + 1) // next/prev slide

          return amount * (index - 1)
        }

        carousel.scrollTo({ left: getMoveTo(), behavior: 'instant' })

        if (isNext) { newIndex = index + 1 }
        else { newIndex = index - 1 }

        // Infinite scroll
        if (moveToFirst) { newIndex = 0 }
        if (moveToLast) { newIndex = normalizedSlides }
      }

      setIndex(newIndex)
    }

    useEffect(() => {
      if (!playInfinite || isPaused || slides <= 1) return

      const timer = setInterval(() => {
        const carousel = containerRef.current

        if (!carousel) return

        setIndex((prevIndex) => {
          const amount = carousel.clientWidth
          let nextIndex = prevIndex + (playDirection === 'right' ? 1 : -1)

          if (nextIndex < 0) { nextIndex = normalizedSlides }
          if (nextIndex > normalizedSlides) { nextIndex = 0 }

          carousel.scrollTo({ left: nextIndex * amount, behavior: 'instant' })
          return nextIndex
        })
      }, playInterval)

      return () => clearInterval(timer)
    }, [playInfinite, isPaused, playInterval, playDirection, normalizedSlides, slides])

    const classes = cn(
      'w-full border-4 border-(--lithos-border) bg-(--lithos-surface) p-2 sm:p-4 shadow-[4px_4px_0_0_var(--lithos-shadow)]',
      className
    )

    const carouselExtrasProps = {
      index,
      slides,
      scroll,
      sliderSelector: extrasConfig.slidersSelector,
      currentSlider: extrasConfig.currentSlider,
      bottomControls: !isTop
    }


    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') scroll('prev')
      if (e.key === 'ArrowRight') scroll('next')
    }

    const handleMouseEnter = () => stopOnHover && setIsPaused(true)
    const handleMouseLeave = () => stopOnHover && setIsPaused(false)
    const handleFocus = () => stopOnHover && setIsPaused(true)
    const handleBlur = () => stopOnHover && setIsPaused(false)

    return (
      <div
        className={classes}
        ref={ref}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        role='region'
        aria-roledescription='carousel'
        aria-label={title || 'Carousel'}
        {...rest}
      >
        {!isTop && !hideExtras && <CarouselExtras {...carouselExtrasProps} />}
        {isTop && !hideControls && <CarouselControls title={title} scroll={scroll} bottomPositioned={!isTop} />}

        {/* Hard-Snap horizontal slab */}
        <div ref={containerRef} className='flex overflow-x-hidden snap-x snap-mandatory'>
          {children}
        </div>

        <div className='sr-only' aria-live='polite' aria-atomic='true'>
          {`Slide ${index + 1} of ${slides}`}
        </div>

        {isTop && !hideExtras && <CarouselExtras {...carouselExtrasProps} />}
        {!isTop && !hideControls && <CarouselControls title={title} scroll={scroll} bottomPositioned={!isTop} />}
      </div>
    )
  }
)

Carousel.displayName = 'Carousel'

export const CarouselSlide = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, children, ...rest }, ref) => {
    const classes = cn(
      'snap-start shrink-0 w-full border-2 border-(--lithos-border) px-2',
      className
    )

    return <div
      className={classes}
      ref={ref}
      {...rest}
      role='group'
      aria-roledescription='slide'
    >
      {children}
    </div>
  }
)

CarouselSlide.displayName = 'CarouselSlide'
