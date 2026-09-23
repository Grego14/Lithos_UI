import { type PackageManager } from '../../core/useInstallPreference'

export const getCliCommand = (packageManager: PackageManager, componentNames: string[] | string): string => {
  // If it's an array, join them with spaces (future-proofing for v2 multi-component installation)
  const names = Array.isArray(componentNames) ? componentNames.join(' ') : componentNames
  const lowerNames = names.toLowerCase()

  switch (packageManager) {
    case 'npm':
      return `npx lithos-ui add ${lowerNames}`
    case 'pnpm':
      return `pnpm dlx lithos-ui add ${lowerNames}`
    case 'yarn':
      return `yarn dlx lithos-ui add ${lowerNames}`
    case 'bun':
      return `bunx lithos-ui add ${lowerNames}`
    default:
      return `npx lithos-ui add ${lowerNames}`
  }
}
