import { FiHeart } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconHeart = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiHeart size={size} strokeWidth={strokeWidth} {...props} />
}
