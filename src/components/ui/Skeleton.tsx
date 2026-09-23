import type { ComponentPropsWithRef, CSSProperties } from 'react'
import { cn, type LithosClass } from '../../utils/cn'

export type SkeletonAnimation = 'pulse' | 'shimmer' | false
export type SkeletonVariant = 'text' | 'rectangular' | 'rounded' | 'circular'
export type SkeletonTone = 'neutral' | 'accent'

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

/** Decorative placeholder. Announce loading once on the surrounding content region. */
export const Skeleton = ({
  variant = 'text',
  animation = 'shimmer',
  tone = 'neutral',
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) => (
  <span
    {...props}
    className={cn('lithos-skeleton', className)}
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
  /** Whole lines, clamped to 0–100. Non-finite values use the default of three. */
  lines?: number
  lastLineWidth?: CSSProperties['width']
  animation?: SkeletonAnimation
  tone?: SkeletonTone
}

export const SkeletonText = ({
  lines = 3,
  lastLineWidth = '65%',
  animation = 'shimmer',
  tone = 'neutral',
  className,
  ...props
}: SkeletonTextProps) => {
  const count = Number.isFinite(lines) ? Math.min(100, Math.max(0, Math.floor(lines))) : 3

  return (
    <div {...props} className={cn('lithos-skeleton-text', className)} aria-hidden="true" inert>
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
