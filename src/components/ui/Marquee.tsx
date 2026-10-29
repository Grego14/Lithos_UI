/**
 * @fileoverview Lithos UI Marquee primitive.
 * - Continuous horizontal infinite-loop scrolling ticker ribbon.
 * - Zero-Gap layout compliance: utilizes explicit margin distribution, strictly avoiding CSS flex/grid gap.
 * - Hardware-accelerated CSS animations with smooth pause-on-hover interaction.
 * - Supports neo-brutalist solid, accent, warning, bordered, and ghost variants.
 */

import { type ReactNode, Children } from 'react'
import { cn } from '../../utils/cn'
import type { LithosElementProps } from '../../core/types'

/**
 * Visual styling variants for the Marquee container.
 */
export type MarqueeVariants = 'default' | 'accent' | 'warning' | 'ghost' | 'bordered'

/**
 * Direction of the continuous scrolling track.
 */
export type MarqueeDirection = 'left' | 'right'

/**
 * Speed preset or numeric duration in seconds for one full loop cycle.
 */
export type MarqueeSpeed = 'slow' | 'normal' | 'fast' | number

export interface MarqueeProps extends LithosElementProps<'div'> {
  /**
   * The content items to loop continuously.
   */
  children: ReactNode

  /**
   * Visual theme variant styling.
   * @default 'default'
   */
  variant?: MarqueeVariants

  /**
   * Direction of horizontal translation.
   * @default 'left'
   */
  direction?: MarqueeDirection

  /**
   * Scrolling speed preset or numeric duration in seconds for a full cycle.
   * @default 'normal'
   */
  speed?: MarqueeSpeed

  /**
   * Disables the default pause-on-hover behavior, keeping the animation continuously scrolling.
   * @default false
   */
  noPause?: boolean

  /**
   * Applies horizontal gradient fade masks to the left and right edges.
   * @default false
   */
  fadeEdges?: boolean

  /**
   * Number of times the children are cloned within each track to ensure full-width continuity.
   * @default 3
   */
  repeat?: number
}

const SPEED_PRESETS: Record<'slow' | 'normal' | 'fast', number> = {
  slow: 60,
  normal: 36,
  fast: 18,
}

const VARIANT_STYLES: Record<MarqueeVariants, string> = {
  default:
    'border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)',
  accent:
    'border-2 border-(--lithos-border) bg-(--lithos-accent) text-(--lithos-accent-text) shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)',
  warning:
    'border-2 border-(--lithos-border) bg-[#ffea00] text-[#000000] font-black shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)',
  bordered: 'border-y-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text)',
  ghost: 'bg-transparent text-(--lithos-text)',
}

/**
 * Neo-brutalist continuous infinite-scrolling ticker and announcement marquee.
 */
export const Marquee = ({
  children,
  variant = 'default',
  direction = 'left',
  speed = 'normal',
  noPause = false,
  fadeEdges = false,
  repeat = 3,
  className,
  style,
  ...rest
}: MarqueeProps) => {
  const durationSeconds = typeof speed === 'number' ? speed : SPEED_PRESETS[speed] || 36

  const animationName = direction === 'right' ? 'lithos-marquee-right' : 'lithos-marquee-left'

  const containerClasses = cn(
    'group relative flex w-full overflow-hidden select-none py-2.5',
    VARIANT_STYLES[variant],
    className
  )

  const maskStyle = fadeEdges
    ? {
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }
    : undefined

  const trackStyle = {
    animationName,
    animationDuration: `${durationSeconds}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  }

  const childArray = Children.toArray(children)

  const renderTrackItems = (keyPrefix: string) => (
    <div
      aria-hidden={keyPrefix !== 'track-0'}
      className={cn('flex shrink-0 min-w-full items-center', !noPause && 'group-hover:[animation-play-state:paused]')}
      style={trackStyle}
    >
      {Array.from({ length: Math.max(1, repeat) }).map((_, rIdx) => (
        <div key={`${keyPrefix}-rep-${rIdx}`} className="flex items-center shrink-0">
          {childArray.map((child, cIdx) => (
            <div key={`${keyPrefix}-${rIdx}-${cIdx}`} className="mr-6 shrink-0 inline-flex items-center">
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <div className={containerClasses} style={{ ...maskStyle, ...style }} {...rest}>
      {renderTrackItems('track-0')}
      {renderTrackItems('track-1')}
    </div>
  )
}
