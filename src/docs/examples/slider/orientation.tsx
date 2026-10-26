import { useId, useState } from 'react'
import { Slider } from '../../../components/ui/Slider'

export const SliderOrientationExample = () => {
  const id = useId()
  const [horizontal, setHorizontal] = useState(60)
  const [vertical, setVertical] = useState(60)

  return (
    <div className="w-full max-w-sm">
      <h4 id="horizontal" className="mb-4 font-bold">
        Horizontal
      </h4>
      <label htmlFor={`${id}-horizontal`} className="mb-4 block font-bold">
        Horizontal: {horizontal}%
      </label>
      <Slider
        id={`${id}-horizontal`}
        mode="horizontal"
        value={horizontal}
        onValueChange={setHorizontal}
        aria-valuetext={`${horizontal}%`}
      />
      <h4 id="vertical" className="mt-8 mb-4 font-bold">
        Vertical
      </h4>
      <label htmlFor={`${id}-vertical`} className="mb-4 block font-bold">
        Vertical: {vertical}%
      </label>
      <Slider
        id={`${id}-vertical`}
        mode="vertical"
        value={vertical}
        onValueChange={setVertical}
        aria-valuetext={`${vertical}%`}
      />
    </div>
  )
}
