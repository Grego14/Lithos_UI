import { InputGroup, InputGroupInput } from '../../../components/ui/Input'
import { IconSearch } from '../../../components/ui/icons/IconSearch'
import { IconSettings } from '../../../components/ui/icons/IconSettings'

export const InputIconsExample = () => (
  <>
    <InputGroup className="max-w-xs" startAdornment={<IconSearch />}>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
    <InputGroup className="mt-4 max-w-xs" endAdornment={<IconSettings />}>
      <InputGroupInput placeholder="Settings" />
    </InputGroup>
  </>
)
