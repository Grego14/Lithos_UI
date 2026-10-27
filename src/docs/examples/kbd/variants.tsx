import { Kbd } from '../../../components/ui/Kbd'

export const KbdVariants = () => {
  return (
    <div className="flex flex-wrap items-center justify-center space-x-3">
      <Kbd variant="default">Default</Kbd>
      <Kbd variant="accent">Accent</Kbd>
      <Kbd variant="outline">Outline</Kbd>
      <Kbd variant="subtle">Subtle</Kbd>
      <Kbd variant="inverse">Inverse</Kbd>
    </div>
  )
}
