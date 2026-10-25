import { Checkbox } from '../../../components/ui/Checkbox'

export const DisabledCheckboxExample = () => (
  <>
    <Checkbox label="Disabled unchecked" disabled />
    <Checkbox label="Disabled checked" disabled defaultChecked />
  </>
)
