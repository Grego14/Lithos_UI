import { FiMinimize } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconMinimize = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiMinimize size={size} strokeWidth={strokeWidth} {...props} />
}
