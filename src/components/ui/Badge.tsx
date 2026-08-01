import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { getContrastText } from "../../utils/yiq";
import { colors } from "../../utils/colors";
import { useTheme } from "../../core/useTheme";

type BadgeSizes = 'small' | 'default' | 'medium' | 'large'
type BadgeVariants = 'default' | 'accent' | 'success' | 'error' | 'warning' | 'info'

export interface BadgeProps extends ComponentPropsWithoutRef<'div'> {
  variant?: BadgeVariants
  className?: string,
  size?: BadgeSizes
}

const sizeStyles = {
  small: 'text-[0.65rem] px-1.5',
  default: 'text-xs px-1.75',
  medium: 'text-sm px-2',
  large: 'text-lg px-3'
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ children, className = '', size = 'default', variant = 'default', ...props }, ref) => {
    const { accentColor } = useTheme()

    const bgColor = variant === 'accent' ? accentColor : colors[variant]
    const contrastedColor = getContrastText(bgColor)

    const classes = [
      'uppercase font-(--font-sans) font-bold border-2 border-(--lithos-border) shadow-[1px_1px_0_0_var(--lithos-border)] py-1 w-max',
      sizeStyles[size],
      className ?? ''
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={classes} style={{ backgroundColor: bgColor, color: contrastedColor }} {...props}>
        {children}
      </div>
    )
  }
)

Badge.displayName = 'Badge'
