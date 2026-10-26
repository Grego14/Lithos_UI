import { useRef, useState } from 'react'
import { Slider } from '../../../components/ui/Slider'

const rangeLimit = 100
const rangeStep = 1
const formatValue = (value: number) => `${value}%`

// Both native inputs share one visual track. Only the thumbs receive pointer
// events, so either handle can be dragged without the other input blocking it.
const handleStyles =
  'pointer-events-none absolute inset-0 m-0 w-full focus-visible:z-30 focus-visible:outline-none [&::-webkit-slider-runnable-track]:border-0 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:shadow-none [&::-moz-range-track]:border-0 [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:shadow-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto focus-visible:[&::-webkit-slider-thumb]:outline-2 focus-visible:[&::-webkit-slider-thumb]:outline-offset-4 focus-visible:[&::-webkit-slider-thumb]:outline-(--lithos-border) focus-visible:[&::-moz-range-thumb]:outline-2 focus-visible:[&::-moz-range-thumb]:outline-offset-4 focus-visible:[&::-moz-range-thumb]:outline-(--lithos-border)'

export const RangeSliderExample = () => {
  const minimumRef = useRef<HTMLInputElement>(null)
  const maximumRef = useRef<HTMLInputElement>(null)
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
        onPointerDown={(event) => {
          // Clicking the shared track must focus a native input for arrow keys.
          if (event.target === minimumRef.current || event.target === maximumRef.current) return
          event.preventDefault()
          const bounds = event.currentTarget.getBoundingClientRect()
          const middle = 10 + ((bounds.width - 20) * (start + end)) / 200
          const handle = event.clientX - bounds.left < middle ? minimumRef : maximumRef
          handle.current?.focus()
        }}
        onPointerMove={(event) => {
          if (event.buttons !== 0) return
          const bounds = event.currentTarget.getBoundingClientRect()
          const middle = 10 + ((bounds.width - 20) * (start + end)) / 200
          setActiveHandle(event.clientX - bounds.left < middle ? 'minimum' : 'maximum')
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-2.5 top-1/2 h-2 -translate-y-1/2 overflow-hidden rounded-(--lithos-radius) border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[2px_2px_0_0_var(--lithos-shadow)]"
        >
          <div
            className="absolute h-full bg-(--lithos-accent)"
            style={{ left: `${start}%`, width: `${end - start}%` }}
          />
        </div>
        <Slider
          ref={minimumRef}
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
          className={handleStyles}
          style={{ zIndex: activeHandle === 'minimum' ? 20 : 10 }}
        />
        <Slider
          ref={maximumRef}
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
          className={handleStyles}
          style={{ zIndex: activeHandle === 'maximum' ? 20 : 10 }}
        />
      </div>
    </div>
  )
}
