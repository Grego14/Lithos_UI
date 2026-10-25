import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownSeparator,
  DropdownSub,
} from '../../../components/ui/Dropdown'
import { Button } from '../../../components/ui/Button'

export const ProfileDropdownExample = () => (
  <Dropdown placement="bottom-start">
    <DropdownTrigger asChild>
      <Button variant="accent">My account</Button>
    </DropdownTrigger>
    <DropdownContent className="w-56 p-1">
      <DropdownGroup label="Settings">
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Plan</DropdownItem>
      </DropdownGroup>
      <DropdownSeparator />
      <DropdownSub
        trigger={
          <span className="flex w-full items-center justify-between">
            Preferences <span>▶</span>
          </span>
        }
      >
        <DropdownItem>Toggle Theme</DropdownItem>
        <DropdownItem>Language</DropdownItem>
      </DropdownSub>
      <DropdownSeparator />
      <DropdownItem className="text-red-500 hover:bg-red-500/5 focus:bg-red-500/5">Log out</DropdownItem>
    </DropdownContent>
  </Dropdown>
)
