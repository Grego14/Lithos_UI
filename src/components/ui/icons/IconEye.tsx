import { FiEye } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconEye = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => (
  <FiEye size={size} strokeWidth={strokeWidth} {...props} />
)
