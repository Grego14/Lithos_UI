import { FiRefreshCcw } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconRefreshCcw = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiRefreshCcw size={size} strokeWidth={strokeWidth} {...props} />
}
