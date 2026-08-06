/**
 * @fileoverview Lithos UI button primitive.
 * - Centralizes `.lithos-click` physics behind typed `intent` variants so call sites stop hand-rolling className strings.
 * - Text intent overrides `.lithos-click`'s border/shadow to stay flat: text only, no outline, no background fill.
 * - Zero-gap: icon+label spacing inside children is the consumer's responsibility via margin utilities, never `gap`.
 * - Native `type="button"` default prevents accidental form submission; opt into `type="submit"` explicitly.
 */
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { ButtonIntent } from '../../core/types'
import { cn } from '../../utils/cn'

export interface ButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'type'> {
  intent?: ButtonIntent | undefined
  fullWidth?: boolean | undefined
  type?: 'button' | 'submit' | 'reset' | undefined
  children: ReactNode
}

const intentClass: Record<ButtonIntent, string> = {
  primary: 'bg-(--lithos-accent) text-(--lithos-accent-text)',
  secondary: 'bg-(--lithos-surface) text-(--lithos-text)',
  text: 'bg-transparent text-(--lithos-text) cursor-pointer !border-transparent !shadow-none hover:!shadow-none',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ intent = 'primary', fullWidth = false, type = 'button', className, children, ...rest }, ref) => {
    const classes = [
      'lithos-click',
      intentClass[intent],
      fullWidth && 'w-full',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      className,
    ]

    return (
      <button ref={ref} type={type} className={cn(classes)} {...rest}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
