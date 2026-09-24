import type { ComponentPropsWithRef, CSSProperties } from 'react'
import { cn, type LithosClass } from '../../utils/cn'

export type SkeletonAnimation = 'pulse' | false
export type SkeletonVariant = 'text' | 'rectangular' | 'rounded' | 'circular'
export type SkeletonTone = 'neutral' | 'accent'

const variants: Record<SkeletonVariant, string> = {
  text: 'w-full h-[1em] rounded-(--lithos-radius)',
  rectangular: 'w-full h-32 rounded-none',
  rounded: 'w-full h-32 rounded-[max(var(--lithos-radius),0.5rem)]',
  circular: 'w-12 h-auto aspect-square shrink-0 rounded-full',
}

const tones: Record<SkeletonTone, string> = {
  neutral: 'bg-[color-mix(in_srgb,var(--lithos-text)_12%,var(--lithos-surface))]',
  accent: 'bg-[color-mix(in_srgb,var(--lithos-accent)_28%,var(--lithos-surface))]',
}

export interface SkeletonProps extends Omit<
  ComponentPropsWithRef<'span'>,
  'className' | 'children' | 'dangerouslySetInnerHTML'
> {
  className?: LithosClass
  children?: never
  variant?: SkeletonVariant
  animation?: SkeletonAnimation
  tone?: SkeletonTone
  width?: CSSProperties['width']
  height?: CSSProperties['height']
}

export const Skeleton = ({
  variant = 'text',
  animation = 'pulse',
  tone = 'neutral',
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) => (
  <span
    {...props}
    className={cn(
      'block overflow-hidden box-border min-w-0 max-w-full border-2 border-(--lithos-border) shadow-[2px_2px_0_var(--lithos-shadow)] pointer-events-none select-none',
      variants[variant],
      tones[tone],
      animation ? 'animate-pulse [animation-duration:1s]' : 'animate-none',
      'motion-reduce:animate-none forced-colors:border-[CanvasText] forced-colors:bg-[Canvas] forced-colors:shadow-none forced-colors:animate-none',
      className
    )}
    style={{ width, height, ...style }}
    data-variant={variant}
    data-animation={animation || 'none'}
    data-tone={tone}
    aria-hidden="true"
    inert
  />
)

export interface SkeletonTextProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'className' | 'children' | 'dangerouslySetInnerHTML'
> {
  className?: LithosClass
  children?: never
  lines?: number
  lastLineWidth?: CSSProperties['width']
  animation?: SkeletonAnimation
  tone?: SkeletonTone
}

export const SkeletonText = ({
  lines = 3,
  lastLineWidth = '65%',
  animation = 'pulse',
  tone = 'neutral',
  className,
  ...props
}: SkeletonTextProps) => {
  const count = Number.isFinite(lines) ? Math.min(100, Math.max(0, Math.floor(lines))) : 3

  return (
    <div {...props} className={cn('min-w-0 w-full space-y-[0.625em]', className)} aria-hidden="true" inert>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          animation={animation}
          tone={tone}
          width={count > 1 && index === count - 1 ? lastLineWidth : undefined}
        />
      ))}
    </div>
  )
}
