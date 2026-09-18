/**
 * @fileoverview TypeScript definitions and interfaces used across the Theme Builder.
 * Defines the shapes for theme tokens, history states, and property controls.
 */
export type PropertyType = 'color' | 'range' | 'opacity' | 'shadow'

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
