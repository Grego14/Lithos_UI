import { useState, useEffect } from 'react'

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'
export type InstallTab = 'command' | 'manual'

export const useInstallPreference = () => {
  const [installTab, setInstallTab] = useState<InstallTab>(() => {
    return (localStorage.getItem('lithos-install-tab') as InstallTab) || 'command'
  })

  const [packageManager, setPackageManager] = useState<PackageManager>(() => {
    return (localStorage.getItem('lithos-package-manager') as PackageManager) || 'pnpm'
  })

  useEffect(() => {
    const handlePrefChange = () => {
      setInstallTab((localStorage.getItem('lithos-install-tab') as InstallTab) || 'command')
      setPackageManager((localStorage.getItem('lithos-package-manager') as PackageManager) || 'pnpm')
    }

    window.addEventListener('lithos-pref-change', handlePrefChange)
    return () => window.removeEventListener('lithos-pref-change', handlePrefChange)
  }, [])

  const updateInstallTab = (tab: InstallTab) => {
    localStorage.setItem('lithos-install-tab', tab)
    setInstallTab(tab)
    window.dispatchEvent(new Event('lithos-pref-change'))
  }

  const updatePackageManager = (pm: PackageManager) => {
    localStorage.setItem('lithos-package-manager', pm)
    setPackageManager(pm)
    window.dispatchEvent(new Event('lithos-pref-change'))
  }

  return { installTab, updateInstallTab, packageManager, updatePackageManager } as const
}
