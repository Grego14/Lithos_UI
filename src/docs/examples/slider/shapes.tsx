import { Slider } from '../../../components/ui/Slider'

export const SliderShapesExample = () => (
  <div className="w-full max-w-sm">
    <label htmlFor="slider-square" className="font-bold">
      Square
    </label>
    <Slider id="slider-square" shape="square" defaultValue={35} />
    <label htmlFor="slider-round" className="mt-4 block font-bold">
      Round
    </label>
    <Slider id="slider-round" shape="round" defaultValue={65} />
  </div>
)
