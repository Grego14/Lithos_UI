import { Kbd } from '../../../components/ui/Kbd'

export const KbdSizes = () => {
  return (
    <div className="flex items-center space-x-3">
      <Kbd size="xs">XS</Kbd>
      <Kbd size="sm">SM</Kbd>
      <Kbd size="md">MD</Kbd>
      <Kbd size="lg">LG</Kbd>
    </div>
  )
}
