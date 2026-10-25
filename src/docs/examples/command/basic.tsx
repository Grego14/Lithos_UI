import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandItemDescription,
  CommandShortcut,
  CommandBadge,
  CommandSeparator,
  CommandFooter,
} from '../../../components/ui/Command'
import { IconFileText } from '../../../components/ui/icons/IconFileText'
import { IconFolder } from '../../../components/ui/icons/IconFolder'
import { IconSearch } from '../../../components/ui/icons/IconSearch'
import { IconSettings } from '../../../components/ui/icons/IconSettings'

export const BasicCommandExample = () => (
  <Command className="w-full">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Quick Actions">
        <CommandItem value="Create Document" keywords={['new', 'draft', 'markdown']}>
          <IconFileText className="mr-2 shrink-0" />
          <div className="flex flex-col">
            <span>Create Document</span>
            <CommandItemDescription>Start a new markdown draft</CommandItemDescription>
          </div>
          <CommandBadge intent="accent" size="sm" className="ml-2">
            New
          </CommandBadge>
          <CommandShortcut>⌘N</CommandShortcut>
        </CommandItem>
        <CommandItem value="Open Folder" keywords={['directory', 'workspace', 'browse']}>
          <IconFolder className="mr-2 shrink-0" />
          <div className="flex flex-col">
            <span>Open Folder</span>
            <CommandItemDescription>Browse workspace directories</CommandItemDescription>
          </div>
          <CommandShortcut>⌘O</CommandShortcut>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Preferences & Tools">
        <CommandItem value="Search Project" keywords={['find', 'grep', 'files']}>
          <IconSearch className="mr-2 shrink-0" />
          <span>Search Project</span>
          <CommandShortcut>⌘F</CommandShortcut>
        </CommandItem>
        <CommandItem value="Settings" keywords={['preferences', 'theme', 'config']}>
          <IconSettings className="mr-2 shrink-0" />
          <span>Settings</span>
          <CommandBadge size="sm" className="ml-2">
            Config
          </CommandBadge>
          <CommandShortcut>⌘,</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
    <CommandFooter />
  </Command>
)
