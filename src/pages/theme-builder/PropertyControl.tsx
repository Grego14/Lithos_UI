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
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-medium tracking-tight text-(--lithos-text)">{label}</label>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-(--lithos-radius) overflow-hidden border border-(--lithos-border) bg-(--lithos-bg) p-0.5 shrink-0 flex items-center justify-center focus-within:ring-2 focus-within:ring-(--lithos-accent)">
            <input
              type="color"
              value={value}
              aria-label={`${label} color picker`}
              onChange={(e) => onChange(key, e.target.value)}
              className="w-full h-full cursor-pointer border-0 p-0 bg-transparent block outline-none"
            />
          </div>
          <Input
            value={value}
            aria-label={`${label} hex code`}
            onChange={(e) => onChange(key, e.target.value)}
            className="w-24 font-mono text-xs h-8 bg-(--lithos-bg) border-(--lithos-border) focus:border-(--lithos-accent)"
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
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium tracking-tight text-(--lithos-text)">{label}</label>
          <span className="text-xs font-mono text-(--lithos-text) opacity-(--lithos-muted,0.6)">
            {Math.round(opacityValue * 100)}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-(--lithos-radius) overflow-hidden border border-(--lithos-border) bg-(--lithos-bg) p-0.5 shrink-0 flex items-center justify-center focus-within:ring-2 focus-within:ring-(--lithos-accent)">
            <input
              type="color"
              value={hexValue}
              aria-label={`${label} base color`}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-full cursor-pointer border-0 p-0 bg-transparent block outline-none"
            />
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={opacityValue}
            aria-label={`${label} opacity slider`}
            onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
            className="flex-1 accent-(--lithos-accent) h-1.5 bg-(--lithos-border) rounded-full appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-(--lithos-accent) focus:ring-offset-2 focus:ring-offset-(--lithos-surface)"
          />
        </div>
      </div>
    )
  }

  const numericValue = parseNumericValue(value)

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium tracking-tight text-(--lithos-text)">{label}</label>
        <span className="text-xs font-mono text-(--lithos-text) opacity-(--lithos-muted,0.6)">
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
        className="w-full accent-(--lithos-accent) h-1.5 bg-(--lithos-border) rounded-full appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-(--lithos-accent) focus:ring-offset-2 focus:ring-offset-(--lithos-surface)"
      />
    </div>
  )
}
