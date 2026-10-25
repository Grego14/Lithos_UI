import { FiMoon } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconMoon = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return <FiMoon size={size} strokeWidth={strokeWidth} {...props} />
}
