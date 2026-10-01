import { FiEdit2 } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconEdit = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => (
  <FiEdit2 size={size} strokeWidth={strokeWidth} {...props} />
)
