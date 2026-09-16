import { FiRotateCcw } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconRotateCcw = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiRotateCcw size={size} strokeWidth={strokeWidth} {...props} />
}
