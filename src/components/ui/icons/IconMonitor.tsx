import { FiMonitor } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconMonitor = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiMonitor size={size} strokeWidth={strokeWidth} {...props} />
}
