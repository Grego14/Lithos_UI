const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

// __brand doesn't exist at runtime; it just blocks plain strings from being assigned without going through isHexColor
export type HexColor = string & { readonly __brand: 'HexColor' }

export function isHexColor(value: string): value is HexColor {
  return HEX_COLOR_PATTERN.test(value)
}