import { InputGroup, InputGroupInput } from '../../../components/ui/Input'
import { IconSearch, IconSettings } from '../../../components/ui/icons'

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
