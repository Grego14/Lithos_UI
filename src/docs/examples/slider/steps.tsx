import { useId, useState } from 'react'
import { Slider } from '../../../components/ui/Slider'

export const SteppedSliderExample = () => {
  const id = useId()
  const min = 0
  const max = 100
  const step = 20
  const stops = Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, index) => min + index * step)
  const [value, setValue] = useState(min + step)

  return (
    <div className="w-full max-w-sm">
      <label htmlFor={id} className="font-bold">
        Value: {value}
      </label>
      <Slider
        id={id}
        name="stepped-value"
        aria-describedby={`${id}-help`}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={setValue}
        className="transition-none [&::-webkit-slider-thumb]:transition-none [&::-moz-range-thumb]:transition-none"
      />
      <div
        aria-hidden="true"
        className="mx-2.5 mb-4 flex justify-between text-xs font-mono [&>span]:relative [&>span]:w-0 [&>span]:text-center [&>span]:before:absolute [&>span]:before:-top-2 [&>span]:before:left-0 [&>span]:before:h-2 [&>span]:before:border-l-2 [&>span]:before:border-(--lithos-border) [&>span>span]:inline-block [&>span>span]:-translate-x-1/2 [&>span[data-selected=true]]:font-black [&>span[data-selected=false]]:opacity-50"
      >
        {stops.map((stop) => (
          <span key={stop} data-selected={value === stop}>
            <span>{stop}</span>
          </span>
        ))}
      </div>
      <p className="mt-2 text-sm" id={`${id}-help`}>
        Drag the thumb to snap between stops in steps of {step}, or use the arrow keys.
      </p>
    </div>
  )
}
