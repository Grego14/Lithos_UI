import { FiHome } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconHome = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return (
    <FiHome
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}
