import { Input } from '../../components/ui/Input'
import type { ThemeProperty } from './types'
import { parseRgba, rgbToHex, hexToRgb, parseNumericValue } from './helpers'

interface PropertyControlProps {
  property: ThemeProperty
  value: string
  onChange: (key: string, value: string) => void
}

export const PropertyControl = ({ property, value, onChange }: PropertyControlProps) => {
  const { key, label, type, min = 0, max = 24, step = 1, unit = '' } = property

  if (type === 'color') {
    return (
      <div className="flex items-center justify-between gap-3 py-3">
        <label className="text-sm font-medium">{label}</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value}
            aria-label={`${label} color picker`}
            onChange={(e) => onChange(key, e.target.value)}
            className="h-7 w-7 cursor-pointer rounded-md border border-(--lithos-border)/20 p-0.5 shrink-0"
          />
          <Input
            value={value}
            aria-label={`${label} hex code`}
            onChange={(e) => onChange(key, e.target.value)}
            className="w-24 font-code text-xs h-8"
            size="sm"
          />
        </div>
      </div>
    )
  }

  if (type === 'opacity') {
    const parsed = parseRgba(value)
    const hexValue = parsed ? rgbToHex(parsed.r, parsed.g, parsed.b) : '#000000'
    const opacityValue = parsed ? parsed.a : 1

    const handleColorChange = (newHex: string) => {
      const rgb = hexToRgb(newHex)
      if (rgb) {
        onChange(key, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacityValue})`)
      }
    }

    const handleOpacityChange = (newOpacity: number) => {
      const rgb = hexToRgb(hexValue)
      if (rgb) {
        onChange(key, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${newOpacity})`)
      }
    }

    return (
      <div className="py-3">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">{label}</label>
          <span className="text-xs font-code opacity-60">{Math.round(opacityValue * 100)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={hexValue}
            aria-label={`${label} base color`}
            onChange={(e) => handleColorChange(e.target.value)}
            className="h-7 w-7 cursor-pointer rounded-md border border-(--lithos-border)/20 p-0.5 shrink-0"
          />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={opacityValue}
            aria-label={`${label} opacity slider`}
            onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
            className="flex-1 accent-(--lithos-accent) cursor-pointer h-1.5"
          />
        </div>
      </div>
    )
  }

  const numericValue = parseNumericValue(value)

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-xs font-code opacity-60">
          {numericValue}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={numericValue}
        aria-label={`${label} slider`}
        onChange={(e) => onChange(key, `${e.target.value}${unit}`)}
        className="w-full accent-(--lithos-accent) cursor-pointer h-1.5"
      />
    </div>
  )
}
