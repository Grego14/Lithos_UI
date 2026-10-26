import { useEffect, useRef } from 'react'
import { Kbd, KbdGroup } from '../../../components/ui/Kbd'
import { InputGroup, InputGroupInput } from '../../../components/ui/Input'

export const InContextKbd = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <InputGroup
      className="w-full max-w-sm"
      endAdornment={
        <KbdGroup>
          <Kbd size="sm">Ctrl</Kbd>
          <span className="text-xs font-mono font-bold opacity-60 text-(--lithos-text)">+</span>
          <Kbd size="sm">K</Kbd>
        </KbdGroup>
      }
    >
      <InputGroupInput ref={inputRef} placeholder="Quick Search... (Ctrl + K)" />
    </InputGroup>
  )
}
