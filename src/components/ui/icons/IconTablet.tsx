import { FiTablet } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconTablet = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return (
    <FiTablet
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}
