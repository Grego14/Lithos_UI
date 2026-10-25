import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox'
import { useState } from 'react'

export const CheckboxGroupExample = () => {
  const [value, setValue] = useState<string[]>(['email'])

  return (
    <CheckboxGroup value={value} onChange={setValue} label="Notify me by" description="Choose one or more channels.">
      <Checkbox value="email" label="Email" />
      <Checkbox value="sms" label="SMS" />
      <Checkbox value="push" label="Push notification" />
    </CheckboxGroup>
  )
}
