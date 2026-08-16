import { FiMenu } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconMenu = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return <FiMenu size={size} strokeWidth={strokeWidth} {...props} />
}
