import { useState } from 'react'
import { Slider } from '../../../components/ui/Slider'

const rangeLimit = 100
const rangeStep = 1
const formatValue = (value: number) => `${value}%`

// Both native inputs share one visual track. Only the thumbs receive pointer
// events, so either handle can be dragged without the other input blocking it.
const handleStyles =
  'pointer-events-none absolute inset-0 m-0 w-full focus-visible:z-30 focus-visible:outline-none [&::-webkit-slider-runnable-track]:border-0 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:shadow-none [&::-moz-range-track]:border-0 [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:shadow-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-8 [&::-webkit-slider-thumb]:-mt-3 [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#009e92] [&::-webkit-slider-thumb]:bg-(--lithos-surface) [&::-webkit-slider-thumb]:shadow-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-8 [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[#009e92] [&::-moz-range-thumb]:bg-(--lithos-surface) [&::-moz-range-thumb]:shadow-none focus-visible:[&::-webkit-slider-thumb]:outline-2 focus-visible:[&::-webkit-slider-thumb]:outline-offset-4 focus-visible:[&::-webkit-slider-thumb]:outline-(--lithos-text) focus-visible:[&::-moz-range-thumb]:outline-2 focus-visible:[&::-moz-range-thumb]:outline-offset-4 focus-visible:[&::-moz-range-thumb]:outline-(--lithos-text)'

export const RangeSliderExample = () => {
  const [minimum, setMinimum] = useState(0)
  const [maximum, setMaximum] = useState(22)
  const [activeHandle, setActiveHandle] = useState<'minimum' | 'maximum'>('maximum')
  const start = (minimum / rangeLimit) * 100
  const end = (maximum / rangeLimit) * 100

  return (
    <div className="w-full max-w-md" role="group" aria-labelledby="range-slider-label">
      <p id="range-slider-label" className="mb-4 font-bold">
        Selected range: {formatValue(minimum)} to {formatValue(maximum)}
      </p>
      <div
        className="relative h-11"
        dir="ltr"
        onPointerMove={(event) => {
          if (event.buttons !== 0) return
          const bounds = event.currentTarget.getBoundingClientRect()
          const middle = 16 + ((bounds.width - 32) * (start + end)) / 200
          setActiveHandle(event.clientX - bounds.left < middle ? 'minimum' : 'maximum')
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-(--lithos-text)/15"
        >
          <div
            className="absolute h-full rounded-full bg-[#009e92]"
            style={{ left: `${start}%`, width: `${end - start}%` }}
          />
        </div>
        <Slider
          aria-label="Minimum value"
          aria-describedby="range-slider-label"
          aria-valuemax={maximum}
          aria-valuetext={formatValue(minimum)}
          min={0}
          max={rangeLimit}
          step={rangeStep}
          value={minimum}
          onValueChange={(value) => setMinimum(Math.min(value, maximum))}
          onFocus={() => setActiveHandle('minimum')}
          shape="round"
          className={handleStyles}
          style={{ zIndex: activeHandle === 'minimum' ? 20 : 10 }}
        />
        <Slider
          aria-label="Maximum value"
          aria-describedby="range-slider-label"
          aria-valuemin={minimum}
          aria-valuetext={formatValue(maximum)}
          min={0}
          max={rangeLimit}
          step={rangeStep}
          value={maximum}
          onValueChange={(value) => setMaximum(Math.max(value, minimum))}
          onFocus={() => setActiveHandle('maximum')}
          shape="round"
          className={handleStyles}
          style={{ zIndex: activeHandle === 'maximum' ? 20 : 10 }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-4 top-1/2 z-40">
          <span
            className="absolute h-3 w-2 -translate-x-1/2 -translate-y-1/2 border-x-2 border-[#d5efec]"
            style={{ left: `${start}%` }}
          />
          <span
            className="absolute h-3 w-2 -translate-x-1/2 -translate-y-1/2 border-x-2 border-[#d5efec]"
            style={{ left: `${end}%` }}
          />
        </div>
      </div>
    </div>
  )
}
