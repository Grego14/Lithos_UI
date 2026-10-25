import { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/Button'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandDialog,
  CommandShortcut,
} from '../../../components/ui/Command'

export const CommandDialogExample = () => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setOpen((previous) => !previous)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Command Palette <CommandShortcut className="ml-2">⌘K</CommandShortcut>
      </Button>
      <CommandDialog open={open} onClose={onClose}>
        <Command>
          <CommandInput placeholder="Search documentation or components..." />
          <CommandList>
            <CommandEmpty>No matches found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={onClose}>Documentation</CommandItem>
              <CommandItem onSelect={onClose}>Component Library</CommandItem>
              <CommandItem onSelect={onClose}>GitHub Repository</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
