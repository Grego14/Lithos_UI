import { FiUpload } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconUpload = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiUpload size={size} strokeWidth={strokeWidth} {...props} />
}
