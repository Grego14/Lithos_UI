import { useState } from 'react'
import { Slider } from '../../../components/ui/Slider'

export const ControlledSliderExample = () => {
  const [volume, setVolume] = useState(40)

  return (
    <div className="w-full max-w-sm">
      <label htmlFor="slider-controlled" className="font-bold">
        Volume: {volume}%
      </label>
      <Slider id="slider-controlled" value={volume} onValueChange={setVolume} aria-valuetext={`${volume}%`} />
    </div>
  )
}
