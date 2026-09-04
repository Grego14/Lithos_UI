/**
 * @fileoverview Lithos UI card primitive.
 * - Root renders raw `children` with no flex/grid imposed and no padding, so `CardImage` can bleed edge-to-edge.
 * - `CardContent`/`CardFooter` own their own padding; stack spacing between them is margin-based, never `gap`.
 * - Hard geometry: fixed-offset shadow always shows; `hover:translate` lift is opt-in via `interactive`, not forced on every Card.
 */
import type { ComponentPropsWithRef } from 'react'
import { cn, type LithosClass } from '../../utils/cn'

type CardVariants = 'default' | 'accent' | 'image' | 'solid'

export interface CardProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  interactive?: boolean | 'elevate'
  variant?: CardVariants
  className?: LithosClass
}

export const Card = ({ interactive = false, variant = 'default', className, children, ...rest }: CardProps) => {
  const isImage = variant === 'image'

  const classes = cn(
    'relative border-2 border-(--lithos-border) overflow-hidden shadow-[4px_4px_0px_0px_var(--lithos-shadow)] rounded-(--lithos-radius)',
    isImage
      ? 'bg-transparent text-white flex flex-col justify-end'
      : variant === 'solid'
        ? 'bg-(--lithos-accent) text-(--lithos-accent-text)'
        : 'bg-(--lithos-surface) text-(--lithos-text)',
    variant === 'accent' && 'transition-colors hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text)',
    interactive &&
      (interactive === 'elevate'
        ? 'transition-transform hover:-translate-y-1'
        : 'transition-shadow duration-150 ease-out hover:shadow-[6px_6px_0px_0px_var(--lithos-shadow)]'),
    className
  )

  return (
    <div className={classes} {...rest}>
      {isImage && (
        <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
      )}
      {children}
    </div>
  )
}

export interface CardImageProps extends Omit<ComponentPropsWithRef<'img'>, 'className'> {
  src: string
  alt: string
  isBackground?: boolean
  className?: LithosClass
}

export const CardImage = ({ isBackground = false, className, ...rest }: CardImageProps) => {
  const classes = cn(
    isBackground
      ? 'absolute inset-0 w-full h-full object-cover z-0'
      : 'w-full h-48 object-cover block border-b-2 border-(--lithos-border)',
    className
  )

  return <img className={classes} {...rest} />
}

export interface CardContentProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  spacing?: 'sm' | 'md' | 'lg'
  className?: LithosClass
}

export const CardContent = ({ spacing = 'md', className, children, ...rest }: CardContentProps) => {
  const spacingClass = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-9',
  }[spacing]

  const classes = cn('relative z-20', spacingClass, className)

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

export interface CardTitleProps extends Omit<ComponentPropsWithRef<'h3'>, 'className'> {
  className?: LithosClass
}

export const CardTitle = ({ className, children, ...rest }: CardTitleProps) => {
  const classes = cn('text-xl font-black uppercase tracking-tight leading-none mb-3', className)

  return (
    <h3 className={classes} {...rest}>
      {children}
    </h3>
  )
}

export interface CardDescriptionProps extends Omit<ComponentPropsWithRef<'p'>, 'className'> {
  className?: LithosClass
}

export const CardDescription = ({ className, children, ...rest }: CardDescriptionProps) => {
  const classes = cn('font-body opacity-70 leading-snug', className)

  return (
    <p className={classes} {...rest}>
      {children}
    </p>
  )
}

export interface CardFooterProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  spacing?: 'sm' | 'md' | 'lg'
  className?: LithosClass
}

export const CardFooter = ({ spacing = 'md', className, children, ...rest }: CardFooterProps) => {
  const spacingClass = {
    sm: 'px-3 pt-2 pb-3',
    md: 'px-6 pt-4 pb-6',
    lg: 'px-9 pt-6 pb-9',
  }[spacing]

  const classes = cn(
    'relative z-20 flex items-center justify-end border-t-2 border-(--lithos-border)',
    spacingClass,
    className
  )

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
