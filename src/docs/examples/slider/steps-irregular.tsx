import { useId, useState } from 'react'
import { Slider } from '../../../components/ui/Slider'

export const IrregularSteppedSliderExample = () => {
  const id = useId()
  const stops = [0, 5, 15, 35, 65, 100] as const
  const [position, setPosition] = useState(2)
  const value = stops[position] ?? stops[0]

  return (
    <div className="w-full max-w-sm">
      <label htmlFor={id} className="font-bold">
        Irregular value: {value}
      </label>
      <Slider
        id={id}
        aria-describedby={`${id}-help`}
        min={0}
        max={stops.length - 1}
        step={1}
        value={position}
        onValueChange={setPosition}
        aria-valuetext={`${value}`}
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
        Select one of these values: {stops.join(', ')}. Each arrow-key press moves to the next or previous stop.
      </p>
    </div>
  )
}
