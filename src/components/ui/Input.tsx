/**
 * @fileoverview Lithos UI input primitive.
 * - Wraps the native input element with brutalist hard-shadow geometry (2px border, 0-blur shadow that grows on hover/focus).
 * - `invalid` routes validation feedback through the shared error color; consumer inline styles always win except for the forced border.
 * - Disabled state drops hover physics and dims via opacity; number spinners are stripped for cross-browser consistency.
 */
import type { ComponentPropsWithRef } from 'react'
import { colors } from '../../utils/colors'
import { cn } from '../../utils/cn'
import type { ClassArray, ClassValue } from 'clsx'

export interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'className'> {
  className?: ClassValue | ClassArray
  invalid?: boolean
}

export const Input = ({ className = '', ref, invalid, style, ...props }: InputProps) => {
  const classes = cn(
    'rounded-(--lithos-radius)',
    'font-(--font-mono) font-bold text-sm p-2 outline-none border-2 border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)] focus:shadow-[4px_4px_0_0_var(--lithos-shadow)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
    {
      'transition hover:shadow-[4px_4px_0_0_var(--lithos-shadow)]': !props.disabled,
      'opacity-50': props.disabled,
    },
    className
  )

  return (
    <input ref={ref} className={classes} {...props} style={invalid ? { borderColor: colors.error, ...style } : style} />
  )
}
