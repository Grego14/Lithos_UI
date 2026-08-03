/**
 * @fileoverview Lithos UI documentation shell.
 * - Fixed-pane architecture: sidebars lock, main stage scrolls independently.
 * - Footer extracted to the bottom of the page, outside the grid.
 * - Root shell uses flexbox to push footer down when content is short.
 * - No gap utilities; spacing via px and py utilities on grid items.
 */

import { useLocation } from 'react-router-dom'
import { DocsNavbar as Navbar } from './layout/Navbar'
import { Sidebar } from './layout/Sidebar'
import { TableOfContents } from './layout/TableOfContents'
import { Footer } from '../components/layout/Footer'
import type { ReactNode } from 'react'
import type { TOCItem } from './types.ts'

const tocRegistry: Record<string, TOCItem[]> = {
  '/docs': [{ id: '#welcome-video', label: 'Intro To Lithos UI', level: 1 }],
  '/docs/installation': [
    { id: '#base-template', label: '1. The Base Template', level: 1 },
    { id: '#global-css', label: '2. Global CSS Configuration', level: 1 },
  ],
  '/docs/hero': [
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
  ],
  '/docs/code-viewer': [
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
  ],
  '/docs/preview-block': [
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
  ],
  '/docs/toast': [
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
  ],
  '/docs/toggle': [
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
  ],
  '/docs/button': [
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
    { id: '#secondary', label: 'Secondary', level: 2 },
    { id: '#text', label: 'Text', level: 2 },
  ],
  '/docs/card': [
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
    { id: '#accent', label: 'Accent', level: 2 },
    { id: '#spacing', label: 'Spacing', level: 2 },
    { id: '#image', label: 'Image', level: 2 },
  ],
  '/docs/badge': [
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#variants', label: 'Variants', level: 2 },
    { id: '#sizes', label: 'Sizes', level: 2 },
    { id: '#custom-color', label: 'Custom color', level: 2 },
  ],
}

interface DocsLayoutProps {
  children: ReactNode
  isDarkMode: boolean
  toggleObsidian: () => void
}

export const DocsLayout = ({ children, isDarkMode, toggleObsidian }: DocsLayoutProps) => {
  const location = useLocation()
  const currentTOC = tocRegistry[location.pathname] ?? []

  return (
    <div className="min-h-screen flex flex-col bg-(--lithos-bg) text-(--lithos-text)">
      <Navbar />

      <div className="flex-1 w-full max-w-screen-2xl mx-auto grid grid-cols-12 pt-24 items-start">
        <div className="hidden lg:block lg:col-span-2 sticky top-32">
          <div className="max-h-[calc(100vh-10rem)] pb-6 overflow-y-auto sidebar-scroll">
            <Sidebar />
          </div>
        </div>

        <main className="col-span-12 lg:col-span-10 xl:col-span-8 px-6 lg:px-12 py-12">{children}</main>

        <div className="hidden xl:block xl:col-span-2 sticky top-32">
          <div className="max-h-[calc(100vh-10rem)] pb-6 overflow-y-auto sidebar-scroll">
            <TableOfContents links={currentTOC} />
          </div>
        </div>
      </div>

      <div className="w-full">
        <Footer isDarkMode={isDarkMode} onToggleObsidian={toggleObsidian} />
      </div>
    </div>
  )
};
