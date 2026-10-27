import { useEffect, useId, useState } from 'react'
import { LuSun, LuSunDim } from 'react-icons/lu'
import { Slider } from '../../../components/ui/Slider'

export const BrightnessSliderExample = ({
  brightness,
  onBrightnessChange,
  iconPosition,
}: {
  brightness: number
  onBrightnessChange: (value: number) => void
  iconPosition: 'inside' | 'outside'
}) => {
  const id = useId()
  const inside = iconPosition === 'inside'

  return (
    <div role="group" aria-label={`App brightness, icons ${iconPosition}`} className="w-full max-w-sm">
      <div className="mb-3 flex items-center justify-between font-bold">
        <label htmlFor={id}>Brightness</label>
        <span className="font-mono text-sm">{brightness}%</span>
      </div>
      <div className="flex items-center">
        {!inside && <LuSunDim aria-hidden="true" size={22} className="mr-4 shrink-0 text-(--lithos-text)" />}
        <div className="relative h-12 min-w-0 flex-1 overflow-hidden rounded-lg border-2 border-(--lithos-border) bg-(--lithos-surface) focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-(--lithos-border)">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 rounded-[inherit] bg-(--lithos-accent)"
            style={{ width: `${brightness}%` }}
          />
          {inside && (
            <>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 flex w-12 items-center justify-center rounded-[inherit] bg-(--lithos-accent) text-(--lithos-accent-text)"
              >
                <LuSunDim size={22} />
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-[inherit] bg-(--lithos-surface) text-(--lithos-text)"
              >
                <LuSun size={26} />
              </span>
            </>
          )}
          <Slider
            id={id}
            value={brightness}
            onValueChange={onBrightnessChange}
            onFocus={() => onBrightnessChange(brightness)}
            onPointerDown={() => onBrightnessChange(brightness)}
            aria-valuetext={`${brightness}% brightness`}
            className="absolute inset-0 h-full w-full opacity-0"
          />
        </div>
        {!inside && <LuSun aria-hidden="true" size={26} className="ml-4 shrink-0 text-(--lithos-text)" />}
      </div>
    </div>
  )
}

/** Each control keeps its own value; the active control sets the app brightness. */
export const AppBrightnessExample = () => {
  const [controls, setControls] = useState<{ inside: number; outside: number; active: 'inside' | 'outside' }>({
    inside: 100,
    outside: 100,
    active: 'inside',
  })
  const brightness = controls[controls.active]
  const changeBrightness = (position: 'inside' | 'outside', value: number) => {
    setControls((previous) =>
      previous.active === position && previous[position] === value
        ? previous
        : { ...previous, [position]: value, active: position }
    )
  }

  useEffect(() => {
    const app = document.documentElement
    const previousFilter = app.style.filter
    return () => {
      app.style.filter = previousFilter
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.filter = `brightness(${0.25 + brightness * 0.0075})`
  }, [brightness])

  return (
    <div className="w-full max-w-sm">
      <h4 id="brightness-inside" className="mb-4 font-bold">
        Icons inside
      </h4>
      <BrightnessSliderExample
        brightness={controls.inside}
        onBrightnessChange={(value) => changeBrightness('inside', value)}
        iconPosition="inside"
      />
      <h4 id="brightness-outside" className="mt-8 mb-4 font-bold">
        Icons outside
      </h4>
      <BrightnessSliderExample
        brightness={controls.outside}
        onBrightnessChange={(value) => changeBrightness('outside', value)}
        iconPosition="outside"
      />
    </div>
  )
}
