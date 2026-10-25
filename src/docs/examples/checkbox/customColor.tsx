import { Checkbox, PlainCheckbox, IconCheckbox } from '../../../components/ui/Checkbox'

export const CustomColorCheckboxExample = () => (
  <>
    <Checkbox color="#FF0033" label="Subscribe to newsletter" defaultChecked />
    <PlainCheckbox color="#FF0033" label="Enable dark mode" defaultChecked />
    <IconCheckbox color="#FF0033" label="Add to favorites" defaultChecked />
  </>
)
