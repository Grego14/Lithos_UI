/**
 * @fileoverview Lithos UI card primitive.
 * - Root renders raw `children` with no flex/grid imposed and no padding, so `CardImage` can bleed edge-to-edge.
 * - `CardContent`/`CardFooter` own their own padding; stack spacing between them is margin-based, never `gap`.
 * - Hard geometry: fixed-offset shadow always shows; `hover:translate` lift is opt-in via `interactive`, not forced on every Card.
 */
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  interactive?: boolean | undefined
  variant?: 'default' | 'accent' | 'image' | 'blueprint' | 'physics' | 'solid' | undefined
  children: ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ interactive = false, variant = 'default', className, children, ...rest }, ref) => {
    const isImage = variant === 'image'

    const classes = [
      'relative border-2 border-(--lithos-border) overflow-hidden',
      isImage ? 'bg-transparent text-white flex flex-col justify-end' : 
      variant === 'solid' ? 'bg-(--lithos-accent) text-(--lithos-accent-text)' : 
      'bg-(--lithos-surface) text-(--lithos-text)',
      variant === 'accent' ? 'transition-colors hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text)' : '',
      'shadow-[4px_4px_0px_0px_var(--lithos-shadow)]',
      interactive ? 'transition-transform hover:-translate-y-1' : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={classes} {...rest}>
        {isImage && (
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
        )}
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export interface CardImageProps extends ComponentPropsWithoutRef<'img'> {
  src: string
  alt: string
  isBackground?: boolean | undefined
}

export const CardImage = forwardRef<HTMLImageElement, CardImageProps>(
  ({ isBackground = false, className, ...rest }, ref) => {
    const classes = [
      isBackground
        ? 'absolute inset-0 w-full h-full object-cover z-0'
        : 'w-full h-48 object-cover block border-b-2 border-(--lithos-border)',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    return <img ref={ref} className={classes} {...rest} />
  }
)

CardImage.displayName = 'CardImage'

export interface CardContentProps extends ComponentPropsWithoutRef<'div'> {
  spacing?: 'sm' | 'md' | 'lg' | undefined
  children: ReactNode
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ spacing = 'md', className, children, ...rest }, ref) => {
    const spacingClass = {
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-9',
    }[spacing]

    const classes = ['relative z-20', spacingClass, className ?? ''].filter(Boolean).join(' ')

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    )
  }
)

CardContent.displayName = 'CardContent'

export interface CardTitleProps extends ComponentPropsWithoutRef<'h3'> {
  children: ReactNode
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, children, ...rest }, ref) => {
  const classes = ['text-xl font-black uppercase tracking-tight leading-none mb-3', className ?? '']
    .filter(Boolean)
    .join(' ')

  return (
    <h3 ref={ref} className={classes} {...rest}>
      {children}
    </h3>
  )
})

CardTitle.displayName = 'CardTitle'

export interface CardDescriptionProps extends ComponentPropsWithoutRef<'p'> {
  children: ReactNode
}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['font-body opacity-70 leading-snug', className ?? ''].filter(Boolean).join(' ')

    return (
      <p ref={ref} className={classes} {...rest}>
        {children}
      </p>
    )
  }
)

CardDescription.displayName = 'CardDescription'

export interface CardFooterProps extends ComponentPropsWithoutRef<'div'> {
  spacing?: 'sm' | 'md' | 'lg' | undefined
  children: ReactNode
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ spacing = 'md', className, children, ...rest }, ref) => {
    const spacingClass = {
      sm: 'px-3 pt-2 pb-3',
      md: 'px-6 pt-4 pb-6',
      lg: 'px-9 pt-6 pb-9',
    }[spacing]

    const classes = ['relative z-20 flex items-center justify-end border-t-2 border-(--lithos-border)', spacingClass, className ?? '']
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'

