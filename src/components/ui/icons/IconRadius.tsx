import { type IconProps, iconDefaults } from './IconBase'

export type IconRadiusVariant = 'none' | 'sm' | 'md' | 'lg'

export interface IconRadiusProps extends IconProps {
  /** Corner shape. @default 'md' */
  variant?: IconRadiusVariant
}

const cornerRadii = { none: 0, sm: 2.5, md: 6 } as const

export const IconRadius = ({
  variant = 'md',
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  color = 'currentColor',
  ...props
}: IconRadiusProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {variant === 'lg' ? (
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} fill={props.fill || 'none'} />
    ) : (
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx={cornerRadii[variant]}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap={variant === 'none' ? 'square' : 'round'}
        strokeLinejoin={variant === 'none' ? 'miter' : 'round'}
        fill={props.fill || 'none'}
      />
    )}
  </svg>
)

/** @deprecated Use IconRadius with variant="none". */
export const IconRadiusNone = (props: IconProps) => <IconRadius {...props} variant="none" />
/** @deprecated Use IconRadius with variant="sm". */
export const IconRadiusSm = (props: IconProps) => <IconRadius {...props} variant="sm" />
/** @deprecated Use IconRadius with variant="md". */
export const IconRadiusMd = (props: IconProps) => <IconRadius {...props} variant="md" />
/** @deprecated Use IconRadius with variant="lg". */
export const IconRadiusLg = (props: IconProps) => <IconRadius {...props} variant="lg" />
