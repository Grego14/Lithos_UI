import { FiFolder } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconFolder = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return (
    <FiFolder
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}

IconFolder.displayName = 'IconFolder'
