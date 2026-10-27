import { Kbd, KbdGroup } from '../../../components/ui/Kbd'

export const ShortcutSequences = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Standard spaced group */}
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span className="text-xs font-mono font-bold opacity-60 text-(--lithos-text)">+</span>
        <Kbd>Shift</Kbd>
        <span className="text-xs font-mono font-bold opacity-60 text-(--lithos-text)">+</span>
        <Kbd>P</Kbd>
      </KbdGroup>

      {/* Attached brutalist strip */}
      <KbdGroup attached>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </div>
  )
}
