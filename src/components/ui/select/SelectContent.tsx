/**
 * @fileoverview Lithos UI select content container.
 * - Wraps floating dropdown options list with automated keyboard navigation and focus management via Floating UI.
 * - Implements fluid pointer move tracking to sync active item state on mouse/touch hover.
 * - Manages accessibility roles (`listbox`) and custom layout container styling.
 */
import type { ReactNode, ComponentPropsWithRef, MouseEvent, KeyboardEvent } from 'react'
import { useEffect, useCallback } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import type { LithosClass } from '../../../utils/cn'
import { PopoverContent } from '../popover/PopoverContent'
import { usePopoverContext } from '../popover/usePopover'
import { useSelect } from './useSelect'
import { FloatingList } from '@floating-ui/react'
import { SelectItem } from './SelectItem'

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
  overscan = 20,
  ...rest
}: SelectContentProps) => {
  const { selectedValue, activeIndex, setActiveIndex, elementsRef, labelsRef, handleSelect, open, options, setOpen } =
    useSelect()
  const { getFloatingProps, refs } = usePopoverContext()

  const shouldVirtualize =
    Array.isArray(options) &&
    (typeof virtualizeThreshold === 'boolean' ? virtualizeThreshold : options.length >= virtualizeThreshold)

  const rowVirtualizer = useVirtualizer({
    count: shouldVirtualize ? options.length : 0,
    getScrollElement: () => refs.floating.current,
    estimateSize: () => estimateSize,
    overscan,
  })

  const scrollToOption = useCallback(
    (index: number | null) => {
      if (index === null || index === undefined) return

      requestAnimationFrame(() => {
        if (shouldVirtualize) {
          rowVirtualizer.scrollToIndex(index, { align: 'start', behavior: 'instant' })

          requestAnimationFrame(() => {
            const el = elementsRef.current[index]
            if (el) {
              el.focus({ preventScroll: true })
            } else if (refs.floating.current) {
              refs.floating.current.focus({ preventScroll: true })
            }
          })
          return
        }

        const activeElement = elementsRef.current[index]
        if (activeElement) {
          activeElement.scrollIntoView({ behavior: 'instant', block: 'nearest' })
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shouldVirtualize, rowVirtualizer, elementsRef]
  )

  useEffect(() => {
    if (!open) return

    if (shouldVirtualize) rowVirtualizer.measure()

    let targetIndex = activeIndex
    const optsLength = options?.length || 0

    if (targetIndex === null || targetIndex === undefined || targetIndex >= optsLength) {
      if (selectedValue) {
        targetIndex = options?.findIndex((opt) => String(opt.value) === String(selectedValue)) ?? -1
      }

      if (targetIndex === -1) {
        targetIndex = 0
      }
    }

    if (optsLength > 0) {
      targetIndex = Math.max(0, Math.min(targetIndex ?? 0, optsLength - 1))

      if (targetIndex !== activeIndex) setActiveIndex(targetIndex)

      requestAnimationFrame(() => {
        scrollToOption(targetIndex)
      })
    } else {
      setActiveIndex(null)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, options, selectedValue])

  const getNextNavigableIndex = (currentIndex: number | null, direction: 'down' | 'up') => {
    const totalItems = shouldVirtualize ? (options?.length ?? 0) : elementsRef.current.length
    if (totalItems === 0) return null

    if (currentIndex === null || currentIndex === undefined) {
      const initialIndex = direction === 'down' ? 0 : totalItems - 1
      const initialEl = elementsRef.current[initialIndex]
      const isDisabled = initialEl?.getAttribute('aria-disabled') === 'true'

      if (initialEl && !isDisabled) return initialIndex
      currentIndex = initialIndex
    }

    let nextIndex = currentIndex

    for (let i = 0; i < totalItems; i++) {
      if (direction === 'down') {
        nextIndex = nextIndex + 1 >= totalItems ? (loop ? 0 : totalItems - 1) : nextIndex + 1
      } else {
        nextIndex = nextIndex - 1 < 0 ? (loop ? totalItems - 1 : 0) : nextIndex - 1
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
        value = option.value !== undefined && option.value !== null ? String(option.value) : null
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
    const option = options?.[index]

    if (option && !option.disabled) handleSelect(String(option.value), e)
  }

  return (
    <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
      <PopoverContent
        className={['p-1 flex flex-col space-y-1 max-h-60 overflow-y-auto outline-none', className]}
        {...getFloatingProps({
          onKeyDown: handleKeyDown,
          onClick: handleListClick,
          ...rest,
          'aria-describedby': undefined,
        })}
      >
        {shouldVirtualize && options ? (
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
              const option = options[virtualItem.index]

              if (!option) return null

              return (
                <SelectItem
                  key={virtualItem.key}
                  index={virtualItem.index}
                  data-index={virtualItem.index}
                  ref={rowVirtualizer.measureElement}
                  value={String(option.value)}
                  disabled={!!option.disabled}
                  shouldVirtualize={shouldVirtualize}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  {option.icon && <span className="mr-2 shrink-0">{option.icon}</span>}
                  {option.label}
                </SelectItem>
              )
            })}
          </div>
        ) : (
          children
        )}
      </PopoverContent>
    </FloatingList>
  )
}
