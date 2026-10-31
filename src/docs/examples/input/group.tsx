import { InputGroup, InputGroupInput, InputGroupAddon } from '../../../components/ui/Input'
import { IconSearch } from '../../../components/ui/icons'

export const InputGroupExample = () => (
  <InputGroup className="max-w-xs">
    <InputGroupInput placeholder="Search..." />
    <InputGroupAddon>
      <IconSearch />
    </InputGroupAddon>
    <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
  </InputGroup>
)
