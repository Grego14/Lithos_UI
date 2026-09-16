export type PropertyType = 'color' | 'range' | 'opacity'

export interface ThemeProperty {
  key: string
  label: string
  section: 'colors' | 'geometry' | 'shadow'
  type: PropertyType
  min?: number
  max?: number
  step?: number
  unit?: string
}

export interface ThemePreset {
  id: string
  name: string
  mode: 'light' | 'dark'
  values: Record<string, string>
}

export interface ThemeBuilderProps {
  isDarkMode: boolean
  toggleObsidian: () => void
}
