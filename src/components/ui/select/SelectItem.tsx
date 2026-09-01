/**
 * @fileoverview Lithos UI select option item.
 * - Represents an individual selectable option supporting single and multi-selection active states.
 * - Handles keyboard activation (Enter/Space) and mouse click events to trigger value changes.
 * - Registers item index dynamically with Floating UI for smooth keyboard list navigation.
 */
import type { ReactNode, ComponentPropsWithRef } from 'react'
import { useListItem } from '@floating-ui/react'
import { cn, type LithosClass } from '../../../utils/cn'
import { useSelect } from './useSelect'
import { useAccentColor } from '../../../core/useAccentColor'
import { usePopoverContext } from '../popover/usePopover'

export interface SelectItemProps extends Omit<ComponentPropsWithRef<'li'>, 'className'> {
  value: string
  disabled?: boolean
  children: ReactNode
  className?: LithosClass
  index?: number
}

export const SelectItem = ({ value, disabled, children, className, index, style, ...rest }: SelectItemProps) => {
  const { selectedValue, activeIndex, multiple, registerElement } = useSelect()
  const { contrastedAccentColor } = useAccentColor()

  const { getItemProps } = usePopoverContext()

  const { ref, index: itemIndex } = useListItem({
    label: typeof children === 'string' ? children : undefined,
  })

  const currentIndex = index ?? itemIndex
  const isActive = activeIndex === currentIndex
  const isSelected = multiple && Array.isArray(selectedValue) ? selectedValue.includes(value) : selectedValue === value

  return (
    <li
      ref={(node) => {
        ref(node)

        if (node && currentIndex !== null && currentIndex !== undefined) {
          registerElement(currentIndex, node)
        }
      }}
      aria-disabled={disabled}
      data-active={isActive ? 'true' : undefined}
      data-value={value}
      data-index={index}
      tabIndex={currentIndex === index ? 0 : -1}
      style={{ ...style, color: isSelected ? contrastedAccentColor : 'var(--lithos-text)' }}
      {...getItemProps({
        active: isActive,
        selected: isSelected,
        disabled,
      })}
      className={cn(
        'cursor-pointer select-none px-3 py-1.5 text-sm outline-none',
        isSelected && 'font-bold',
        isSelected
          ? isActive
            ? 'bg-(--lithos-accent)/75'
            : 'bg-(--lithos-accent)'
          : isActive
            ? 'bg-(--lithos-accent)/20'
            : 'hover:bg-(--lithos-accent)/12',
        disabled && 'pointer-events-none opacity-50 cursor-not-allowed',
        className
      )}
      {...rest}
    >
      {children}
    </li>
  )
}
