import { useState } from 'react'

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'
export type InstallTab = 'command' | 'manual'

export const useInstallPreference = () => {
  const [installTab, setInstallTab] = useState<InstallTab>(() => {
    return (localStorage.getItem('lithos-install-tab') as InstallTab) || 'command'
  })

  const [packageManager, setPackageManager] = useState<PackageManager>(() => {
    return (localStorage.getItem('lithos-package-manager') as PackageManager) || 'pnpm'
  })

  const updateInstallTab = (tab: InstallTab) => {
    setInstallTab(tab)
    localStorage.setItem('lithos-install-tab', tab)
  }

  const updatePackageManager = (pm: PackageManager) => {
    setPackageManager(pm)
    localStorage.setItem('lithos-package-manager', pm)
  }

  return { installTab, updateInstallTab, packageManager, updatePackageManager } as const
}
