import { FiChevronLeft } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconChevronLeft = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiChevronLeft size={size} strokeWidth={strokeWidth} {...props} />
}
