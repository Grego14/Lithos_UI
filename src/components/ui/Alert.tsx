/**
 * @fileoverview Lithos UI alert primitive.
 * - Renders inline within the page flow; never floats or auto-dismisses like Toast.
 * - No timer, no built-in dismiss: `onClose`/`onUndo` are opt-in, so the plaque stays
 *   persistent by default and only gains actions when the consumer wires them up.
 * - `filled` keeps border/shadow on the global --lithos-border/--lithos-shadow tokens so the
 *   edge stays visible against the page regardless of fill color; `outlined` moves border/shadow
 *   onto the accent color itself since the fill no longer carries it.
 */
import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties, type ReactNode } from 'react'
import { getContrastText } from '../../utils/yiq'
import { colors } from '../../utils/colors'
import type { HexColor } from '../../core/types'

export type AlertType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'accent'
export type AlertVariant = 'filled' | 'outlined'
export type AlertSize = 'xs' | 'sm' | 'md' | 'lg'

export interface AlertProps extends ComponentPropsWithoutRef<'div'> {
  type?: AlertType
  variant?: AlertVariant
  size?: AlertSize
  title?: string
  color?: HexColor | string
  onClose?: () => void
  onUndo?: () => void
  children: ReactNode
}

const sizeStyles: Record<AlertSize, { container: string; title: string; headerGap: string; message: string }> = {
  xs: { container: 'p-2 max-w-xs', title: 'text-xs', headerGap: 'mb-1', message: 'text-[11px]' },
  sm: { container: 'p-4 sm:p-5 max-w-xl', title: 'text-base', headerGap: 'mb-2', message: 'text-sm' },
  md: { container: 'p-6 sm:p-7 max-w-2xl', title: 'text-xl', headerGap: 'mb-3', message: 'text-base' },
  lg: { container: 'p-8 sm:p-10', title: 'text-2xl', headerGap: 'mb-4', message: 'text-lg' },
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    { type = 'default', variant = 'filled', size = 'lg', title, color, onClose, onUndo, className = '', style, children, ...props },
    ref
  ) => {
    const isAccent = type === 'accent' && !color
    const accentColor = color || (type === 'accent' ? 'var(--lithos-accent)' : colors[type])
    const isFilled = variant === 'filled'
    const textColor = isFilled ? (isAccent ? 'var(--lithos-accent-text)' : getContrastText(accentColor)) : 'var(--lithos-text)'
    const sizing = sizeStyles[size]

    const actionColor = isFilled ? textColor : accentColor

    const classes = [
      'border-2 w-full',
      isFilled ? 'border-(--lithos-border) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]' : '',
      sizing.container,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const computedStyle: CSSProperties = isFilled
      ? { backgroundColor: accentColor, color: textColor, ...style }
      : {
          backgroundColor: 'var(--lithos-bg)',
          color: textColor,
          borderColor: accentColor,
          boxShadow: `4px 4px 0px 0px ${accentColor}`,
          ...style,
        }

    return (
      <div ref={ref} role="alert" className={classes} style={computedStyle} {...props}>
        {(title || onClose || onUndo) && (
          <div className={`flex items-center ${sizing.headerGap}`}>
            {title && (
              <h4
                className={`font-black uppercase tracking-tighter leading-none m-0 ${sizing.title}`}
                style={!isFilled ? { color: accentColor } : undefined}
              >
                {title}
              </h4>
            )}

            {(onClose || onUndo) && (
              <div className="flex items-center shrink-0 ml-auto">
                {onUndo && (
                  <button
                    type="button"
                    onClick={onUndo}
                    aria-label="Undo"
                    className={`shrink-0 bg-transparent lithos-click ${onClose ? 'mr-3' : ''}`}
                    style={{ borderColor: actionColor, color: actionColor, boxShadow: `2px 2px 0px 0px ${actionColor}` }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" className="block">
                      <polyline points="9 14 4 9 9 4" />
                      <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
                    </svg>
                  </button>
                )}

                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close alert"
                    className="shrink-0 bg-transparent lithos-click"
                    style={{ borderColor: actionColor, color: actionColor, boxShadow: `2px 2px 0px 0px ${actionColor}` }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="4" className="block">
                      <path d="M2 2L14 14M14 2L2 14" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        <p className={`font-bold leading-tight m-0 ${sizing.message}`}>{children}</p>
      </div>
    )
  }
)

Alert.displayName = 'Alert'
