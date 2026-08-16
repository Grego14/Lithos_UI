import { FiSmartphone } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconSmartphone = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiSmartphone size={size} strokeWidth={strokeWidth} {...props} />
}
