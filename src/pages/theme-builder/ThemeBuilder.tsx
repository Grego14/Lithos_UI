/**
 * @fileoverview Lithos UI Theme Studio page.
 * - Full-viewport (100vh) studio workbench, no page-level scroll.
 * - Three horizontal panels — Actions / Tokens / Stage — sized 2 : 3 : 9.
 * - Each panel scrolls independently when its content overflows.
 * - Complete preset selector, undo/redo, JSON import/export, and live token evaluation.
 */

import { Navbar } from '../../showroom/sections/Navbar'
import { Button } from '../../components/ui/Button'
import { Toggle } from '../../components/ui/Toggle'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { THEME_PROPERTIES, PRESET_THEMES, PANEL } from './constants'
import { useThemeHistory } from './useThemeHistory'
import { PropertyControl } from './PropertyControl'
import { SpecimenGrid } from './SpecimenGrid'
import type { ThemeBuilderProps } from './types'
import { Footer } from '../../showroom/sections/Footer'
import { Select } from '../../components/ui/Select'
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/Tabs'

type StageTab = 'preview' | 'code' | 'swatches'

const STAGE_TABS: { id: StageTab; label: string }[] = [
  { id: 'preview', label: 'Live components' },
  { id: 'code', label: 'Generated CSS' },
  { id: 'swatches', label: 'Token swatches' },
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

      <main className="h-screen pt-20 flex flex-col overflow-hidden bg-(--lithos-bg) text-(--lithos-text)">
        <div className="flex-1 min-h-0 grid grid-cols-[1fr_3fr_9fr]">
          <div className={`${PANEL} rounded-none border-t-0 border-l-0 flex flex-col min-w-0 h-full overflow-y-auto`}>
            <div className="px-4 py-4 border-b border-(--lithos-border)/15">
              <h2 className="text-sm font-semibold">Actions</h2>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div>
                <p className="text-xs font-medium opacity-50 mb-2">Mode</p>
                <div className="flex items-center gap-2">
                  <Toggle checked={previewMode === 'dark'} onToggle={handleTogglePreviewMode} label="Toggle mode" />
                  <span className="text-sm">{previewMode === 'dark' ? 'Obsidian' : 'Light'}</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium opacity-50 mb-2">Preset</p>
                <Select
                  placeholder="Load preset..."
                  onChange={(val) => handlePresetSelect(val as string)}
                  options={PRESET_THEMES.map((preset) => ({
                    label: preset.name,
                    value: preset.id,
                  }))}
                />
              </div>
              <div>
                <p className="text-xs font-medium opacity-50 mb-2">History</p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="secondary"
                    onClick={handleUndo}
                    disabled={!canUndo}
                    title="Undo (Ctrl+Z)"
                    className="w-full px-3 py-1.5 text-xs"
                  >
                    Undo
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleRedo}
                    disabled={!canRedo}
                    title="Redo (Ctrl+Shift+Z)"
                    className="w-full px-3 py-1.5 text-xs"
                  >
                    Redo
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium opacity-50 mb-2">Import / export</p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="secondary"
                    onClick={handleExportJSON}
                    title="Export JSON"
                    className="w-full px-3 py-1.5 text-xs"
                  >
                    Export
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    title="Import JSON"
                    className="w-full px-3 py-1.5 text-xs"
                  >
                    Import
                  </Button>
                  <input type="file" ref={fileInputRef} onChange={handleImportJSON} accept=".json" className="hidden" />
                </div>
              </div>
              <Button variant="accent" onClick={handleReset} className="w-full px-3 py-1.5 text-xs">
                Reset
              </Button>
            </div>
          </div>

          <div className={`${PANEL} rounded-none border-t-0 flex flex-col min-w-0 h-full overflow-y-auto`}>
            <div className="px-5 py-4 border-b border-(--lithos-border)/15 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Tokens</h2>
              <span className="text-xs opacity-50">{THEME_PROPERTIES.length} variables</span>
            </div>

            <div className="px-5 py-1">
              <p className="text-xs font-medium opacity-50 pt-3">Color</p>
              <div className="divide-y divide-(--lithos-border)/10">
                {colorProps.map((prop) => (
                  <PropertyControl
                    key={prop.key}
                    property={prop}
                    value={currentValues[prop.key] ?? defaults[prop.key] ?? ''}
                    onChange={handleChange}
                  />
                ))}
              </div>

              <p className="text-xs font-medium opacity-50 pt-3 mt-2 border-t border-(--lithos-border)/10">Geometry</p>
              <div className="divide-y divide-(--lithos-border)/10 pb-4">
                {geometryProps.map((prop) => (
                  <PropertyControl
                    key={prop.key}
                    property={prop}
                    value={currentValues[prop.key] ?? defaults[prop.key] ?? ''}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={`${PANEL} rounded-none border-t-0 border-r-0 flex flex-col min-w-0 h-full overflow-hidden`}>
            <div className="px-5 pt-4 border-b border-(--lithos-border)/15 shrink-0">
              <Tabs value={stageTab} onValueChange={(val) => setStageTab(val as StageTab)} variant="underline">
                <TabsList className="gap-6">
                  {STAGE_TABS.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="px-0 pb-3 text-sm opacity-50 data-[state=active]:opacity-100 transition-colors border-b-2 data-[state=inactive]:border-transparent"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="p-5 flex-1 min-h-0 overflow-y-auto">
              {stageTab === 'preview' && (
                <div className={previewMode === 'dark' ? 'obsidian' : ''}>
                  <SpecimenGrid style={previewStyle} />
                </div>
              )}

              {stageTab === 'code' && (
                <div className="space-y-3">
                  <p className="text-sm opacity-60 m-0">
                    Copy this CSS block directly into your project's stylesheet or root layout.
                  </p>
                  <CodeViewer code={generatedCSS} language="css" showLanguage className="mb-0" />
                </div>
              )}

              {stageTab === 'swatches' && (
                <div className="space-y-4">
                  <p className="text-sm opacity-60">Visual color and geometry token evaluation.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {THEME_PROPERTIES.map((prop) => {
                      const val = currentValues[prop.key] ?? defaults[prop.key] ?? ''
                      return (
                        <div key={prop.key} className="border border-(--lithos-border)/15 rounded-lg overflow-hidden">
                          <div
                            className="h-14 flex items-center justify-center font-code text-xs"
                            style={{
                              backgroundColor: val.startsWith('rgba') || val.startsWith('#') ? val : 'var(--lithos-bg)',
                            }}
                          >
                            {val}
                          </div>
                          <div className="p-2.5">
                            <p className="text-xs font-medium m-0">{prop.label}</p>
                            <code className="text-[10px] font-code opacity-50 block mt-0.5">{prop.key}</code>
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
