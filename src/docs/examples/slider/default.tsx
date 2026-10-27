import { useId, useState } from 'react'
import { Slider } from '../../../components/ui/Slider'

export const DefaultSliderExample = () => {
  const id = useId()
  const [volume, setVolume] = useState(40)

  return (
    <div className="w-full max-w-sm">
      <label htmlFor={id} className="font-bold">
        Volume: {volume}%
      </label>
      <Slider id={id} name="volume" defaultValue={40} onValueChange={setVolume} aria-valuetext={`${volume}%`} />
    </div>
  )
}
