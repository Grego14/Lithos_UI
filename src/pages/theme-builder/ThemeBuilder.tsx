/**
 * @fileoverview Lithos UI Theme Studio page.
 * - Full-viewport (100vh) studio workbench, no page-level scroll.
 * - Three horizontal panels — Actions / Tokens / Stage.
 * - High-density, sharp bento-box dashboard orientation.
 * - Strictly utilizes imported UI components for all interactions.
 */

import { Navbar } from '../../showroom/sections/Navbar'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { THEME_PROPERTIES, PRESET_THEMES } from './constants'
import { useThemeHistory } from './useThemeHistory'
import { SpecimenGrid } from './SpecimenGrid'
import type { ThemeBuilderProps } from './types'
import { Footer } from '../../showroom/sections/Footer'
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/Tabs'
import { Toggle } from '../../components/ui/Toggle'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { IconChevronDown } from '../../components/ui/icons/IconChevronDown'
import { IconUndo } from '../../components/ui/icons/IconUndo'
import { IconRedo } from '../../components/ui/icons/IconRedo'
import { IconUpload } from '../../components/ui/icons/IconUpload'
import { IconDownload } from '../../components/ui/icons/IconDownload'
import { IconRotateCcw } from '../../components/ui/icons/IconRotateCcw'
import { IconMonitor } from '../../components/ui/icons/IconMonitor'
import { IconTablet } from '../../components/ui/icons/IconTablet'
import { IconSmartphone } from '../../components/ui/icons/IconSmartphone'
import { IconCopy } from '../../components/ui/icons/IconCopy'

type StageTab = 'preview' | 'code' | 'swatches'

