import { FiFileText } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconFileText = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return (
    <FiFileText
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}

IconFileText.displayName = 'IconFileText'
