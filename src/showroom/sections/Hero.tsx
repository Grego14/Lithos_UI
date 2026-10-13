/**
 * @fileoverview Lithos UI hero slab.
 * - Opens the page with a zero-gap vertical anchor and a heavy terminal-style showcase.
 * - Utilizes the KineticGrid to create an interactive tracking environment.
 * - Keeps the opening rhythm controlled by explicit spacing math and centered containment.
 */
import { useNavigate } from 'react-router-dom'
import { KineticGrid } from '../../components/ui/KineticGrid'
import { Button } from '../../components/ui/Button'
import { Typography } from '../../components/ui/Typography'
import { getContrastText } from '../../utils/yiq'
import type { HexColor } from '../../core/types'
import { useTheme } from '../../core/hooks/useTheme'

const ARTISTIC_PALETTES = [
  { label: 'Cyber Lime', hex: '#00ff00' },
  { label: 'Acid Orange', hex: '#ff5500' },
  { label: 'Electric Violet', hex: '#7928ca' },
  { label: 'Toxic Yellow', hex: '#ffe600' },
  { label: 'Hyper Cyan', hex: '#00f0ff' },
  { label: 'Hot Magenta', hex: '#ff007f' },
] as const

const Hero = () => {
  const { accentColor, updateAccentColor } = useTheme()
  const fgColor = getContrastText(accentColor)
  const navigate = useNavigate()

  return (
    <section id="top" className="border-b-2 border-(--lithos-border) bg-(--lithos-bg)">
      {/* Deploying the tracking engine to the main landing viewport */}
      <KineticGrid baseOpacity="opacity-10" className="py-12 md:py-24 w-full">
        <div className="mx-auto max-w-7xl px-6 w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
          {/* Left Column: Copy & CTAs */}
          <div className="w-full lg:w-[55%] text-center lg:text-left flex flex-col items-center lg:items-start">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-(--lithos-text) opacity-60">
              MIT LICENSED · ZERO DEPENDENCIES ON GAP
            </p>

            <h1 className="text-4xl sm:text-5xl font-hero uppercase tracking-tighter leading-none md:text-7xl lg:text-8xl">
              BUILD FRONTENDS THAT REFUSE TO BREAK
            </h1>

            <h2 className="mt-4 text-3xl sm:text-4xl font-docs md:text-5xl italic font-medium text-(--lithos-accent)">
              Free Forever
            </h2>

            <p className="mt-6 text-xl sm:text-2xl font-normal leading-tight text-(--lithos-text) md:text-3xl font-body max-w-2xl mx-auto lg:mx-0">
              No layout shift. No unreadable text on a bad accent color. No CSS specificity fights. Four systems{' '}
              <Typography variant="mark">built into every component</Typography>, working automatically — so the UI you
              shipped is still standing next quarter.
            </p>

            <p className="mt-4 text-sm sm:text-base font-bold text-(--lithos-text) opacity-50">
              Zero-Gap · YIQ Contrast Engine · Specificity Overrides · Physics Tokens
            </p>

            <div className="mt-10 flex flex-col items-center lg:items-start sm:flex-row flex-wrap">
              <Button variant="primary" onClick={() => navigate('/docs')} className="mb-4 sm:mb-0 sm:mr-6 px-4 py-2">
                Documentation
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.open('https://github.com/lithosui/Lithos_UI', '_blank')}
                className="mb-4 sm:mb-0 px-4 py-2"
              >
                GitHub
              </Button>
            </div>
          </div>

          {/* Right Column: Bauhaus / Swiss Blueprint Live Theme Engine */}
          <div className="w-full lg:w-[42%] mt-12 lg:mt-24 flex justify-center lg:justify-end">
            <div className="relative border-4 border-(--lithos-border) bg-(--lithos-surface) p-5 sm:p-6 w-full max-w-md shadow-[8px_8px_0px_0px_var(--lithos-shadow)] rounded-(--lithos-radius) select-none">
              {/* Technical caliper corner tick-marks */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-(--lithos-border) pointer-events-none" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-(--lithos-border) pointer-events-none" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-(--lithos-border) pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-(--lithos-border) pointer-events-none" />

              {/* Blueprint Header */}
              <div className="flex justify-between items-center mb-5 border-b-2 border-(--lithos-border) pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-(--lithos-accent) border border-(--lithos-border) inline-block animate-pulse" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-(--lithos-text)">Theme Engine</h3>
                </div>
                <div className="flex items-center space-x-1.5 font-mono text-xs font-bold bg-(--lithos-bg) px-2 py-1 border-2 border-(--lithos-border) text-(--lithos-text) shadow-[2px_2px_0px_0px_var(--lithos-shadow)]">
                  <span
                    className="w-2.5 h-2.5 border border-(--lithos-border) shrink-0"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span>{accentColor.toUpperCase()}</span>
                </div>
              </div>

              {/* Palette Chips + Custom Trigger */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-(--lithos-text) opacity-70 mb-2">
                  <span className="font-mono text-[9px]">CLICK TO APPLY</span>
                </div>

                <div className="grid grid-cols-7 gap-1.5">
                  {ARTISTIC_PALETTES.map((palette) => {
                    const isSelected = accentColor.toLowerCase() === palette.hex.toLowerCase()
                    const paletteFg = getContrastText(palette.hex)
                    return (
                      <button
                        key={palette.hex}
                        type="button"
                        onClick={() => updateAccentColor(palette.hex as HexColor)}
                        title={palette.label}
                        aria-label={`Select ${palette.label}`}
                        className={`h-9 w-full border-2 border-(--lithos-border) lithos-click relative flex items-center justify-center transition-all ${
                          isSelected
                            ? 'ring-2 ring-(--lithos-border) ring-offset-1 scale-105 z-10 shadow-[2px_2px_0px_0px_var(--lithos-shadow)]'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: palette.hex }}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: paletteFg }} />
                        )}
                      </button>
                    )
                  })}

                  {/* Custom color picker trigger button */}
                  <div
                    className="h-9 w-full border-2 border-(--lithos-border) bg-(--lithos-bg) lithos-click relative flex items-center justify-center cursor-pointer hover:bg-(--lithos-surface) group"
                    title="Custom Color Picker"
                  >
                    <span className="text-xs font-black text-(--lithos-text) group-hover:scale-110 transition-transform">
                      +
                    </span>
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => updateAccentColor(e.target.value as HexColor)}
                      className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-10"
                      aria-label="Choose custom theme color"
                    />
                  </div>
                </div>
              </div>

              {/* Live Specimen & Contrast Gauge */}
              <div className="border-2 border-(--lithos-border) bg-(--lithos-bg) p-3.5 mb-4 shadow-[3px_3px_0px_0px_var(--lithos-shadow)]">
                {/* Gauge technical header */}
                <div className="flex items-center justify-between border-b border-dashed border-(--lithos-border) pb-2 mb-3">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-(--lithos-border)" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-(--lithos-text)">
                      Specimen Output
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-[9px] font-mono font-bold px-1.5 py-0.5 border border-(--lithos-border) bg-(--lithos-surface)">
                    <span>CONTRAST:</span>
                    <span style={{ color: fgColor === '#000000' ? '#059669' : '#2563eb' }}>
                      {fgColor === '#000000' ? 'HIGH (DARK INK)' : 'HIGH (LIGHT INK)'}
                    </span>
                  </div>
                </div>

                {/* Interactive live test buttons & tokens */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  {/* Dynamic Primary CTA */}
                  <button
                    type="button"
                    className="lithos-click px-3 py-1.5 border-2 border-(--lithos-border) font-black text-xs uppercase tracking-tight shadow-[2px_2px_0px_0px_var(--lithos-shadow)] text-center transition-transform"
                    style={{ backgroundColor: accentColor, color: fgColor }}
                  >
                    Interactive CTA
                  </button>

                  {/* Contrast Tag Badge */}
                  <div className="flex items-center justify-center space-x-1.5 px-2.5 py-1.5 border-2 border-(--lithos-border) bg-(--lithos-surface) text-[10px] font-bold uppercase tracking-wider text-(--lithos-text)">
                    <span
                      className="w-2 h-2 border border-(--lithos-border)"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span>Active Token</span>
                  </div>
                </div>

                {/* Swiss calibration bar */}
                <div className="mt-3 pt-2.5 border-t border-dashed border-(--lithos-border)/50 flex items-center justify-between text-[9px] font-mono text-(--lithos-text) opacity-70">
                  <span>SCALE: 1:1</span>
                  <span className="flex items-center space-x-1">
                    <span>DELTA E: 0.0</span>
                    <span>·</span>
                    <span>CALIBRATED</span>
                  </span>
                </div>
              </div>

              {/* Technical Footnote */}
              <div className="text-[10px] font-bold text-(--lithos-text) opacity-60 text-center uppercase tracking-widest flex items-center justify-center space-x-2">
                <span>◄</span>
                <span>One seed token cascades site-wide in 0ms</span>
                <span>►</span>
              </div>
            </div>
          </div>
        </div>
      </KineticGrid>
    </section>
  )
}

export { Hero }
