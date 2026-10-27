import { useState } from 'react'
import { Toggle } from '../../../components/ui/Toggle'

export const ToggleExample = () => {
  const [checked, setChecked] = useState(false)

  return <Toggle checked={checked} onToggle={() => setChecked(!checked)} label="Documentation Toggle" />
}
