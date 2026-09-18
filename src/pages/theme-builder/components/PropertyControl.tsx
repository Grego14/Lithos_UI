import { Input } from '../../../components/ui/Input'
import type { ThemeProperty } from '../utils/types'
import { parseRgba, rgbToHex, hexToRgb } from '../utils/helpers'
import { Badge } from '../../../components/ui/Badge'

interface PropertyControlProps {
  property: ThemeProperty
  value: string
  onChange: (key: string, value: string) => void
  variant?: 'default' | 'inline'
}

export const PropertyControl = ({ property, value, onChange, variant = 'default' }: PropertyControlProps) => {
  const { key, label, min = 0, max = 24, unit = '' } = property

  if (property.type === 'color') {
    return (
      <div
        className={`flex justify-between items-center ${variant === 'inline' ? 'w-full' : 'border-2 border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-surface) p-1.5'}`}
      >
        <div className="flex items-center space-x-3 pl-1">
          <input
            type="color"
            value={value}
            aria-label={`${label} color picker`}
            onChange={(e) => onChange(key, e.target.value)}
            className="w-[18px] h-[18px] shrink-0 cursor-pointer rounded-(--lithos-radius) border border-(--lithos-border) p-0 bg-transparent overflow-hidden appearance-none 
                 [&::-webkit-color-swatch-wrapper]:p-0 
                 [&::-webkit-color-swatch]:border-none 
                 [&::-moz-color-swatch]:border-none"
          />
          <span className="text-[13px] font-bold uppercase">{label}</span>
        </div>
        <div className="flex items-center space-x-1.5 pr-1">
          <Input
            type="text"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(key, e.target.value)}
            className="w-[100px] h-[30px]"
          />
          <input
            type="color"
            value={value}
            aria-label={`${label} color picker`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(key, e.target.value)}
            className="w-[18px] h-[18px] shrink-0 cursor-pointer rounded-(--lithos-radius) border border-(--lithos-border) p-0 bg-transparent overflow-hidden appearance-none 
                 [&::-webkit-color-swatch-wrapper]:p-0 
                 [&::-webkit-color-swatch]:border-none 
                 [&::-moz-color-swatch]:border-none"
          />
        </div>
      </div>
    )
  }

  if (property.type === 'shadow') {
    let hex = '#000000'
    let opacity = 100

    const parsed = parseRgba(value)
    if (parsed) {
      hex = rgbToHex(parsed.r, parsed.g, parsed.b)
      opacity = Math.round(parsed.a * 100)
    } else if (value.startsWith('#')) {
      hex = value.slice(0, 7)
      opacity = 100
    }

    const handleColorChange = (newHex: string) => {
      const rgb = hexToRgb(newHex) || { r: 0, g: 0, b: 0 }
      onChange(key, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity / 100})`)
    }

    const handleOpacityChange = (newOpacity: number) => {
      const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 }
      onChange(key, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${newOpacity / 100})`)
    }

    return (
      <div
        className={`flex flex-col space-y-1 ${variant === 'inline' ? 'w-full' : 'border-2 border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-surface) p-4'}`}
      >
        <div className="flex justify-between items-center">
          <span className="text-[13px] font-bold uppercase">{label}</span>
          <div className="flex items-center space-x-3 pr-1">
            <input
              type="color"
              value={hex}
              aria-label={`${label} color picker`}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-[25px] h-[25px] shrink-0 cursor-pointer rounded-(--lithos-radius) border border-(--lithos-border) bg-transparent overflow-hidden appearance-none 
                   [&::-webkit-color-swatch-wrapper]:p-0 
                   [&::-webkit-color-swatch]:border-none 
                   [&::-moz-color-swatch]:border-none"
            />
            <Badge intent="accent">{opacity}%</Badge>
          </div>
        </div>
        <div className="relative w-full h-6 flex flex-col justify-center mt-2">
          <div className="w-full h-1.5 border border-(--lithos-border) bg-(--lithos-bg) absolute top-1/2 -translate-y-1/2 z-0 pointer-events-none rounded-(--lithos-radius)"></div>
          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => handleOpacityChange(parseInt(e.target.value))}
            className="absolute z-10 w-full appearance-none bg-transparent cursor-pointer h-full
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-(--lithos-accent) [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-(--lithos-border) [&::-webkit-slider-thumb]:shadow-[2px_2px_0_0_var(--lithos-shadow)] [&::-webkit-slider-thumb]:rounded-(--lithos-radius)
              [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-(--lithos-accent) [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-(--lithos-border) [&::-moz-range-thumb]:shadow-[2px_2px_0_0_var(--lithos-shadow)] [&::-moz-range-thumb]:rounded-(--lithos-radius)"
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-(--lithos-muted) font-bold uppercase mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    )
  }

  const numVal = parseInt(value.toString().replace(unit, '')) || 0
  const isRadius = label.toLowerCase().includes('radius')

  let displayValue = value
  if (isRadius && numVal === 0) displayValue = '0px (Sharp)'

  return (
    <div
      className={`flex flex-col space-y-1 ${variant === 'inline' ? 'w-full' : 'border-2 border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-surface) p-4'}`}
    >
      <div className="flex justify-between items-center">
        <span className="text-[13px] font-bold uppercase">{label}</span>
        <Badge intent="accent">{displayValue}</Badge>
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
