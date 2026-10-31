import { IconArrowRight, IconHeart, IconSettings } from '../../../components/ui/icons'

export const DefaultExample = () => {
  return (
    <div className="flex items-center space-x-6 text-(--lithos-text)">
      <IconArrowRight size={20} />
      <IconHeart size={20} />
      <IconSettings size={20} />
    </div>
  )
}
