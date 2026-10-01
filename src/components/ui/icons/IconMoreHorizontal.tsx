import { FiMoreHorizontal } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconMoreHorizontal = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => <FiMoreHorizontal size={size} strokeWidth={strokeWidth} {...props} />
