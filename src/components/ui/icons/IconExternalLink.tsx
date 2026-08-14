import { FiExternalLink } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconExternalLink = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return (
    <FiExternalLink
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}
