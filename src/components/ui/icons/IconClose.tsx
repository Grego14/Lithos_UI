import { FiX } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconClose = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return (
    <FiX
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}

IconClose.displayName = 'IconClose'
