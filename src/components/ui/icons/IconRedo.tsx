import { FiRotateCw } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconRedo = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiRotateCw size={size} strokeWidth={strokeWidth} {...props} />
}
