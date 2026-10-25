import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox'
import { useState } from 'react'

export const HorizontalCheckboxGroupExample = () => {
  const [value, setValue] = useState<string[]>(['mon', 'wed', 'fri'])

  return (
    <CheckboxGroup value={value} onChange={setValue} mode="horizontal" label="Active days">
      <Checkbox value="mon" label="Mon" />
      <Checkbox value="tue" label="Tue" />
      <Checkbox value="wed" label="Wed" />
      <Checkbox value="thu" label="Thu" />
      <Checkbox value="fri" label="Fri" />
    </CheckboxGroup>
  )
}
