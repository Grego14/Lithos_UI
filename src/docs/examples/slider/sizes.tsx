import { Slider } from '../../../components/ui/Slider'

export const SliderSizesExample = () => (
  <div className="w-full max-w-sm">
    <label htmlFor="slider-small" className="font-bold">
      Small
    </label>
    <Slider id="slider-small" size="sm" defaultValue={25} />
    <label htmlFor="slider-medium" className="mt-4 block font-bold">
      Medium
    </label>
    <Slider id="slider-medium" size="md" defaultValue={50} />
    <label htmlFor="slider-large" className="mt-4 block font-bold">
      Large
    </label>
    <Slider id="slider-large" size="lg" defaultValue={75} />
  </div>
)
