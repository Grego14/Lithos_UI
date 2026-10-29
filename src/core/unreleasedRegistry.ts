/**
 * @fileoverview Lithos UI Unreleased Components Registry.
 *
 * Tracks components that are implemented in the repository and docs
 * but have not yet been published to the npm/pnpm package registry.
 * Used to display badges in navigation and alert tickers on documentation pages.
 */

export interface UnreleasedComponentEntry {
  slug: string
  name: string
  badgeLabel: string
  warningMessage: string
  releaseTarget?: string
}

export const UNRELEASED_COMPONENTS: string[] = ['slider', 'marquee']

export const UNRELEASED_REGISTRY: Record<string, UnreleasedComponentEntry> = {
  slider: {
    slug: 'slider',
    name: 'Slider',
    badgeLabel: 'NEW',
    warningMessage: 'UNRELEASED COMPONENT · DO NOT USE YET · THIS COMPONENT IS YET TO BE RELEASED ⚠',
  },
  marquee: {
    slug: 'marquee',
    name: 'Marquee',
    badgeLabel: 'NEW',
    warningMessage: 'UNRELEASED COMPONENT · DO NOT USE YET · THIS COMPONENT IS YET TO BE RELEASED ⚠',
  },
}

/**
 * Checks whether a given component slug or name is currently unreleased on npm.
 */
export const isUnreleasedComponent = (identifier?: string): boolean => {
  if (!identifier) return false
  const normalized = identifier.toLowerCase().trim().replaceAll(' ', '-')
  return UNRELEASED_COMPONENTS.includes(normalized)
}

/**
 * Retrieves unreleased metadata for a component if applicable.
 */
export const getUnreleasedComponentInfo = (identifier?: string): UnreleasedComponentEntry | undefined => {
  if (!identifier) return undefined
  const normalized = identifier.toLowerCase().trim().replaceAll(' ', '-')
  return UNRELEASED_REGISTRY[normalized]
}
