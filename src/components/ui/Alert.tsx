/**
 * @fileoverview Lithos UI alert primitive.
 * - Renders inline within the page flow; never floats or auto-dismisses like Toast.
 * - Non-dismissible: no close control, so it stays a permanent structural plaque until removed by the consumer.
 * - Border and shadow stay on the global --lithos-border/--lithos-shadow tokens, like every other primitive,
 *   so the hard edge stays visible against the page regardless of the fill color; only text follows contrast.
 */
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { getContrastText } from '../../utils/yiq'
import { colors } from '../../utils/colors'
import type { HexColor } from '../../core/types'

export type AlertVariant = 'default' | 'success' | 'error' | 'warning' | 'info'
export type AlertSize = 'small' | 'default' | 'medium'

export interface AlertProps extends ComponentPropsWithoutRef<'div'> {
  variant?: AlertVariant
  size?: AlertSize
  title?: string
  color?: HexColor | string
  children: ReactNode
}

const sizeStyles: Record<AlertSize, { container: string; title: string; message: string }> = {
  small: { container: 'p-2 max-w-sm', title: 'text-xs mb-1', message: 'text-[11px]' },
  default: { container: 'p-4 sm:p-5', title: 'text-base mb-2', message: 'text-sm' },
  medium: { container: 'p-6 sm:p-7 max-w-2xl', title: 'text-xl mb-3', message: 'text-base' },
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', size = 'default', title, color, className = '', style, children, ...props }, ref) => {
    const bgColor = color || colors[variant]
    const textColor = getContrastText(bgColor)
    const sizing = sizeStyles[size]

    const classes = [
      'border-2 border-(--lithos-border) shadow-[4px_4px_0px_0px_var(--lithos-shadow)] w-full',
      sizing.container,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div
        ref={ref}
        role="alert"
        className={classes}
        style={{ backgroundColor: bgColor, color: textColor, ...style }}
        {...props}
      >
        {title && <h4 className={`font-black uppercase tracking-tighter leading-none m-0 ${sizing.title}`}>{title}</h4>}
        <p className={`font-bold leading-tight m-0 ${sizing.message}`}>{children}</p>
      </div>
    )
  }
)

Alert.displayName = 'Alert'
