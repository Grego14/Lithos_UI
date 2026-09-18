import { FiMaximize } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconMaximize = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiMaximize size={size} strokeWidth={strokeWidth} {...props} />
}
