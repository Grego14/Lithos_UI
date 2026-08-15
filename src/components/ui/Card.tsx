/**
 * @fileoverview Lithos UI card primitive.
 * - Root renders raw `children` with no flex/grid imposed and no padding, so `CardImage` can bleed edge-to-edge.
 * - `CardContent`/`CardFooter` own their own padding; stack spacing between them is margin-based, never `gap`.
 * - Hard geometry: fixed-offset shadow always shows; `hover:translate` lift is opt-in via `interactive`, not forced on every Card.
 */
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface CardProps extends ComponentPropsWithRef<'div'> {
  interactive?: boolean | undefined
  variant?: 'default' | 'accent' | 'image' | 'blueprint' | 'physics' | 'solid' | undefined
  children: ReactNode
}

export const Card = (
  { interactive = false, variant = 'default', className, children, ref, ...rest }: CardProps) => {
    const isImage = variant === 'image'

    const classes = cn(
      'relative border-2 border-(--lithos-border) overflow-hidden shadow-[4px_4px_0px_0px_var(--lithos-shadow)] rounded-(--lithos-radius)',
      isImage ? 'bg-transparent text-white flex flex-col justify-end' : variant === 'solid'
        ? 'bg-(--lithos-accent) text-(--lithos-accent-text)' : 'bg-(--lithos-surface) text-(--lithos-text)',
      variant === 'accent' && 'transition-colors hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text)',
      interactive && 'transition-transform hover:-translate-y-1',
      className
    )

    return (
      <div ref={ref} className={classes} {...rest}>
        {isImage && (
          <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
        )}
        {children}
      </div>
    )
  }

export interface CardImageProps extends ComponentPropsWithRef<'img'> {
  src: string
  alt: string
  isBackground?: boolean | undefined
}

export const CardImage = (
  { isBackground = false, className, ref, ...rest }: CardImageProps) => {
    const classes = cn(
      isBackground
        ? 'absolute inset-0 w-full h-full object-cover z-0'
        : 'w-full h-48 object-cover block border-b-2 border-(--lithos-border)',
      className,
    )

    return <img ref={ref} className={classes} {...rest} />
  }

export interface CardContentProps extends ComponentPropsWithRef<'div'> {
  spacing?: 'sm' | 'md' | 'lg' | undefined
  children: ReactNode
}

export const CardContent = (
  { spacing = 'md', className, children, ref, ...rest }: CardContentProps) => {
    const spacingClass = {
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-9',
    }[spacing]

    const classes = cn('relative z-20', spacingClass, className)

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    )
  }

export interface CardTitleProps extends ComponentPropsWithRef<'h3'> {
  children: ReactNode
}

export const CardTitle = ({ className, children, ref, ...rest }: CardTitleProps) => {
  const classes = cn('text-xl font-black uppercase tracking-tight leading-none mb-3', className)

  return (
    <h3 ref={ref} className={classes} {...rest}>
      {children}
    </h3>
  )
}

export interface CardDescriptionProps extends ComponentPropsWithRef<'p'> {
  children: ReactNode
}

export const CardDescription = (
  { className, children, ref, ...rest }: CardDescriptionProps) => {
    const classes = cn('font-body opacity-70 leading-snug', className)

    return (
      <p ref={ref} className={classes} {...rest}>
        {children}
      </p>
    )
  }

export interface CardFooterProps extends ComponentPropsWithRef<'div'> {
  spacing?: 'sm' | 'md' | 'lg' | undefined
  children: ReactNode
}

export const CardFooter = (
  { spacing = 'md', className, children, ref, ...rest }: CardFooterProps) => {
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
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    )
  }
