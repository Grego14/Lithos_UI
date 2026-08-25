/**
 * @fileoverview Lithos UI input group primitive.
 * - Compound composition: InputGroup owns the brutalist frame, InputGroupInput renders the bare field,
 *   InputGroupAddon pins content to either inline edge regardless of DOM order via flex ordering.
 * - Zero-Gap Rule: edge alignment relies on flex order utilities and padding, never CSS gap.
 */
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { Input, type InputProps } from './Input'
import { cn } from '../../utils/cn'
import type { ClassArray, ClassValue } from 'clsx'

export interface InputGroupProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  className?: ClassValue | ClassArray
}

export const InputGroup = ({ className = '', ref, children, ...props }: InputGroupProps) => {
  return (
    <div
      ref={ref}
      role="group"
      className={cn(
        'relative flex w-full items-stretch overflow-hidden rounded-(--lithos-radius) border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[2px_2px_0_0_var(--lithos-shadow)] transition focus-within:shadow-[4px_4px_0_0_var(--lithos-shadow)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export type InputGroupInputProps = InputProps

export const InputGroupInput = ({ className = '', ...props }: InputGroupInputProps) => {
  return (
    <Input
      className={cn(
        'h-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-3 shadow-none hover:shadow-none focus:shadow-none',
        className
      )}
      {...props}
    />
  )
}

type AddonAlign = 'inline-start' | 'inline-end'

export interface InputGroupAddonProps extends Omit<ComponentPropsWithRef<'div'>, 'className' | 'children'> {
  align?: AddonAlign
  className?: ClassValue | ClassArray
  children: ReactNode
}

const addonAlignClasses = {
  'inline-start': 'order-first border-r-2',
  'inline-end': 'order-last border-l-2',
} as const

export const InputGroupAddon = ({
  align = 'inline-start',
  className = '',
  children,
  ref,
  ...props
}: InputGroupAddonProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex shrink-0 select-none items-center self-stretch border-(--lithos-border) bg-(--lithos-surface) px-3 font-(--font-mono) text-sm font-bold text-(--lithos-text)',
        addonAlignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
