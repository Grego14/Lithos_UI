/**
 * @fileoverview Utility functions for the Theme Builder.
 * Includes helpers for color manipulation, CSS generation, and string formatting.
 */
export const parseRgba = (value: string): { r: number; g: number; b: number; a: number } | null => {
  const match = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/)
  if (!match) return null
  return {
    r: +match[1]!,
    g: +match[2]!,
    b: +match[3]!,
    a: match[4] !== undefined ? +match[4]! : 1,
  }
}

export const rgbToHex = (r: number, g: number, b: number): string =>
  '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return null
  return {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16),
  }
}

export const parseNumericValue = (value: string): number => parseFloat(value) || 0
