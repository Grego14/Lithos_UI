/**
 * @fileoverview Lithos UI avatar primitive.
 * - Always circular — the shape that reads correctly both standalone and stacked in a Group.
 * - Image swaps to initials from `alt` on load failure via onError, so a dead `src` never leaves a blank box.
 */
import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";
import { getContrastText } from "../../utils/yiq";
import { useTheme } from "../../core/useTheme";

type AvatarSizes = 'sm' | 'md' | 'lg'
type AvatarVariants = 'default' | 'solid'

export interface AvatarProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  src?: string | undefined
  alt?: string | undefined
  variant?: AvatarVariants
  size?: AvatarSizes
  className?: string
}

const sizeStyles = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-xl',
}

const getInitials = (value: string) =>
  value.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join('') || null

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = '', variant = 'default', size = 'md', className = '', ...props }, ref) => {
    const [imgFailed, setImgFailed] = useState(false)
    const { accentColor } = useTheme()

    const showImage = !!src && !imgFailed
    const bgColor = variant === 'solid' ? accentColor : undefined
    const contrastedColor = bgColor ? getContrastText(bgColor) : undefined

    const classes = [
      'relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-full border-2 border-(--lithos-border) shadow-[2px_2px_0px_0px_var(--lithos-shadow)] font-(--font-sans) font-bold uppercase',
      variant === 'default' ? 'bg-(--lithos-surface) text-(--lithos-text)' : '',
      sizeStyles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div
        ref={ref}
        className={classes}
        style={bgColor ? { backgroundColor: bgColor, color: contrastedColor } : undefined}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          getInitials(alt)
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'
