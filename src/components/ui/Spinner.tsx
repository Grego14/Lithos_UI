/**
 * @fileoverview Lithos UI Spinner primitive.
 * - Neobrutalism inspired loading indicator.
 * - Uses FiLoader for the spinning icon.
 */
import type { ComponentPropsWithRef } from 'react'
import { FiLoader, FiRefreshCw, FiRefreshCcw, FiSettings } from 'react-icons/fi'
import { VscLoading } from 'react-icons/vsc'
import { LuLoaderCircle, LuLoader } from 'react-icons/lu'
import { TbLoader2, TbLoader3 } from 'react-icons/tb'
import { PiSpinnerGap, PiCircleNotch } from 'react-icons/pi'
import { RiLoader2Line, RiLoader3Line, RiLoader4Line } from 'react-icons/ri'
import { cn, type LithosClass } from '../../utils/cn'

export type SpinnerVariant = 'default' | 'accent' | 'inverse'
export type SpinnerIconType =
  | 'FiLoader'
  | 'FiRefreshCw'
  | 'FiRefreshCcw'
  | 'FiSettings'
  | 'VscLoading'
  | 'LuLoaderCircle'
  | 'LuLoader'
  | 'TbLoader2'
  | 'TbLoader3'
  | 'PiSpinnerGap'
  | 'PiCircleNotch'
  | 'RiLoader2Line'
  | 'RiLoader3Line'
  | 'RiLoader4Line'

export interface SpinnerProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  size?: number | string
  color?: string
  variant?: SpinnerVariant
  icon?: SpinnerIconType
  className?: LithosClass
  anticlockwise?: boolean
}

const iconMap: Record<SpinnerIconType, React.ElementType> = {
  FiLoader,
  FiRefreshCw,
  FiRefreshCcw,
  FiSettings,
  VscLoading,
  LuLoaderCircle,
  LuLoader,
  TbLoader2,
  TbLoader3,
  PiSpinnerGap,
  PiCircleNotch,
  RiLoader2Line,
  RiLoader3Line,
  RiLoader4Line,
}

const variantClass: Record<SpinnerVariant, string> = {
  default: 'text-(--lithos-text)',
  accent: 'text-(--lithos-accent)',
  inverse: 'text-(--lithos-bg)',
}

export const Spinner = ({
  size = 24,
  color,
  variant = 'default',
  icon = 'FiLoader',
  anticlockwise = false,
  className,
  ...rest
}: SpinnerProps) => {
  const Icon = iconMap[icon] || FiLoader

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-flex items-center justify-center animate-spin',
        anticlockwise && '[animation-direction:reverse]',
        !color && variantClass[variant],
        className
      )}
      style={{ color }}
      {...rest}
    >
      <Icon size={size} strokeWidth={3} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
