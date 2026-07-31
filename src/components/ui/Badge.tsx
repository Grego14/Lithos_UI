import type { ReactNode } from "react";
import { getContrastText } from "../../utils/yiq";
import { colors } from "../../colors";
import { useTheme } from "../../core/useTheme";

type BadgeSizes = 'small' | 'default' | 'medium' | 'large'
type BadgeVariants = 'default' | 'accent' | 'success' | 'error' | 'warning' | 'info'

interface BadgeProps {
  children?: ReactNode
  variant?: BadgeVariants
  className?: string,
  size?: BadgeSizes
}

const baseStyles = 'uppercase font-(--font-sans) font-bold border-2 border-(--lithos-border) shadow-[1px_1px_0_0_var(--lithos-border)]'

const sizeStyles = {
  small: 'text-[0.65rem] px-1.5',
  default: 'text-xs px-1.75',
  medium: 'text-sm px-2',
  large: 'text-lg px-3'
}

export const Badge = ({ children, className = '', size = 'default', variant = 'default' }: BadgeProps) => {
  const { accentColor } = useTheme()

  const bgColor = variant === 'accent' ? accentColor : colors[variant] 
  const contrastedColor = getContrastText(bgColor)

  return (
    <div className={`${baseStyles} ${sizeStyles[size]} py-1 w-max ${className}`} style={{ backgroundColor: bgColor, color: contrastedColor }}>
      {children}
    </div>
  )
}
