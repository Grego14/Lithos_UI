import { FiCopy } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconCopy = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiCopy size={size} strokeWidth={strokeWidth} {...props} />
}
