/**
 * @fileoverview Lithos UI select content container.
 * - Wraps floating dropdown options list with automated keyboard navigation and focus management via Floating UI.
 * - Implements fluid pointer move tracking to sync active item state on mouse/touch hover.
 * - Manages accessibility roles (`listbox`) and custom layout container styling.
 */
import type { ReactNode, ComponentPropsWithRef, MouseEvent, KeyboardEvent } from 'react'
import { useEffect, useCallback } from 'react'
import type { LithosClass } from '../../../utils/cn'
import { PopoverContent } from '../popover/PopoverContent'
import { usePopoverContext } from '../popover/usePopover'
import { useSelect } from './useSelect'
import { FloatingList } from '@floating-ui/react'
import { SelectItem } from './SelectItem'
import { useVirtualizer } from '../../../core/hooks/useVirtualizer'
import type { SelectOption } from './select.types'

export interface SelectContentProps extends Omit<ComponentPropsWithRef<'ul'>, 'className'> {
  children?: ReactNode
  className?: LithosClass
  loop?: boolean
  virtualizeThreshold?: number | boolean
  estimateSize?: number
  overscan?: number
}

export const SelectContent = ({
  children,
  className,
  loop = true,
  virtualizeThreshold = 30,
  estimateSize = 32,
  overscan = 15,
  ...rest
}: SelectContentProps) => {
  const { selectedValue, activeIndex, setActiveIndex, elementsRef, labelsRef, handleSelect, open, options, setOpen } =
    useSelect()
  const { getFloatingProps, refs } = usePopoverContext()

  const shouldVirtualize =
    Array.isArray(options) &&
    (typeof virtualizeThreshold === 'boolean' ? virtualizeThreshold : options.length >= virtualizeThreshold)

  const { containerRef, virtualItems, totalHeight, scrollToIndex } = useVirtualizer<HTMLDivElement>({
    count: shouldVirtualize ? options.length : 0,
    itemHeight: estimateSize,
    overscan,
    initialIndex: activeIndex ?? 0,
  })

  const scrollToOption = useCallback(
    (index: number | null) => {
      if (index === null || index === undefined) return

      if (shouldVirtualize) {
        // updates the visible range
        scrollToIndex(index)

        // wait until React renders the virtual items on the new position
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // force the floating element to retain the focus
            if (refs.floating.current && document.activeElement !== refs.floating.current) {
              refs.floating.current.focus({ preventScroll: true })
            }
          })
        })
        return
      }

      requestAnimationFrame(() => {
        const activeElement = elementsRef.current[index]

        if (activeElement) activeElement.scrollIntoView({ behavior: 'instant', block: 'nearest' })
      })
    },
    [shouldVirtualize, elementsRef, scrollToIndex, refs.floating]
  )

  useEffect(() => {
    if (!open || !options?.length) return

    const optsLength = options?.length || 0
    if (optsLength === 0) {
      setActiveIndex(null)
      return
    }

    let targetIndex = activeIndex

    if (targetIndex === null || targetIndex === undefined || targetIndex >= optsLength) {
      if (selectedValue) {
        targetIndex = options?.findIndex((opt) => opt.value === selectedValue) ?? -1
      }

      if (targetIndex === -1) {
        targetIndex = 0
      }
    }

    targetIndex = Math.max(0, Math.min(targetIndex ?? 0, optsLength - 1))

    if (targetIndex !== activeIndex) setActiveIndex(targetIndex)

    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToOption(targetIndex))
    })

    return () => cancelAnimationFrame(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const getNextNavigableIndex = (currentIndex: number | null, direction: 'down' | 'up') => {
    const totalItems = shouldVirtualize ? (options?.length ?? 0) : elementsRef.current.length
    if (totalItems === 0) return null

    // resolve the initial index
    if (currentIndex === null || currentIndex === undefined) {
      const initialIndex = direction === 'down' ? 0 : totalItems - 1

      const isInitialDisabled = shouldVirtualize
        ? !!options?.[initialIndex]?.disabled
        : elementsRef.current[initialIndex]?.getAttribute('aria-disabled') === 'true'

      if (!isInitialDisabled) return initialIndex
      currentIndex = initialIndex
    }

    let nextIndex = currentIndex

    for (let i = 0; i < totalItems; i++) {
      if (direction === 'down') {
        // user tries to go down on the last option
        if (nextIndex + 1 >= totalItems) {
          nextIndex = loop ? 0 : totalItems - 1
        } else {
          nextIndex++
        }
      } else {
        // user tries to go up on the initial option
        if (nextIndex - 1 < 0) {
          nextIndex = loop ? totalItems - 1 : 0
        } else {
          nextIndex -= 1
        }
      }

      const isDisabled = shouldVirtualize
        ? !!options?.[nextIndex]?.disabled
        : elementsRef.current[nextIndex]?.getAttribute('aria-disabled') === 'true'

      if (!isDisabled) return nextIndex
    }

    return currentIndex
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      setOpen(false)
      return
    }

    if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault()
      e.stopPropagation()

      const startingIndex = e.key === 'Home' ? -1 : (options?.length ?? elementsRef.current.length)
      const dir = e.key === 'Home' ? 'down' : 'up'
      const nextIndex = getNextNavigableIndex(startingIndex, dir)

      if (nextIndex !== null) {
        const option = options?.[nextIndex]
        const element = elementsRef.current[nextIndex]

        const isDisabled = shouldVirtualize ? !!option?.disabled : element?.getAttribute('aria-disabled') === 'true'

        if (isDisabled || !(option && element)) return

        setActiveIndex(nextIndex)
        scrollToOption(nextIndex)
      }

      return
    }

    const isValidKey = e.key === 'ArrowDown' || e.key === 'ArrowUp'

    if (isValidKey) {
      e.preventDefault()
      e.stopPropagation()

      const dir = e.key === 'ArrowDown' ? 'down' : 'up'
      const nextIndex = getNextNavigableIndex(activeIndex, dir)

      if (nextIndex !== null) {
        setActiveIndex(nextIndex)
        scrollToOption(nextIndex)
      }

      return
    }

    if (e.key === 'Enter' || e.key === ' ') {
      if (activeIndex === null) return

      let value: string | null | undefined
      let isDisabled

      if (shouldVirtualize) {
        const option = options?.[activeIndex]
        if (!option) return

        isDisabled = !!option.disabled
        value = option.value !== undefined && option.value !== null ? option.value : null
      } else {
        const element = elementsRef.current[activeIndex]
        if (!element) return

        isDisabled = element.getAttribute('aria-disabled') === 'true'
        value = element.getAttribute('data-value')
      }

      if (value !== null && value !== undefined && !isDisabled) {
        e.preventDefault()
        handleSelect(value, e)
      }
    }
  }

  const handleListClick = (e: MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement | null
    const item = target?.closest<HTMLLIElement>('[role="option"]')
    if (!item) return

    const indexAttr = item.getAttribute('data-index')
    if (indexAttr === null) return

    const index = Number(indexAttr)
    const option = options?.[index] ?? elementsRef.current[index]

    if (!option) return

    const isDisabled =
      (option as SelectOption).disabled ?? (option as HTMLElement).getAttribute?.('aria-disabled') === 'true'
    const value = (option as SelectOption).value || (option as HTMLElement).getAttribute?.('data-value')

    if (value === null) return

    if (option && !isDisabled) handleSelect(value, e)
  }

  return (
    <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
      <PopoverContent
        ref={containerRef}
        className={['p-1 flex flex-col space-y-1 max-h-60 overflow-y-auto outline-none', className]}
        {...getFloatingProps({
          onKeyDown: handleKeyDown,
          onClick: handleListClick,
          ...rest,
          'aria-describedby': undefined,
        })}
      >
        {shouldVirtualize && options ? (
          <ul
            style={{
              height: `${totalHeight}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualItems.map((virtualItem) => {
              const option = options[virtualItem.index]
              if (!option) return null

              return (
                <SelectItem
                  key={option.value}
                  index={virtualItem.index}
                  data-index={virtualItem.index}
                  value={option.value}
                  disabled={!!option.disabled}
                  className="absolute top-0 left-0 w-full will-change-transform"
                  style={{
                    height: `${estimateSize}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  {option.icon && <span className="mr-2 shrink-0">{option.icon}</span>}
                  {option.label}
                </SelectItem>
              )
            })}
          </ul>
        ) : (
          children
        )}
      </PopoverContent>
    </FloatingList>
  )
}