export const ThemeBuilder = ({ isDarkMode, toggleObsidian }: ThemeBuilderProps) => {
  const {
    previewMode,
    stageTab,
    setStageTab,
    defaults,
    currentValues,
    colorProps,
    geometryProps,
    canUndo,
    canRedo,
    handleChange,
    handleUndo,
    handleRedo,
    handleReset,
    handlePresetSelect,
    handleTogglePreviewMode,
    fileInputRef,
    handleExportJSON,
    handleImportJSON,
    previewStyle,
    generatedCSS,
  } = useThemeHistory()

  return (
    <>
      <Navbar isDarkMode={isDarkMode} onToggleObsidian={toggleObsidian} />

      <main className="h-screen pt-16 flex flex-col overflow-hidden bg-(--lithos-bg) text-(--lithos-text) font-sans antialiased">
        {/* Strict monolithic flex container for exact height sharing and sharp border intersections */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row w-full items-stretch">
          {/* PANEL 1: CONFIGURATION */}
          <div className="flex flex-col min-w-0 w-full lg:w-[280px] h-full overflow-y-auto bg-(--lithos-surface) border-b lg:border-b-0 lg:border-r-2 border-(--lithos-border) shrink-0 font-sans text-(--lithos-text)">
            {/* Header */}
            <div className="h-14 px-5 border-b-2 border-(--lithos-border) sticky top-0 bg-(--lithos-surface) z-10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-(--lithos-accent) border-2 border-(--lithos-border) rounded-(--lithos-radius)"></div>
                <h2 className="text-sm font-black tracking-widest uppercase mt-0.5">Configuration</h2>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-4">
              {/* Workspace */}
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-(--lithos-text) rounded-(--lithos-radius)"></div>
                    <span className="text-[13px] font-black tracking-widest uppercase">Workspace</span>
                  </div>
                </div>
                <div className="flex items-center justify-between w-2/3 border-2 border-(--lithos-border) shadow-[4px_4px_0_0_var(--lithos-shadow)] bg-(--lithos-surface) py-1.5 px-3 rounded-(--lithos-radius)">
                  <span
                    className={`text-[13px] font-bold cursor-pointer transition-colors ${
                      previewMode !== 'dark'
                        ? 'text-(--lithos-text)'
                        : 'text-(--lithos-muted) hover:text-(--lithos-text)'
                    }`}
                    onClick={() => previewMode === 'dark' && handleTogglePreviewMode()}
                  >
                    Light
                  </span>
                  <Toggle
                    checked={previewMode === 'dark'}
                    onToggle={handleTogglePreviewMode}
                    label="Toggle dark mode"
                  />
                  <span
                    className={`text-[13px] font-bold cursor-pointer transition-colors ${
                      previewMode === 'dark'
                        ? 'text-(--lithos-text)'
                        : 'text-(--lithos-muted) hover:text-(--lithos-text)'
                    }`}
                    onClick={() => previewMode !== 'dark' && handleTogglePreviewMode()}
                  >
                    Dark
                  </span>
                </div>
              </div>

              {/* Presets */}
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-(--lithos-text) rounded-(--lithos-radius)"></div>
                    <span className="text-[13px] font-black tracking-widest uppercase">Presets</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-(--lithos-accent)">
                    {PRESET_THEMES.length} <span className="ml-0.5 uppercase">Ready</span>
                  </span>
                </div>

                <Select
                  options={PRESET_THEMES.map((preset) => ({ label: preset.name, value: preset.id }))}
                  placeholder="Select preset..."
                  onChange={(val) => handlePresetSelect(val)}
                  className="w-full border-2 border-(--lithos-border) shadow-[4px_4px_0_0_var(--lithos-shadow)] hover:shadow-[4px_4px_0_0_var(--lithos-shadow)] active:shadow-[4px_4px_0_0_var(--lithos-shadow)] active:translate-x-0 active:translate-y-0 bg-(--lithos-surface) rounded-(--lithos-radius) flex justify-between items-center text-[13px] font-bold cursor-pointer hover:opacity-90 transition-colors px-3 py-2.5"
                />

                <div className="flex flex-wrap gap-2 mt-4">
                  {['Default', 'Cyber', 'Tokyo', 'Mono'].map((p) => (
                    <Button
                      key={p}
                      variant={p === 'Default' ? 'primary' : 'secondary'}
                      onClick={() => handlePresetSelect(p.toLowerCase())}
                      className="px-2.5 py-1 text-xs"
                    >
                      #{p}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-(--lithos-text) rounded-(--lithos-radius)"></div>
                    <span className="text-[13px] font-black tracking-widest uppercase">Timeline</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-(--lithos-muted)">HIST (12)</span>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={handleUndo}
                    disabled={!canUndo}
                    iconLeft={<IconUndo size={14} strokeWidth={2.5} />}
                    className={`flex-1 py-2 text-[13px] font-bold ${
                      !canUndo && 'bg-(--lithos-bg) text-(--lithos-muted) shadow-[4px_4px_0_0_var(--lithos-shadow)]'
                    }`}
                  >
                    Undo{' '}
                    <span className={`${canUndo ? 'text-(--lithos-muted)' : 'opacity-50'} font-mono text-xs ml-1`}>
                      ⌘Z
                    </span>
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleRedo}
                    disabled={!canRedo}
                    iconLeft={<IconRedo size={14} strokeWidth={2.5} />}
                    className={`flex-1 py-2 text-[13px] font-bold ${
                      !canRedo && 'bg-(--lithos-bg) text-(--lithos-muted) shadow-[4px_4px_0_0_var(--lithos-shadow)]'
                    }`}
                  >
                    Redo{' '}
                    <span className={`${canRedo ? 'text-(--lithos-muted)' : 'opacity-50'} font-mono text-xs ml-1`}>
                      ⇧⌘Z
                    </span>
                  </Button>
                </div>
              </div>

              {/* Data Transfer */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 bg-(--lithos-text) rounded-(--lithos-radius)"></div>
                  <span className="text-[13px] font-black tracking-widest uppercase">Data Transfer</span>
                </div>
                <div className="flex flex-col space-y-3">
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={handleExportJSON}
                    className="justify-between py-2.5 px-3 text-[13px] hover:bg-(--lithos-bg)"
                  >
                    <div className="flex items-center gap-3">
                      <IconUpload size={16} strokeWidth={2.5} />
                      Export config
                    </div>
                    <span className="text-(--lithos-muted) font-mono text-xs uppercase">.JSON</span>
                  </Button>
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => fileInputRef.current?.click()}
                    className="justify-between py-2.5 px-3 text-[13px] hover:bg-(--lithos-bg)"
                  >
                    <div className="flex items-center gap-3">
                      <IconDownload size={16} strokeWidth={2.5} />
                      Import config
                    </div>
                    <span className="text-(--lithos-muted) font-mono text-xs uppercase">FILE</span>
                  </Button>
                  <input type="file" ref={fileInputRef} onChange={handleImportJSON} accept=".json" className="hidden" />
                </div>
              </div>

              {/* Reset */}
              <div className="mt-4 pt-8 border-t-2 border-(--lithos-border)">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleReset}
                  iconLeft={<IconRotateCcw size={16} strokeWidth={2.5} />}
                  className="py-3 text-[14px] font-bold hover:opacity-90"
                >
                  Reset all values
                </Button>
              </div>
            </div>
          </div>

          {/* PANEL 2: DESIGN TOKENS */}
          <div className="flex flex-col min-w-0 w-full lg:w-[340px] h-full overflow-hidden bg-(--lithos-surface) border-b lg:border-b-0 lg:border-r-2 border-(--lithos-border) shrink-0 font-sans text-(--lithos-text)">
            <div className="h-14 px-5 border-b-2 border-(--lithos-border) sticky top-0 bg-(--lithos-surface) z-10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-(--lithos-accent) border-2 border-(--lithos-border) rounded-(--lithos-radius)"></div>
                <h2 className="text-sm font-black tracking-widest uppercase mt-0.5">Design Tokens</h2>
              </div>
              <span className="text-xs font-mono font-bold text-(--lithos-muted) uppercase">
                {colorProps.length + geometryProps.length} Vars
              </span>
            </div>

            <div className="p-5 space-y-8 h-full">
              {/* Color Palette */}
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-(--lithos-accent) rounded-(--lithos-radius)"></div>
                    <span className="text-[13px] font-black tracking-widest uppercase">Color Palette</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-(--lithos-muted)">HEX/CSS</span>
                </div>
                <div className="flex flex-col gap-2">
                  {colorProps.map((prop) => (
                    <div
                      key={prop.key}
                      className="border-2 border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-surface) flex justify-between items-center p-1.5"
                    >
                      <div className="flex items-center gap-3 pl-1">
                        <div
                          className="w-[18px] h-[18px] border-2 border-(--lithos-border) rounded-(--lithos-radius)"
                          style={{
                            backgroundColor: currentValues[prop.key] ?? defaults[prop.key] ?? 'var(--lithos-surface)',
                          }}
                        ></div>
                        <span className="text-[13px] font-bold">{prop.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5 pr-1">
                        <input
                          type="text"
                          value={currentValues[prop.key] ?? defaults[prop.key] ?? ''}
                          onChange={(e) => handleChange(prop.key, e.target.value)}
                          className="w-[84px] border-2 border-(--lithos-border) rounded-(--lithos-radius) px-1.5 py-1 text-[11px] font-mono font-bold text-center outline-none bg-(--lithos-bg) text-(--lithos-text) focus:brightness-95"
                        />
                        <div
                          className="w-[18px] h-[18px] border-2 border-(--lithos-border) rounded-(--lithos-radius)"
                          style={{
                            backgroundColor: currentValues[prop.key] ?? defaults[prop.key] ?? 'var(--lithos-surface)',
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Geometry & Radius */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2.5 h-2.5 bg-(--lithos-accent) rounded-(--lithos-radius)"></div>
                  <span className="text-[13px] font-black tracking-widest uppercase">Geometry & Radius</span>
                </div>
                <div className="flex flex-col gap-5">
                  {geometryProps.map((prop) => {
                    const val = currentValues[prop.key] ?? defaults[prop.key] ?? '0px'
                    const numVal = parseInt(val.toString().replace('px', '')) || 0
                    const isRadius = prop.label.toLowerCase().includes('radius')

                    let displayValue = val
                    if (isRadius && numVal === 0) displayValue = '0px (Sharp)'

                    return (
                      <div
                        key={prop.key}
                        className="border-2 border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-surface) p-4 flex flex-col gap-4"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[13px] font-bold uppercase">{prop.label}</span>
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
                            min="0"
                            max={isRadius ? '32' : '12'}
                            value={numVal}
                            onChange={(e) => handleChange(prop.key, e.target.value + 'px')}
                            className="absolute z-10 w-full appearance-none bg-transparent cursor-pointer h-full
                              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-(--lithos-accent) [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-(--lithos-border) [&::-webkit-slider-thumb]:shadow-[2px_2px_0_0_var(--lithos-shadow)] [&::-webkit-slider-thumb]:rounded-(--lithos-radius)
                              [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-(--lithos-accent) [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-(--lithos-border) [&::-moz-range-thumb]:shadow-[2px_2px_0_0_var(--lithos-shadow)] [&::-moz-range-thumb]:rounded-(--lithos-radius)"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-(--lithos-muted) font-bold uppercase mt-1">
                          <span>0px {isRadius ? '(Brutal)' : ''}</span>
                          <span>{isRadius ? '16px' : '6px'}</span>
                          <span>{isRadius ? '32px (Pill)' : '12px'}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 3: STAGE */}
          <div className="flex flex-col min-w-0 flex-1 h-full overflow-hidden bg-(--lithos-surface) font-sans text-(--lithos-text)">
            {/* Stage Header */}
            <div className="h-14 px-6 border-b-2 border-(--lithos-border) shrink-0 bg-(--lithos-surface) flex items-end justify-between relative z-10">
              <Tabs value={stageTab} onValueChange={(val) => setStageTab(val as StageTab)}>
                <TabsList className="flex space-x-6 h-full items-end bg-transparent p-0 border-none shadow-none rounded-none">
                  <TabsTrigger
                    value="preview"
                    className="flex items-center gap-2 pb-3 relative font-black uppercase tracking-widest text-[12px] transition-colors data-[state=active]:text-(--lithos-text) data-[state=inactive]:text-(--lithos-muted) hover:text-(--lithos-text)"
                  >
                    {stageTab === 'preview' && (
                      <>
                        <span className="w-2 h-2 rounded-full bg-(--lithos-accent)"></span>
                        <span className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-(--lithos-accent)"></span>
                      </>
                    )}
                    Live Preview
                  </TabsTrigger>

                  <TabsTrigger
                    value="code"
                    className="pb-3 relative font-black uppercase tracking-widest text-[12px] transition-colors data-[state=active]:text-(--lithos-text) data-[state=inactive]:text-(--lithos-muted) hover:text-(--lithos-text)"
                  >
                    {stageTab === 'code' && (
                      <span className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-(--lithos-accent)"></span>
                    )}
                    Generated CSS
                  </TabsTrigger>

                  <TabsTrigger
                    value="swatches"
                    className="pb-3 relative font-black uppercase tracking-widest text-[12px] transition-colors data-[state=active]:text-(--lithos-text) data-[state=inactive]:text-(--lithos-muted) hover:text-(--lithos-text)"
                  >
                    {stageTab === 'swatches' && (
                      <span className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-(--lithos-accent)"></span>
                    )}
                    Token Swatches
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Actions */}
              <div className="flex items-center gap-4 pb-2.5">
                {/* Device Toggle Group */}
                <div className="flex border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[2px_2px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)">
                  <button className="px-2 py-1 border-r-2 border-(--lithos-border) hover:bg-(--lithos-bg) text-(--lithos-text) flex items-center justify-center rounded-l-(--lithos-radius)">
                    <IconMonitor size={15} strokeWidth={2.5} />
                  </button>
                  <button className="px-2 py-1 border-r-2 border-(--lithos-border) hover:bg-(--lithos-bg) text-(--lithos-muted) flex items-center justify-center">
                    <IconTablet size={14} strokeWidth={2.5} />
                  </button>
                  <button className="px-2 py-1 hover:bg-(--lithos-bg) text-(--lithos-muted) flex items-center justify-center rounded-r-(--lithos-radius)">
                    <IconSmartphone size={14} style={{ width: 12, height: 14 }} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Copy CSS Button */}
                <button
                  onClick={() => navigator.clipboard.writeText(generatedCSS)}
                  className="flex items-center gap-2 bg-(--lithos-accent) border-2 border-(--lithos-border) text-(--lithos-text) px-3 py-1.5 font-black uppercase tracking-wider text-[11px] shadow-[3px_3px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius) active:translate-y-[2px] active:translate-x-[2px] active:shadow-[1px_1px_0_0_var(--lithos-shadow)] transition-all cursor-pointer"
                >
                  <IconCopy size={14} strokeWidth={3} />
                  Copy CSS
                </button>
              </div>
            </div>

            {/* Stage Canvas (With dotted background) */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 lg:p-10 relative bg-(--lithos-bg) bg-[radial-gradient(var(--lithos-muted)_1.5px,transparent_1.5px)] bg-size-[16px_16px]">
              {stageTab === 'preview' && (
                <div
                  className={`mx-auto max-w-[1400px] h-full w-full rounded-(--lithos-radius) overflow-hidden border-4 border-(--lithos-border) bg-(--lithos-surface) shadow-[8px_8px_0_0_var(--lithos-shadow)] ${previewMode === 'dark' ? 'obsidian' : ''}`}
                  style={previewStyle}
                >
                  <SpecimenGrid
                    style={previewStyle}
                    accentColor={
                      currentValues['--lithos-accent'] ?? defaults['--lithos-accent'] ?? 'var(--lithos-accent)'
                    }
                  />
                </div>
              )}

              {stageTab === 'code' && (
                <div className="max-w-5xl mx-auto h-full flex flex-col space-y-4 bg-(--lithos-surface) p-8 border-4 border-(--lithos-border) shadow-[8px_8px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)">
                  <h3 className="text-xl font-black tracking-widest uppercase">Generated CSS</h3>
                  <div className="border-2 border-(--lithos-border) flex-1 min-h-0 overflow-hidden shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)">
                    <CodeViewer code={generatedCSS} language="css" />
                  </div>
                </div>
              )}

              {stageTab === 'swatches' && (
                <div className="max-w-6xl mx-auto w-full space-y-8 bg-(--lithos-surface) p-8 border-4 border-(--lithos-border) shadow-[8px_8px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)">
                  <h3 className="text-xl font-black tracking-widest uppercase">Token Swatches</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {THEME_PROPERTIES.map((prop) => {
                      const val = currentValues[prop.key] ?? defaults[prop.key] ?? ''
                      return (
                        <div
                          key={prop.key}
                          className="border-2 border-(--lithos-border) bg-(--lithos-surface) flex flex-col rounded-(--lithos-radius) overflow-hidden shadow-[4px_4px_0_0_var(--lithos-shadow)] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--lithos-shadow)]"
                        >
                          <div
                            className="h-28 w-full flex items-center justify-center border-b-2 border-(--lithos-border)"
                            style={{
                              backgroundColor:
                                val.startsWith('rgba') || val.startsWith('#') ? val : 'var(--lithos-surface)',
                            }}
                          >
                            <span className="text-[11px] font-mono font-bold bg-(--lithos-surface) text-(--lithos-text) px-2 py-1 border-2 border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)">
                              {val}
                            </span>
                          </div>

                          <div className="p-4 flex flex-col gap-1">
                            <p className="text-[13px] font-black uppercase tracking-wider text-(--lithos-text)">
                              {prop.label}
                            </p>
                            <code className="text-[11px] font-mono text-(--lithos-muted) font-bold truncate">
                              {prop.key}
                            </code>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
