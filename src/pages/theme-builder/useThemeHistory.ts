import { useState, useCallback, useMemo, useEffect, useRef, type ChangeEvent } from 'react'
import { THEME_PROPERTIES, LIGHT_DEFAULTS, DARK_DEFAULTS, PRESET_THEMES } from './constants'

export const useThemeHistory = () => {
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light')
  const [stageTab, setStageTab] = useState<'preview' | 'code' | 'swatches'>('preview')
  const defaults = previewMode === 'dark' ? DARK_DEFAULTS : LIGHT_DEFAULTS

  const [history, setHistory] = useState<Record<string, string>[]>([{ ...LIGHT_DEFAULTS }])
  const [historyIndex, setHistoryIndex] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentValues = useMemo(() => history[historyIndex] ?? defaults, [history, historyIndex, defaults])

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  const pushState = useCallback(
    (newValues: Record<string, string>) => {
      setHistory((prev) => {
        const nextHistory = prev.slice(0, historyIndex + 1)
        return [...nextHistory, newValues]
      })
      setHistoryIndex((prev) => prev + 1)
    },
    [historyIndex]
  )

  const handleChange = useCallback(
    (key: string, value: string) => {
      const updated = { ...currentValues, [key]: value }
      pushState(updated)
    },
    [currentValues, pushState]
  )

  const handleUndo = useCallback(() => {
    if (canUndo) setHistoryIndex((prev) => prev - 1)
  }, [canUndo])

  const handleRedo = useCallback(() => {
    if (canRedo) setHistoryIndex((prev) => prev + 1)
  }, [canRedo])

  const handleReset = useCallback(() => {
    pushState({ ...defaults })
  }, [defaults, pushState])

  const handlePresetSelect = useCallback(
    (presetId: string) => {
      const preset = PRESET_THEMES.find((p) => p.id === presetId)
      if (preset) {
        setPreviewMode(preset.mode)
        pushState({ ...preset.values })
      }
    },
    [pushState]
  )

  const handleTogglePreviewMode = useCallback(() => {
    const nextMode = previewMode === 'light' ? 'dark' : 'light'
    setPreviewMode(nextMode)
    const nextDefaults = nextMode === 'dark' ? DARK_DEFAULTS : LIGHT_DEFAULTS
    pushState({ ...nextDefaults })
  }, [previewMode, pushState])

  // JSON Export / Import
  const handleExportJSON = useCallback(() => {
    const data = {
      mode: previewMode,
      values: currentValues,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lithos-theme-${previewMode}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [previewMode, currentValues])

  const handleImportJSON = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string)
          if (json && typeof json === 'object' && json.values) {
            if (json.mode === 'light' || json.mode === 'dark') {
              setPreviewMode(json.mode)
            }
            const validValues: Record<string, string> = {}
            for (const prop of THEME_PROPERTIES) {
              if (json.values[prop.key]) {
                validValues[prop.key] = String(json.values[prop.key])
              }
            }
            pushState({ ...defaults, ...validValues })
          }
        } catch (err) {
          console.error('Failed to parse theme JSON:', err)
        }
      }
      reader.readAsText(file)
      e.target.value = ''
    },
    [defaults, pushState]
  )

  // Global Keyboard Shortcuts (Ctrl+Z / Ctrl+Y / Cmd+Z / Cmd+Shift+Z)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey
      if (isCtrlOrCmd && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault()
          handleRedo()
        } else {
          e.preventDefault()
          handleUndo()
        }
      } else if (isCtrlOrCmd && e.key.toLowerCase() === 'y') {
        e.preventDefault()
        handleRedo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleUndo, handleRedo])

  // Build inline style for preview
  const previewStyle = useMemo(() => {
    const style: Record<string, string> = {}
    for (const prop of THEME_PROPERTIES) {
      style[prop.key] = currentValues[prop.key] ?? defaults[prop.key] ?? ''
    }

    // Auto-generate composite shadow variable for backwards compatibility
    const shadowColor = currentValues['--lithos-shadow-color'] ?? defaults['--lithos-shadow-color'] ?? '#000000'
    const shadowOpacity = currentValues['--lithos-shadow-opacity'] ?? defaults['--lithos-shadow-opacity'] ?? '100%'
    style['--lithos-shadow'] = `color-mix(in srgb, ${shadowColor} ${shadowOpacity}, transparent)`

    return style as React.CSSProperties
  }, [currentValues, defaults])

  // Generate CSS output
  const generatedCSS = useMemo(() => {
    const selector = previewMode === 'dark' ? '.obsidian,\nbody.obsidian' : ':root'
    const lines = THEME_PROPERTIES.map((prop) => {
      const val = currentValues[prop.key] ?? defaults[prop.key] ?? ''
      return `  ${prop.key}: ${val};`
    })

    const shadowColor = currentValues['--lithos-shadow-color'] ?? defaults['--lithos-shadow-color'] ?? '#000000'
    const shadowOpacity = currentValues['--lithos-shadow-opacity'] ?? defaults['--lithos-shadow-opacity'] ?? '100%'
    lines.push(`  --lithos-shadow: color-mix(in srgb, ${shadowColor} ${shadowOpacity}, transparent);`)

    return `${selector} {\n${lines.join('\n')}\n}`
  }, [currentValues, defaults, previewMode])

  // Group properties by section
  const colorProps = THEME_PROPERTIES.filter((p) => p.section === 'colors')
  const geometryProps = THEME_PROPERTIES.filter((p) => p.section === 'geometry')
  const shadowProps = THEME_PROPERTIES.filter((p) => p.section === 'shadow')

  return {
    // Mode & tabs
    previewMode,
    stageTab,
    setStageTab,
    defaults,

    // Values
    currentValues,
    colorProps,
    geometryProps,
    shadowProps,

    // History
    canUndo,
    canRedo,
    handleChange,
    handleUndo,
    handleRedo,
    handleReset,

    // Presets
    handlePresetSelect,
    handleTogglePreviewMode,

    // Import / Export
    fileInputRef,
    handleExportJSON,
    handleImportJSON,

    // Computed
    previewStyle,
    generatedCSS,
  }
}
