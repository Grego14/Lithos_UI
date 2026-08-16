import { FiCode } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconCode = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return <FiCode size={size} strokeWidth={strokeWidth} {...props} />
}
