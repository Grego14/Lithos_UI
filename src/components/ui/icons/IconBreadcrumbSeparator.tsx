import { FiChevronRight } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconBreadcrumbSeparator = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiChevronRight size={size} strokeWidth={strokeWidth} {...props} />
}
