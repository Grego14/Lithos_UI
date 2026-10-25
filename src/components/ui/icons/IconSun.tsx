import { FiSun } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconSun = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return <FiSun size={size} strokeWidth={strokeWidth} {...props} />
}
