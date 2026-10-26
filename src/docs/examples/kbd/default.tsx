import { Kbd } from '../../../components/ui/Kbd'

export const DefaultKbd = () => {
  return (
    <div className="flex items-center space-x-2">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Tab</Kbd>
    </div>
  )
}
