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
      <div className="mb-3 flex items-center justify-between font-bold">
        <label id={`${id}-horizontal-label`} htmlFor={`${id}-horizontal`}>
          Volume
        </label>
        <span className="font-mono text-sm">{horizontal}%</span>
      </div>
      <Slider
        id={`${id}-horizontal`}
        aria-labelledby={`horizontal ${id}-horizontal-label`}
        mode="horizontal"
        value={horizontal}
        onValueChange={setHorizontal}
        aria-valuetext={`${horizontal}%`}
      />
      <h4 id="vertical" className="mt-8 mb-4 font-bold">
        Vertical
      </h4>
      <div className="mb-3 flex items-center justify-between font-bold">
        <label id={`${id}-vertical-label`} htmlFor={`${id}-vertical`}>
          Volume
        </label>
        <span className="font-mono text-sm">{vertical}%</span>
      </div>
      <Slider
        id={`${id}-vertical`}
        aria-labelledby={`vertical ${id}-vertical-label`}
        mode="vertical"
        value={vertical}
        onValueChange={setVertical}
        aria-valuetext={`${vertical}%`}
      />
    </div>
  )
}
