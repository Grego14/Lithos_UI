import { FiSettings } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconSettings = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return (
    <FiSettings
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}

IconSettings.displayName = 'IconSettings'
