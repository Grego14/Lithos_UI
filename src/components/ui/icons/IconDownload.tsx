import { FiDownload } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconDownload = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return (
    <FiDownload
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}

IconDownload.displayName = 'IconDownload'
