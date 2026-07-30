/**
 * @fileoverview Lithos UI - Root Application Shell
 *
 * Minimal architectural shell responsible for:
 * - Theme state management via useTheme hook
 * - Dynamic theming class application
 * - Routing configuration via React Router
 * - Component composition (Showroom, NotFound routes)
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useTheme } from './core/useTheme'
import Showroom from './showroom/Index'
import NotFound from './components/layout/NotFound'
import DocsLayout from './docs/DocsLayout'
import { Introduction } from './docs/pages/Introduction'
import { Installation } from './docs/pages/Installation'
import { CodeViewerDoc } from './docs/pages/CodeViewer'
import { PreviewBlockDoc } from './docs/pages/PreviewBlock'
import { ToastDoc } from './docs/pages/Toast'
import { ToggleDoc } from './docs/pages/Toggle'
import { ButtonDoc } from './docs/pages/Button'
import { ComingSoon } from './components/layout/ComingSoon'
import ComponentsIndex from './pages/ComponentsIndex'
import Faq from './pages/Faq'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

/**
 * App Component - Orchestrates theme state, routing, and renders application UI.
 *
 * Routing structure:
 * - "/" → Showroom (main landing page)
 * - "*" → NotFound (catch-all for undefined routes)
 */
function App() {
  const { isDarkMode, toggleObsidian, accentColor, updateAccentColor } = useTheme()

  return (
    <div className={'min-h-screen bg-(--lithos-bg) text-(--lithos-text) ' + (isDarkMode ? 'dark obsidian' : '')}>
      {/* Theme hook is mounted at the app root so accent persistence applies on every route. */}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Showroom isDarkMode={isDarkMode} toggleObsidian={toggleObsidian} accentColor={accentColor} updateAccentColor={updateAccentColor} />} />
          {/* Completed Documentation Shells */}
          <Route
            path="/docs"
            element={
              <DocsLayout isDarkMode={isDarkMode} toggleObsidian={toggleObsidian}>
                <Introduction />
              </DocsLayout>
            }
          />
          <Route
            path="/docs/installation"
            element={
              <DocsLayout isDarkMode={isDarkMode} toggleObsidian={toggleObsidian}>
                <Installation />
              </DocsLayout>
            }
          />
          <Route
            path="/docs/code-viewer"
            element={
              <DocsLayout isDarkMode={isDarkMode} toggleObsidian={toggleObsidian}>
                <CodeViewerDoc />
              </DocsLayout>
            }
          />
          <Route
            path="/docs/preview-block"
            element={
              <DocsLayout isDarkMode={isDarkMode} toggleObsidian={toggleObsidian}>
                <PreviewBlockDoc />
              </DocsLayout>
            }
          />
          <Route
            path="/docs/toast"
            element={
              <DocsLayout isDarkMode={isDarkMode} toggleObsidian={toggleObsidian}>
                <ToastDoc />
              </DocsLayout>
            }
          />
          <Route
            path="/docs/toggle"
            element={
              <DocsLayout isDarkMode={isDarkMode} toggleObsidian={toggleObsidian}>
                <ToggleDoc />
              </DocsLayout>
            }
          />
          <Route
            path="/docs/button"
            element={
              <DocsLayout isDarkMode={isDarkMode} toggleObsidian={toggleObsidian}>
                <ButtonDoc />
              </DocsLayout>
            }
          />

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
          <Route
            path="/blocks"
            element={
              <ComingSoon
                eyebrow="Coming Soon"
                title="BLOCKS"
                description="Pre-composed, production-ready page sections — hero variants, pricing tables, testimonial grids, footers, nav bars, feature comparisons — assembled from Lithos primitives. Landing soon."
              />
            }
          />
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
          <Route path="/faq" element={<Faq isDarkMode={isDarkMode} toggleObsidian={toggleObsidian} />} />
          {/* Structural Failure Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
