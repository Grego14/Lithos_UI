import { FiChevronDown } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconChevronDown = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return (
    <FiChevronDown
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}
