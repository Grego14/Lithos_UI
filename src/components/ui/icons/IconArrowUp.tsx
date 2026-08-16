import { FiArrowUp } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconArrowUp = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiArrowUp size={size} strokeWidth={strokeWidth} {...props} />
}
