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
  children: ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ interactive = false, className, children, ...rest }, ref) => {
  const classes = [
    'relative border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) overflow-hidden',
    'shadow-[4px_4px_0px_0px_var(--lithos-shadow)]',
    interactive ? 'transition-transform hover:-translate-y-1' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export interface CardImageProps extends ComponentPropsWithoutRef<'img'> {
  src: string
  alt: string
}

export const CardImage = forwardRef<HTMLImageElement, CardImageProps>(({ className, ...rest }, ref) => {
  const classes = ['w-full h-48 object-cover block border-b-2 border-(--lithos-border)', className ?? '']
    .filter(Boolean)
    .join(' ')

  return <img ref={ref} className={classes} {...rest} />
})

CardImage.displayName = 'CardImage'

export interface CardContentProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, children, ...rest }, ref) => {
  const classes = ['p-6', className ?? ''].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  )
})

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
  children: ReactNode
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({ className, children, ...rest }, ref) => {
  const classes = ['flex items-center px-6 pt-4 pb-6 border-t-2 border-(--lithos-border)', className ?? '']
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  )
})

CardFooter.displayName = 'CardFooter'

export type CardCloseProps = ComponentPropsWithoutRef<'button'>

export const CardClose = forwardRef<HTMLButtonElement, CardCloseProps>(({ className, ...rest }, ref) => {
  const classes = [
    'absolute top-2 right-2 z-10 bg-(--lithos-surface) lithos-click',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button ref={ref} type="button" aria-label="Close" className={classes} {...rest}>
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="4" className="block">
        <path d="M2 2L14 14M14 2L2 14" />
      </svg>
    </button>
  )
})

CardClose.displayName = 'CardClose'
