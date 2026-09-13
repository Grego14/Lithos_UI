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
        {/* Strict monolithic grid with sharp 0px border divisions */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[280px_340px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-(--lithos-border)">
          {/* PANEL 1: CONFIGURATION */}
          <div className="flex flex-col min-w-0 h-full overflow-y-auto bg-(--lithos-surface)">
            <div className="px-6 py-4 border-b border-(--lithos-border) sticky top-0 bg-(--lithos-surface) z-10 flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-tight">Configuration</h2>
            </div>

            <div className="p-6 flex flex-col gap-8">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-(--lithos-text) opacity-70">
                  Workspace
                </p>
                <div className="flex items-center justify-between p-1 border border-(--lithos-border) bg-(--lithos-bg) rounded-none">
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
                <div className="border border-(--lithos-border) rounded-none bg-(--lithos-bg)">
                  <Select
                    placeholder="Select preset..."
                    onChange={(val) => handlePresetSelect(val as string)}
                    options={PRESET_THEMES.map((preset) => ({
                      label: preset.name,
                      value: preset.id,
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-(--lithos-text) opacity-70">
                  Timeline
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={handleUndo}
                    disabled={!canUndo}
                    title="Undo (Ctrl+Z)"
                    className="flex-1 rounded-none border border-(--lithos-border)"
                  >
                    Undo
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleRedo}
                    disabled={!canRedo}
                    title="Redo (Ctrl+Shift+Z)"
                    className="flex-1 rounded-none border border-(--lithos-border)"
                  >
                    Redo
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-(--lithos-text) opacity-70">
                  Data Transfer
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="secondary"
                    onClick={handleExportJSON}
                    className="w-full justify-start rounded-none border border-(--lithos-border)"
                  >
                    Export configuration
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full justify-start rounded-none border border-(--lithos-border)"
                  >
                    Import configuration
                  </Button>
                  <input type="file" ref={fileInputRef} onChange={handleImportJSON} accept=".json" className="hidden" />
                </div>
              </div>

              <div className="mt-4 pt-6 border-t border-(--lithos-border)">
                <Button variant="primary" onClick={handleReset} className="w-full text-sm font-bold rounded-none">
                  Reset all values
                </Button>
              </div>
            </div>
          </div>

          {/* PANEL 2: DESIGN TOKENS */}
          <div className="flex flex-col min-w-0 h-full overflow-hidden bg-(--lithos-bg)">
            <div className="px-6 py-4 border-b border-(--lithos-border) sticky top-0 bg-(--lithos-bg) z-10 flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-tight">Design Tokens</h2>
              <span className="text-xs font-medium bg-(--lithos-surface) border border-(--lithos-border) px-2 py-1">
                {THEME_PROPERTIES.length} variables
              </span>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-(--lithos-text) opacity-70 mb-2">
                  Color Palette
                </p>
                <div className="flex flex-col gap-1.5">
                  {colorProps.map((prop) => (
                    <div
                      key={prop.key}
                      className="border border-(--lithos-border) p-2 bg-(--lithos-surface) rounded-none"
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

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-(--lithos-text) opacity-70 mb-2">
                  Geometry
                </p>
                <div className="flex flex-col gap-1.5 pb-2">
                  {geometryProps.map((prop) => (
                    <div
                      key={prop.key}
                      className="border border-(--lithos-border) p-2 bg-(--lithos-surface) rounded-none"
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
          <div className="flex flex-col min-w-0 h-full overflow-hidden bg-(--lithos-surface)">
            <div className="px-8 pt-4 border-b border-(--lithos-border) shrink-0 bg-(--lithos-bg)">
              <Tabs value={stageTab} onValueChange={(val) => setStageTab(val as StageTab)} variant="underline">
                <TabsList className="gap-8 bg-transparent p-0 border-none">
                  {STAGE_TABS.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="px-1 pb-4 text-sm font-semibold border-b-2 border-transparent data-[state=active]:border-(--lithos-text) data-[state=active]:text-(--lithos-text) text-(--lithos-text) opacity-60 data-[state=active]:opacity-100 rounded-none transition-none"
                    >
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
                >
                  <SpecimenGrid style={previewStyle} />
                </div>
              )}

              {stageTab === 'code' && (
                <div className="max-w-5xl h-full flex flex-col space-y-4">
                  <div className="flex items-center justify-between border-b border-(--lithos-border) pb-4">
                    <h3 className="text-lg font-bold tracking-tight">Generated CSS</h3>
                  </div>
                  <div className="flex-1 rounded-none overflow-hidden border border-(--lithos-border)">
                    <CodeViewer code={generatedCSS} language="css" className="h-full" />
                  </div>
                </div>
              )}

              {stageTab === 'swatches' && (
                <div className="max-w-6xl mx-auto w-full">
                  <div className="mb-8 border-b border-(--lithos-border) pb-4">
                    <h3 className="text-lg font-bold tracking-tight">Token Swatches</h3>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {THEME_PROPERTIES.map((prop) => {
                      const val = currentValues[prop.key] ?? defaults[prop.key] ?? ''
                      return (
                        <div
                          key={prop.key}
                          className="border border-(--lithos-border) bg-(--lithos-bg) flex flex-col rounded-none"
                        >
                          <div
                            className="h-24 flex items-center justify-center border-b border-(--lithos-border)"
                            style={{
                              backgroundColor:
                                val.startsWith('rgba') || val.startsWith('#') ? val : 'var(--lithos-surface)',
                            }}
                          >
                            <span className="text-xs font-mono font-bold bg-(--lithos-bg) text-(--lithos-text) px-2 py-1 border border-(--lithos-border)">
                              {val}
                            </span>
                          </div>
                          <div className="p-4">
                            <p className="text-sm font-bold tracking-tight">{prop.label}</p>
                            <code className="text-[11px] font-mono text-(--lithos-text) opacity-70 mt-1 block">
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
