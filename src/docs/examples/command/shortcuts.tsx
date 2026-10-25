import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandBadge,
  CommandSeparator,
} from '../../../components/ui/Command'
import { IconFileText } from '../../../components/ui/icons/IconFileText'
import { IconFolder } from '../../../components/ui/icons/IconFolder'
import { IconSearch } from '../../../components/ui/icons/IconSearch'
import { IconSettings } from '../../../components/ui/icons/IconSettings'

export const ShortcutsCommandExample = () => (
  <Command className="w-full">
    <CommandInput placeholder="Search actions or files..." />
    <CommandList>
      <CommandEmpty>No actions found.</CommandEmpty>
      <CommandGroup heading="Quick Actions">
        <CommandItem value="New Document">
          <IconFileText className="mr-2" />
          <span>New Document</span>
          <CommandBadge intent="accent" size="sm" className="ml-2">
            Pro
          </CommandBadge>
          <CommandShortcut>⌘N</CommandShortcut>
        </CommandItem>
        <CommandItem value="Open Folder">
          <IconFolder className="mr-2" />
          <span>Open Folder</span>
          <CommandShortcut>⌘O</CommandShortcut>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="System">
        <CommandItem value="Global Search">
          <IconSearch className="mr-2" />
          <span>Global Search</span>
          <CommandShortcut>⌘F</CommandShortcut>
        </CommandItem>
        <CommandItem value="Preferences">
          <IconSettings className="mr-2" />
          <span>Preferences</span>
          <CommandShortcut>⌘,</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
)
