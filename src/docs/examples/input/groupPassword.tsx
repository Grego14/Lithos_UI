import { InputGroup, InputGroupInput, InputGroupAddon } from '../../../components/ui/Input'

export const PasswordInputGroupExample = () => (
  <InputGroup className="max-w-xs">
    <InputGroupInput type="password" placeholder="Password" />
    <InputGroupAddon align="inline-end">Required</InputGroupAddon>
  </InputGroup>
)
