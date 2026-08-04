/**
 * @fileoverview Lithos UI - Root Application Shell
 *
 * Minimal architectural shell responsible for:
 * - Theme state management via useTheme hook
 * - Dynamic theming class application
 * - Routing configuration via React Router
 * - Component composition (Showroom, NotFound routes)
 */

import { AvatarDoc } from './docs/pages/Avatar'
import { BadgeDoc } from './docs/pages/Badge'
import { BlockPreviewPage } from './pages/BlockPreviewPage'
import { BlocksIndex } from './pages/BlocksIndex'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ButtonDoc } from './docs/pages/Button'
import { CardDoc } from './docs/pages/Card'
import { CodeViewerDoc } from './docs/pages/CodeViewer'
import { ComingSoon } from './components/layout/ComingSoon'
import { ComponentsIndex } from './pages/ComponentsIndex'
import { DocsLayout } from './docs/DocsLayout'
import { Faq } from './pages/Faq'
import { Installation } from './docs/pages/Installation'
import { Introduction } from './docs/pages/Introduction'
import { NotFound } from './components/layout/NotFound'
import { PreviewBlockDoc } from './docs/pages/PreviewBlock'
import { Showroom } from './showroom/Index'
import { ToastDoc } from './docs/pages/Toast'
import { ToggleDoc } from './docs/pages/Toggle'
import { useEffect } from 'react'
import { useTheme } from './core/useTheme'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const renderDocRoutes = (isDarkMode: boolean, toggleObsidian: () => void) => {
  const docPages = [
    { path: '', component: Introduction },
    { path: 'avatar', component: AvatarDoc },
    { path: 'badge', component: BadgeDoc },
    { path: 'button', component: ButtonDoc },
    { path: 'card', component: CardDoc },
    { path: 'code-viewer', component: CodeViewerDoc },
    { path: 'installation', component: Installation },
    { path: 'preview-block', component: PreviewBlockDoc },
    { path: 'toast', component: ToastDoc },
    { path: 'toggle', component: ToggleDoc },
  ]

  return docPages.map(({ path, component: Component }) => (
    <Route
      key={path || 'index'}
      path={`/docs${path ? `/${path}` : ''}`}
      element={
        <DocsLayout isDarkMode={isDarkMode} toggleObsidian={toggleObsidian}>
          <Component />
        </DocsLayout>
      }
    />
  ))
}

/**
 * App Component - Orchestrates theme state, routing, and renders application UI.
 *
 * Routing structure:
 * - "/" → Showroom (main landing page)
 * - "*" → NotFound (catch-all for undefined routes)
 */
const App = () => {
  const { isDarkMode, toggleObsidian, accentColor, updateAccentColor } = useTheme()

  return (
    <div className={'min-h-screen bg-(--lithos-bg) text-(--lithos-text) ' + (isDarkMode ? 'dark obsidian' : '')}>
      {/* Theme hook is mounted at the app root so accent persistence applies on every route. */}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Showroom isDarkMode={isDarkMode} toggleObsidian={toggleObsidian} accentColor={accentColor} updateAccentColor={updateAccentColor} />} />

          <Route
            path="/blocks"
            element={
              <BlocksIndex
                isDarkMode={isDarkMode}
                toggleObsidian={toggleObsidian}
              />
            }
          />
          <Route path="/blocks/preview/:slug" element={<BlockPreviewPage />} />
          <Route
            path="/coming-soon"
            element={
              <ComingSoon
                eyebrow="ACTIVE ENGINEERING ZONE"
                title="Work In Progress"
                description="Lithos UI is an open-source architecture, and developers are actively encouraged to contribute code to engineer this structural block."
                primaryAction={{ label: 'Go to Docs', to: '/docs' }}
                secondaryAction={{ label: 'Contribute Code', href: 'https://github.com/lithosui/Lithos_UI/issues' }}
              />
            }
          />
          <Route path="/components" element={<ComponentsIndex isDarkMode={isDarkMode} toggleObsidian={toggleObsidian} />} />

          {/* Completed Documentation Shells */}
          {renderDocRoutes(isDarkMode, toggleObsidian)}

          <Route path="/faq" element={<Faq isDarkMode={isDarkMode} toggleObsidian={toggleObsidian} />} />
          <Route
            path="/templates"
            element={
              <ComingSoon
                eyebrow="Coming Soon"
                title="TEMPLATES"
                description="Full page scaffolds built entirely from the Blocks library. Ships once Blocks is live."
                primaryAction={{ label: 'Go to Docs', to: '/docs' }}
              />
            }
          />

          {/* Structural Failure Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export { App }
