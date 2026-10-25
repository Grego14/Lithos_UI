import { Slider } from '../../../components/ui/Slider'

export const DefaultSliderExample = () => (
  <div className="w-full max-w-sm">
    <label htmlFor="slider-volume" className="font-bold">
      Volume
    </label>
    <Slider id="slider-volume" name="volume" defaultValue={40} />
  </div>
)
