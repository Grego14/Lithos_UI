import { useState } from 'react'
import { Slider } from '../../../components/ui/Slider'

const easyColor = '#22c55e'
const mediumColor = '#facc15'
const hardColor = '#ef4444'
const dividerStyles =
  '[&::-webkit-slider-thumb]:-mt-2 pointer-events-none absolute inset-0 m-0 w-full focus-visible:outline-none [&::-webkit-slider-runnable-track]:border-0 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:shadow-none [&::-moz-range-track]:border-0 [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:shadow-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto focus-visible:[&::-webkit-slider-thumb]:outline-2 focus-visible:[&::-webkit-slider-thumb]:outline-offset-4 focus-visible:[&::-webkit-slider-thumb]:outline-(--lithos-text) focus-visible:[&::-moz-range-thumb]:outline-2 focus-visible:[&::-moz-range-thumb]:outline-offset-4 focus-visible:[&::-moz-range-thumb]:outline-(--lithos-text)'

export const DifficultySliderExample = () => {
  const [easyEnd, setEasyEnd] = useState(30)
  const [mediumEnd, setMediumEnd] = useState(70)
  const [activeDivider, setActiveDivider] = useState<'easy' | 'medium'>('medium')
  const easyPercent = easyEnd
  const mediumPercent = mediumEnd - easyEnd
  const hardPercent = 100 - mediumEnd
  const summary = `Easy ${easyPercent}%, Medium ${mediumPercent}%, Hard ${hardPercent}%`
  const gradient = `linear-gradient(to right, ${easyColor} 0% ${easyEnd}%, ${mediumColor} ${easyEnd}% ${mediumEnd}%, ${hardColor} ${mediumEnd}% 100%)`

  return (
    <div className="w-full max-w-sm" role="group" aria-labelledby="difficulty-distribution-label">
      <p id="difficulty-distribution-label" className="mb-4 font-bold">
        Difficulty distribution
      </p>
      <div
        className="relative h-11"
        dir="ltr"
        onPointerMove={(event) => {
          if (event.buttons !== 0) return
          const bounds = event.currentTarget.getBoundingClientRect()
          const middle = 12 + ((bounds.width - 24) * (easyEnd + mediumEnd)) / 200
          setActiveDivider(event.clientX - bounds.left < middle ? 'easy' : 'medium')
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 top-1/2 h-3 -translate-y-1/2 rounded-full border-2 border-(--lithos-border)"
          style={{ backgroundImage: gradient }}
        />
        <Slider
          aria-label="Easy share"
          aria-describedby="difficulty-shares"
          aria-valuemax={mediumEnd}
          aria-valuetext={summary}
          min={0}
          max={100}
          step={1}
          value={easyEnd}
          onValueChange={(value) => setEasyEnd(Math.min(value, mediumEnd))}
          onFocus={() => setActiveDivider('easy')}
          color={easyColor}
          shape="round"
          size="lg"
          className={dividerStyles}
          style={{ zIndex: activeDivider === 'easy' ? 20 : 10 }}
        />
        <Slider
          aria-label="Easy and medium share"
          aria-describedby="difficulty-shares"
          aria-valuemin={easyEnd}
          aria-valuetext={summary}
          min={0}
          max={100}
          step={1}
          value={mediumEnd}
          onValueChange={(value) => setMediumEnd(Math.max(value, easyEnd))}
          onFocus={() => setActiveDivider('medium')}
          color={mediumColor}
          shape="round"
          size="lg"
          className={dividerStyles}
          style={{ zIndex: activeDivider === 'medium' ? 20 : 10 }}
        />
      </div>
      <div id="difficulty-shares" className="mt-2 flex justify-between font-mono text-sm">
        <span>
          <span className="mb-1 block h-1 w-6" style={{ backgroundColor: easyColor }} />
          Easy<span className="block font-bold">{easyPercent}%</span>
        </span>
        <span className="text-center">
          <span className="mx-auto mb-1 block h-1 w-6" style={{ backgroundColor: mediumColor }} />
          Medium<span className="block font-bold">{mediumPercent}%</span>
        </span>
        <span className="text-right">
          <span className="mb-1 ml-auto block h-1 w-6" style={{ backgroundColor: hardColor }} />
          Hard<span className="block font-bold">{hardPercent}%</span>
        </span>
      </div>
    </div>
  )
}
