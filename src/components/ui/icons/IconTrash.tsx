import { FiTrash2 } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconTrash = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => <FiTrash2 size={size} strokeWidth={strokeWidth} {...props} />
