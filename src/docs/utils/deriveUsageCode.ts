export type ManualPath = string | Record<string, string>

export const deriveImportLines = (
  componentNames: string[],
  manualPath: ManualPath,
  mode: 'command' | 'manual'
): string => {
  if (mode === 'command') {
    return `import { ${componentNames.join(', ')} } from 'lithos-ui'`
  }
  if (typeof manualPath === 'string') {
    return `import { ${componentNames.join(', ')} } from '${manualPath}'`
  }
  return componentNames.map((name) => `import { ${name} } from '${manualPath[name]}'`).join('\n')
}

export const deriveUsageCode = (
  componentNames: string[],
  manualPath: ManualPath,
  body: string,
  mode: 'command' | 'manual'
): string => {
  return `${deriveImportLines(componentNames, manualPath, mode)}\n\n${body}`
}
