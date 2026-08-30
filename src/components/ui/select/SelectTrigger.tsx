/**
 * @fileoverview Lithos UI select trigger component.
 * - Acts as the interactive anchor button that toggles the select dropdown popover.
 * - Syncs visual active/pressed states with select context and popover open state.
 * - Wraps Lithos UI Button component to maintain design system consistency.
 */
import type { ComponentPropsWithRef } from 'react'
import { PopoverTrigger } from '../popover/PopoverTrigger'
import { usePopoverContext } from '../popover/usePopover'
import { Button } from '../Button'
import { useSelect } from './useSelect'

export interface SelectTriggerProps extends ComponentPropsWithRef<'button'> {
  open?: boolean
  label?: string | undefined
  placeholder?: string | undefined
}

export const SelectTrigger = ({
  children,
  open: openProp,
  className,
  label,
  'aria-label': ariaLabel,
  placeholder,
  ...rest
}: SelectTriggerProps) => {
  const { open: contextOpen } = useSelect()
  const { labelId } = usePopoverContext()

  const isOpen = openProp ?? contextOpen
  const computedAriaLabel = label || ariaLabel || placeholder

  return (
    <PopoverTrigger asChild>
      <Button
        id={labelId}
        variant="secondary"
        className={[
          'justify-start',
          isOpen && 'shadow-[0px_0px_0_0_var(--lithos-shadow)] shadow-none translate-x-0.5 translate-y-0.5',
          className,
        ]}
        aria-label={computedAriaLabel}
        {...rest}
      >
        {children}
      </Button>
    </PopoverTrigger>
  )
}
