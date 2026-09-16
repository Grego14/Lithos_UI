import type { ThemeProperty } from './types'

interface PropertyControlProps {
  property: ThemeProperty
  value: string
  onChange: (key: string, value: string) => void
}

export const PropertyControl = ({ property, value, onChange }: PropertyControlProps) => {
  const { key, label, min = 0, max = 24, unit = '', section } = property

  if (section === 'colors') {
    return (
      <div className="border-2 border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-surface) flex justify-between items-center p-1.5">
        <div className="flex items-center gap-3 pl-1">
          <input
            type="color"
            value={value}
            aria-label={`${label} color picker`}
            onChange={(e) => onChange(key, e.target.value)}
            className="w-[18px] h-[18px] shrink-0 cursor-pointer rounded-full border border-(--lithos-border) p-0 bg-transparent overflow-hidden appearance-none 
                 [&::-webkit-color-swatch-wrapper]:p-0 
                 [&::-webkit-color-swatch]:border-none 
                 [&::-moz-color-swatch]:border-none"
          />
          <span className="text-[13px] font-bold">{label}</span>
        </div>
        <div className="flex items-center gap-1.5 pr-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(key, e.target.value)}
            className="w-[84px] border-2 border-(--lithos-border) rounded-(--lithos-radius) px-1.5 py-1 text-[11px] font-mono font-bold text-center outline-none bg-(--lithos-bg) text-(--lithos-text) focus:brightness-95"
          />
          <input
            type="color"
            value={value}
            aria-label={`${label} color picker`}
            onChange={(e) => onChange(key, e.target.value)}
            className="w-[18px] h-[18px] shrink-0 cursor-pointer rounded-full border border-(--lithos-border) p-0 bg-transparent overflow-hidden appearance-none 
                 [&::-webkit-color-swatch-wrapper]:p-0 
                 [&::-webkit-color-swatch]:border-none 
                 [&::-moz-color-swatch]:border-none"
          />
        </div>
      </div>
    )
  }

  const numVal = parseInt(value.toString().replace(unit, '')) || 0
  const isRadius = label.toLowerCase().includes('radius')

  let displayValue = value
  if (isRadius && numVal === 0) displayValue = '0px (Sharp)'

  return (
    <div className="border-2 border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-surface) p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-[13px] font-bold uppercase">{label}</span>
        <span
          className={`px-2 py-1 text-[11px] font-mono font-bold rounded-(--lithos-radius) ${
            isRadius
              ? 'bg-(--lithos-accent) text-(--lithos-text) border-2 border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)]'
              : 'bg-(--lithos-text) text-(--lithos-surface)'
          }`}
        >
          {displayValue}
        </span>
      </div>
      <div className="relative w-full h-6 flex flex-col justify-center mt-2">
        <div className="w-full h-1.5 border border-(--lithos-border) bg-(--lithos-bg) absolute top-1/2 -translate-y-1/2 z-0 pointer-events-none rounded-(--lithos-radius)"></div>
        <input
          type="range"
          min={min}
          max={max}
          value={numVal}
          onChange={(e) => onChange(key, e.target.value + unit)}
          className="absolute z-10 w-full appearance-none bg-transparent cursor-pointer h-full
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-(--lithos-accent) [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-(--lithos-border) [&::-webkit-slider-thumb]:shadow-[2px_2px_0_0_var(--lithos-shadow)] [&::-webkit-slider-thumb]:rounded-(--lithos-radius)
            [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-(--lithos-accent) [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-(--lithos-border) [&::-moz-range-thumb]:shadow-[2px_2px_0_0_var(--lithos-shadow)] [&::-moz-range-thumb]:rounded-(--lithos-radius)"
        />
      </div>
      <div className="flex justify-between text-[10px] font-mono text-(--lithos-muted) font-bold uppercase mt-1">
        <span>
          {min}
          {unit} {isRadius ? '(Brutal)' : ''}
        </span>
        <span>
          {Math.round((min + max) / 2)}
          {unit}
        </span>
        <span>
          {max}
          {unit} {isRadius ? '(Pill)' : ''}
        </span>
      </div>
    </div>
  )
}
