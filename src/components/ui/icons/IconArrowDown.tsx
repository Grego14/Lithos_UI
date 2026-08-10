import { FiArrowDown } from "react-icons/fi";
import { type IconProps, iconDefaults } from './IconBase'

export const IconArrowDown = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return (
    <FiArrowDown
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}
