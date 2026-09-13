/**
 * @fileoverview Lithos UI Theme Studio page.
 * - Full-viewport (100vh) studio workbench, no page-level scroll.
 * - Three horizontal panels — Actions / Tokens / Stage.
 * - High-density, sharp bento-box dashboard orientation.
 * - Strictly utilizes imported UI components for all interactions.
 */

import { Navbar } from '../../showroom/sections/Navbar'
import { Button } from '../../components/ui/Button'
import { Toggle } from '../../components/ui/Toggle'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { THEME_PROPERTIES, PRESET_THEMES } from './constants'
import { useThemeHistory } from './useThemeHistory'
import { PropertyControl } from './PropertyControl'
import { SpecimenGrid } from './SpecimenGrid'
import type { ThemeBuilderProps } from './types'
import { Footer } from '../../showroom/sections/Footer'
import { Select } from '../../components/ui/Select'
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/Tabs'

type StageTab = 'preview' | 'code' | 'swatches'

const STAGE_TABS: { id: StageTab; label: string }[] = [
  { id: 'preview', label: 'Live Preview' },
  { id: 'code', label: 'Generated CSS' },
  { id: 'swatches', label: 'Token Swatches' },
]

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
          <div className="flex flex-col min-w-0 w-full lg:w-[280px] h-full overflow-y-auto bg-(--lithos-surface) border-b lg:border-b-0 lg:border-r-2 border-(--lithos-border) shrink-0">
            <div className="h-14 px-6 border-b-2 border-(--lithos-border) sticky top-0 bg-(--lithos-surface) z-10 flex items-center justify-between shrink-0">
              <h2 className="text-sm font-bold tracking-tight">Configuration</h2>
            </div>

            <div className="p-6 flex flex-col gap-8">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-(--lithos-text) opacity-70">
                  Workspace
                </p>
                <div className="flex items-center justify-between p-1 border border-(--lithos-border) bg-(--lithos-bg) rounded-(--lithos-radius)">
                  <span className="text-sm font-medium pl-3">
                    {previewMode === 'dark' ? 'Obsidian Mode' : 'Light Mode'}
                  </span>
                  <Toggle checked={previewMode === 'dark'} onToggle={handleTogglePreviewMode} label="Toggle mode" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-(--lithos-text) opacity-70">
                  Presets
                </p>
                <Select
                  placeholder="Select preset..."
                  onChange={(val) => handlePresetSelect(val as string)}
                  options={PRESET_THEMES.map((preset) => ({
                    label: preset.name,
                    value: preset.id,
                  }))}
                />
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-(--lithos-text) opacity-70">
                  Timeline
                </p>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={handleUndo} disabled={!canUndo} title="Undo (Ctrl+Z)">
                    Undo
                  </Button>
                  <Button variant="secondary" onClick={handleRedo} disabled={!canRedo} title="Redo (Ctrl+Shift+Z)">
                    Redo
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-(--lithos-text) opacity-70">
                  Data Transfer
                </p>
                <div className="flex flex-col space-y-3">
                  <Button variant="secondary" onClick={handleExportJSON}>
                    Export configuration
                  </Button>
                  <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                    Import configuration
                  </Button>
                  <input type="file" ref={fileInputRef} onChange={handleImportJSON} accept=".json" className="hidden" />
                </div>
              </div>

              <div className="mt-4 pt-6 border-t border-(--lithos-border)">
                <Button variant="primary" onClick={handleReset}>
                  Reset all values
                </Button>
              </div>
            </div>
          </div>

          {/* PANEL 2: DESIGN TOKENS */}
          <div className="flex flex-col min-w-0 w-full lg:w-[340px] h-full overflow-hidden bg-(--lithos-bg) border-b lg:border-b-0 lg:border-r-2 border-(--lithos-border) shrink-0">
            <div className="h-14 px-6 border-b-2 border-(--lithos-border) sticky top-0 bg-(--lithos-bg) z-10 flex items-center justify-between shrink-0">
              <h2 className="text-sm font-bold tracking-tight">Design Tokens</h2>
            </div>

            <div className="p-4 space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-(--lithos-text) opacity-70 mb-2">
                Color Palette
              </p>
              <div className="flex flex-col space-y-1.5">
                {colorProps.map((prop) => (
                  <PropertyControl
                    property={prop}
                    value={currentValues[prop.key] ?? defaults[prop.key] ?? ''}
                    onChange={handleChange}
                  />
                ))}
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-(--lithos-text) opacity-70 mb-2">
                  Geometry
                </p>
                <div className="flex flex-col space-y-1.5 pb-2">
                  {geometryProps.map((prop) => (
                    <div
                      key={prop.key}
                      className="border border-(--lithos-border) p-2 bg-(--lithos-surface) rounded-(--lithos-radius)"
                    >
                      <PropertyControl
                        property={prop}
                        value={currentValues[prop.key] ?? defaults[prop.key] ?? ''}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 3: STAGE */}
          <div className="flex flex-col min-w-0 flex-1 h-full overflow-hidden bg-(--lithos-surface)">
            <div className="h-14 px-8 border-b-2 border-(--lithos-border) shrink-0 bg-(--lithos-bg) flex items-end">
              <Tabs
                value={stageTab}
                onValueChange={(val) => setStageTab(val as StageTab)}
                variant="underline"
                className="w-full flex-row items-center"
              >
                <TabsList className="space-x-8 p-0">
                  {STAGE_TABS.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-8 relative bg-(--lithos-surface)">
              {stageTab === 'preview' && (
                <div
                  className={`h-full w-full rounded-none overflow-hidden border border-(--lithos-border) bg-(--lithos-bg) ${previewMode === 'dark' ? 'obsidian' : ''}`}
                  style={previewStyle}
                >
                  <SpecimenGrid style={previewStyle} />
                </div>
              )}

              {stageTab === 'code' && (
                <div className="max-w-5xl h-full flex flex-col space-y-4">
                  <h3 className="text-lg font-bold tracking-tight">Generated CSS</h3>
                  <CodeViewer code={generatedCSS} language="css" />
                </div>
              )}

              {stageTab === 'swatches' && (
                <div className="max-w-6xl mx-auto w-full space-y-10">
                  <h3 className="text-lg font-bold tracking-tight">Token Swatches</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 space-x-4 space-y-4">
                    {THEME_PROPERTIES.map((prop) => {
                      const val = currentValues[prop.key] ?? defaults[prop.key] ?? ''
                      return (
                        <div
                          key={prop.key}
                          className="border border-(--lithos-border) bg-(--lithos-bg) flex flex-col rounded-(--lithos-radius) overflow-hidden shadow-sm transition-shadow hover:shadow-md"
                        >
                          <div
                            className="h-32 w-full flex items-center justify-center border-b border-(--lithos-border)"
                            style={{
                              backgroundColor:
                                val.startsWith('rgba') || val.startsWith('#') ? val : 'var(--lithos-surface)',
                            }}
                          >
                            <span className="text-xs font-mono font-medium bg-(--lithos-bg)/80 backdrop-blur-sm text-(--lithos-text) px-2.5 py-1 rounded-md border border-(--lithos-border) shadow-sm">
                              {val}
                            </span>
                          </div>

                          <div className="p-3.5 flex flex-col gap-0.5">
                            <p className="text-sm font-semibold tracking-tight text-(--lithos-text)">{prop.label}</p>
                            <code className="text-[11px] font-mono text-(--lithos-text)/70 truncate">{prop.key}</code>
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
