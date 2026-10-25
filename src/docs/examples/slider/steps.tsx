import { Slider } from '../../../components/ui/Slider'

export const SteppedSliderExample = () => (
  <div className="w-full max-w-sm">
    <label htmlFor="slider-temperature" className="font-bold">
      Temperature (°C)
    </label>
    <Slider
      id="slider-temperature"
      name="temperature"
      aria-describedby="slider-temperature-help"
      min={-10}
      max={40}
      step={0.5}
      defaultValue={20}
    />
    <p className="mt-2 text-sm" id="slider-temperature-help">
      −10 to 40 °C in half-degree steps.
    </p>
  </div>
)
