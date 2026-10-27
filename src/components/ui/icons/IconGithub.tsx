import { FiGithub } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconGithub = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiGithub size={size} strokeWidth={strokeWidth} {...props} />
}
