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
import { PropertyControl } from './PropertyControl'
import type { ThemeBuilderProps } from './types'
import { Footer } from '../../showroom/sections/Footer'
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/Tabs'
import { Toggle } from '../../components/ui/Toggle'
import { Select } from '../../components/ui/Select'
import { Button, ButtonGroup } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
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
    viewport,
    setViewport,
    defaults,
    currentValues,
    colorProps,
    geometryProps,
    shadowProps,
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

            <div className="p-5 flex flex-col gap-10">
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
          <div className="flex flex-col w-full lg:w-[340px] h-full overflow-hidden bg-(--lithos-surface) border-b lg:border-b-0 lg:border-r-2 border-(--lithos-border) font-sans text-(--lithos-text)">
            <div className="h-14 border-b-2 border-(--lithos-border) bg-(--lithos-surface) flex items-center justify-between shrink-0 px-5">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-(--lithos-accent) border-2 border-(--lithos-border) rounded-(--lithos-radius)"></div>
                <h2 className="text-sm font-black tracking-widest uppercase mt-0.5">Design Tokens</h2>
              </div>
              <span className="text-xs font-mono font-bold text-(--lithos-muted) uppercase">
                {colorProps.length + geometryProps.length + shadowProps.length} Vars
              </span>
            </div>

            <div className="p-5 space-y-8 h-full overflow-y-auto">
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
                    <PropertyControl
                      key={prop.key}
                      property={prop}
                      value={currentValues[prop.key] ?? defaults[prop.key] ?? ''}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </div>
              {/* Shadows */}
              <div>
                <div className="flex flex-col gap-5">
                  {shadowProps.map((prop) => (
                    <PropertyControl
                      key={prop.key}
                      property={prop}
                      value={currentValues[prop.key] ?? defaults[prop.key] ?? ''}
                      onChange={handleChange}
                    />
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
                  {geometryProps.map((prop) => (
                    <PropertyControl
                      key={prop.key}
                      property={prop}
                      value={currentValues[prop.key] ?? defaults[prop.key] ?? '0px'}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 3: STAGE */}
          <div className="flex flex-col min-w-0 flex-1 h-full overflow-hidden bg-(--lithos-surface) font-sans text-(--lithos-text)">
            {/* Stage Header */}
            <div className="h-14 px-6 border-b-2 border-(--lithos-border) bg-(--lithos-surface) flex items-end justify-between">
              <Tabs variant="underline" value={stageTab} onValueChange={(val) => setStageTab(val as StageTab)}>
                <TabsList className="gap-2">
                  <TabsTrigger value="preview">Live Preview</TabsTrigger>

                  <TabsTrigger value="code">Generated CSS</TabsTrigger>

                  <TabsTrigger value="swatches">Token Swatches</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-4 pb-2">
                <ButtonGroup attached className="shadow-[2px_2px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)">
                  <Button
                    variant="secondary"
                    onClick={() => setViewport('desktop')}
                    className={`px-2.5 py-1.5 shadow-none hover:shadow-none active:shadow-none active:translate-x-0 active:translate-y-0 rounded-r-none hover:bg-(--lithos-bg) ${viewport === 'desktop' ? 'text-(--lithos-text) bg-(--lithos-bg)' : 'text-(--lithos-muted)'}`}
                  >
                    <IconMonitor size={15} strokeWidth={2.5} />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setViewport('tablet')}
                    className={`px-2.5 py-1.5 shadow-none hover:shadow-none active:shadow-none active:translate-x-0 active:translate-y-0 rounded-none hover:bg-(--lithos-bg) ${viewport === 'tablet' ? 'text-(--lithos-text) bg-(--lithos-bg)' : 'text-(--lithos-muted)'}`}
                  >
                    <IconTablet size={14} strokeWidth={2.5} />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setViewport('mobile')}
                    className={`px-2.5 py-1.5 shadow-none hover:shadow-none active:shadow-none active:translate-x-0 active:translate-y-0 rounded-l-none hover:bg-(--lithos-bg) ${viewport === 'mobile' ? 'text-(--lithos-text) bg-(--lithos-bg)' : 'text-(--lithos-muted)'}`}
                  >
                    <IconSmartphone size={14} style={{ width: 12, height: 14 }} strokeWidth={2.5} />
                  </Button>
                </ButtonGroup>

                <Button
                  variant="primary"
                  onClick={() => navigator.clipboard.writeText(generatedCSS)}
                  iconLeft={<IconCopy size={14} strokeWidth={3} />}
                  className="px-4 py-2 font-black uppercase tracking-wider text-[11px] whitespace-nowrap shadow-[3px_3px_0_0_var(--lithos-shadow)] hover:shadow-[3px_3px_0_0_var(--lithos-shadow)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[1px_1px_0_0_var(--lithos-shadow)]"
                >
                  Copy CSS
                </Button>
              </div>
            </div>

            {/* Stage Body */}
            <div className="flex-1 lg:p-10 relative overflow-auto flex justify-center bg-(--lithos-bg) bg-[radial-gradient(var(--lithos-muted)_1.5px,transparent_1.5px)] bg-size-[16px_16px]">
              {stageTab === 'preview' && (
                <div
                  className={`h-full transition-all duration-300 rounded-none overflow-hidden border-4 border-(--lithos-border) bg-(--lithos-surface) ${previewMode === 'dark' ? 'obsidian' : ''}`}
                  style={{
                    ...previewStyle,
                    width: viewport === 'desktop' ? '100%' : viewport === 'tablet' ? '600px' : '375px',
                  }}
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
                <div>
                  <CodeViewer code={generatedCSS} language="css" />
                </div>
              )}

              {stageTab === 'swatches' && (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {THEME_PROPERTIES.map((prop) => {
                    const val = currentValues[prop.key] ?? defaults[prop.key] ?? ''
                    return (
                      <Card key={prop.key}>
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

                        <CardContent className="p-4 flex flex-col gap-1">
                          <p className="text-[13px] font-black uppercase tracking-wider text-(--lithos-text)">
                            {prop.label}
                          </p>
                          <code className="text-[11px] font-mono text-(--lithos-muted) font-bold truncate">
                            {prop.key}
                          </code>
                        </CardContent>
                      </Card>
                    )
                  })}
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
