export type ManualPath = string | Record<string, string | string[]>

interface DeriveImportOptions {
  componentNames: string[]
  types?: string[]
  manualPath: ManualPath
  mode: 'command' | 'manual'
}

export const deriveImportLines = ({ componentNames, types = [], manualPath, mode }: DeriveImportOptions): string => {
  const typeSet = new Set(types)
  const groups: Record<string, { path: string; values: string[]; types: string[] }> = {}

  // map manualPath explicit names if is a Record
  const customPathMap = new Map<string, string>()

  if (typeof manualPath === 'object' && manualPath !== null) {
    Object.entries(manualPath).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((name) => customPathMap.set(name, key))
      }
    })
  }

  componentNames.forEach((name) => {
    let path: string | null | undefined

    // e.g: manualPath = { react: ['useState'] }
    if (customPathMap.has(name)) {
      path = customPathMap.get(name)
    } else if (mode === 'command') {
      path = 'lithos-ui'
    } else if (typeof manualPath === 'string') {
      path = manualPath
    }

    // direct key-value map or fallback to 'others'
    else {
      const pathValue = manualPath[name] || manualPath['others']
      path = typeof pathValue === 'string' ? pathValue : null
    }

    if (!path) return

    if (!groups[path]) {
      groups[path] = { path, values: [], types: [] }
    }

    if (typeSet.has(name)) {
      groups[path]?.types.push(name)
    } else {
      groups[path]?.values.push(name)
    }
  })

  return Object.values(groups)
    .map(({ path, values, types: groupTypes }) => {
      const typeItems = groupTypes.map((t) => `type ${t}`)
      const allImports = [...values, ...typeItems]

      if (allImports.length === 0) return ''
      return `import { ${allImports.join(', ')} } from '${path}'`
    })
    .filter(Boolean)
    .join('\n')
}

export interface UsageCodeConfig {
  body: string
  componentNames: string[]
  types?: string[]
  manualPath: ManualPath
}

export const deriveUsageCode = (config: UsageCodeConfig, mode: 'command' | 'manual'): string => {
  const { componentNames, types = [], manualPath, body } = config

  const importLines = deriveImportLines({
    componentNames,
    types,
    manualPath,
    mode,
  })

  return `${importLines}\n\n${body}`
}
