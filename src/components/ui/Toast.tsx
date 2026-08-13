/**
 * @fileoverview Lithos UI toast stack.
 * - Floats transient feedback outside the page flow so notifications never steal layout space.
 * - Uses explicit margins and fixed positioning to keep the stack predictable.
 * - Applies per-toast contrast and heavy borders so alerts read as hard objects.
 */
import { useState, useCallback, useEffect, useRef, type ReactNode } from 'react'
import { getContrastText } from '../../utils/yiq'
import { ToastContext } from '../../core/hooks/useToast'
import type { ToastProps, ToastPosition } from '../../core/types'
import { colors } from '../../utils/colors'
import { Button } from './Button'
import { IconClose } from './icons/IconClose'

type IdentifiedToastProps = ToastProps & { id: string }

interface ToastItemType {
  toast: IdentifiedToastProps
  onRemove: () => void
}

type DurationObjType = {
  success?: number,
  error?: number,
  warning?: number
  info?: number
  default?: number
}

interface ToastProviderProps {
  children: ReactNode
  duration?: DurationObjType | number
  position?: ToastPosition
}

const positionStyles = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0'
}

const DEFAULT_DURATION = 5000

export const ToastProvider = ({
  children,
  duration,
  position = 'bottom-right'
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<IdentifiedToastProps[]>([])

  const durationConfig = typeof duration == 'object' && Object.assign({
    success: 5000,
    error: 8000,
    warning: 5000,
    info: 5000,
    default: 5000
  }, duration) || null

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback(
    ({
      message,
      type = 'default',
      color,
      title,
      duration: customDuration,
    }: ToastProps) => {
      const id = Math.random().toString(36).substring(2, 9)
      let toastDuration = customDuration

      // use the duration config object
      if (!customDuration && durationConfig) {
        toastDuration = durationConfig[type]
      }

      // consumer passes a single duration for all the toast types
      if (typeof duration === 'number') {
        toastDuration = duration
      }

      // fallback duration
      if (!toastDuration) { toastDuration = DEFAULT_DURATION }

      setToasts((prev) => [...prev, {
        id,
        message,
        type,
        color,
        title,
        duration: toastDuration
      }])

      return id
    }, [durationConfig, duration])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* - Fixed corner stack uses explicit padding and margins, not gap, so each toast remains independently dismissible. */}
      <div className={`fixed ${positionStyles[position]} p-6 sm:p-6 md:p-8 z-50 pointer-events-none flex flex-col items-end w-full max-w-xs`}>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const ToastItem = ({ toast, onRemove }: ToastItemType) => {
  const { id, message, type = 'default', color, title, duration } = toast
  const [isHovered, setIsHovered] = useState(false)
  const toastRef = useRef<HTMLDivElement | null>(null)

  const isError = type === 'error'

  useEffect(() => {
    if (!isError || !toastRef.current) return

    // save previously focused element to restore it later
    const previousFocus = document.activeElement as HTMLElement | null

    // move focus to toast tile
    toastRef.current.focus()

    return () => {
      // restore focus when toast unmounts if it's still inside document
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus()
      }
    }
  }, [isError])

  // Toast persists on hover; auto-dismiss timer pauses while hovered
  useEffect(() => {
    if (isHovered) return

    let timeout = duration
    if (!timeout) { timeout = DEFAULT_DURATION }

    const timer = setTimeout(onRemove, timeout)
    return () => clearTimeout(timer)
  }, [isHovered, onRemove, isError, duration])

  const bgColor = color || colors[type] || colors.default
  const textColor = getContrastText(bgColor)

  const label = 'Close notification'

  const livePriority = isError ? 'assertive' : 'polite'
  const role = isError ? 'alert' : 'status'

  return (
    <>
      <style>{`
        /* - Per-toast override keeps contrast local to the alert tile. */
        .toast-override-${id} {
          background-color: ${bgColor} !important;
          color: ${textColor} !important;
          border-color: ${textColor} !important;
          --lithos-shadow: ${textColor} !important;
        }
      `}</style>

      {/* - Stack spacing uses explicit margins so each toast keeps its own exit path. */}
      <div
        ref={toastRef}
        role={role}
        aria-live={livePriority}
        tabIndex={isError ? -1 : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`toast-override-${id} pointer-events-auto border-2 p-3 sm:p-4 mb-4 w-full flex flex-row items-start shadow-[4px_4px_0_0_var(--lithos-shadow)] animate-[slide-up_0.3s_ease-out_forwards]`}
      >
        <div className="flex-1 mr-4">
          {title && <h4 className="font-black text-lg uppercase tracking-tighter leading-none mb-2 m-0">{title}</h4>}
          <p className="text-sm leading-tight m-0 font-body">{message}</p>
        </div>

        {/* - Close control keeps the same hard-edge language as the card. */}
        <Button
          onClick={onRemove}
          className="ml-3 shrink-0 bg-transparent text-current"
          aria-label={label}
          style={{ borderColor: textColor }}
        >
          <IconClose aria-hidden="true" />
        </Button>
      </div>
    </>
  )
}
