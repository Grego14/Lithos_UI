import { useState, type ReactNode } from 'react'
import { CodeViewer } from './CodeViewer'
import { Button } from './Button'
import { IconMonitor } from './icons/IconMonitor'
import { IconTablet } from './icons/IconTablet'
import { IconSmartphone } from './icons/IconSmartphone'
import { IconExternalLink } from './icons/IconExternalLink'
import { IconCode } from './icons/IconCode'
import { IconDownload } from './icons/IconDownload'

type AvailableTabs = 'preview' | 'code'
type Breakpoint = 'mobile' | 'tablet' | 'desktop'

interface PreviewBlockProps {
  children: ReactNode
  code: string
  githubUrl?: string
  language?: string
  height?: string
  noPadding?: boolean
  slug?: string
  installGuide?: ReactNode
}

// 1. Decoupled, floating tab classes relying purely on the primitive
const inactiveBtnClass =
  'lithos-click bg-(--lithos-surface) text-(--lithos-text) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text)'
const activeBtnClass = 'lithos-click bg-(--lithos-accent) text-(--lithos-accent-text)'

export const PreviewBlock = ({ children, code, githubUrl, language = 'tsx', height, noPadding, slug, installGuide }: PreviewBlockProps) => {
  const [activeTab, setActiveTab] = useState<AvailableTabs>('preview')
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop')
  const [showInstall, setShowInstall] = useState(false)

  const getIframeWidth = () => {
    if (breakpoint === 'mobile') return '375px'
    if (breakpoint === 'tablet') return '768px'
    return '100%'
  }

  return (
    <div className="mb-8 border-2 border-(--lithos-border) bg-(--lithos-bg) overflow-hidden transform-[translateZ(0)] rounded-(--lithos-radius)">
      {/* 2. Control Bar inside container */}
      <div className="flex flex-wrap items-center justify-between p-4 border-b-2 border-(--lithos-border) bg-(--lithos-surface)">
        <div className="flex flex-wrap items-center">
          <div className="flex items-center mr-4">
            <Button
              onClick={() => setActiveTab('preview')}
              className={`mr-4 ${activeTab !== 'preview' ? inactiveBtnClass : ''}`}
            >
              Preview
            </Button>
            <Button
              onClick={() => setActiveTab('code')}
              className={activeTab !== 'code' ? inactiveBtnClass : ''}
            >
              Code
            </Button>
          </div>

          {slug && (
            <div className="hidden md:flex items-center space-x-2 border-l-2 border-(--lithos-border) pl-4">
              <Button
                aria-label="Mobile"
                onClick={() => setBreakpoint('mobile')}
                className={breakpoint === 'mobile' ? activeBtnClass : inactiveBtnClass}
              >
                <IconSmartphone />
              </Button>
              <Button
                aria-label="Tablet"
                onClick={() => setBreakpoint('tablet')}
                className={breakpoint === 'tablet' ? activeBtnClass : inactiveBtnClass}
              >
                <IconTablet />
              </Button>
              <Button
                aria-label="Desktop"
                onClick={() => setBreakpoint('desktop')}
                className={breakpoint === 'desktop' ? activeBtnClass : inactiveBtnClass}
              >
                <IconMonitor />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {installGuide && (
            <Button
              aria-label="Install"
              onClick={() => setShowInstall(!showInstall)}
              className={showInstall ? activeBtnClass : inactiveBtnClass}
            >
              <IconDownload />
            </Button>
          )}
          {slug && (
            <Button intent="secondary" onClick={() => window.open(`/blocks/preview/${slug}`, '_blank')} aria-label="Open" className="inline-flex items-center justify-center hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text)">
              <IconExternalLink />
            </Button>
          )}
          {githubUrl ? (
            <Button intent="secondary" onClick={() => window.open(githubUrl, '_blank')} aria-label="Source" className="inline-flex items-center justify-center hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text)">
              <IconCode />
            </Button>
          ) : null}
        </div>
      </div>

      {/* Expandable Install Guide Panel */}
      {showInstall && installGuide && (
        <div className="border-b-2 border-(--lithos-border) bg-(--lithos-bg)">
          {installGuide}
        </div>
      )}

      {/* 3. Main Content Pane */}
      <div className="w-full bg-(--lithos-bg)" style={height ? { height: height } : undefined}>
        {activeTab === 'preview' ? (
          slug ? (
            <div className={`flex items-center justify-center w-full h-full ${noPadding ? '' : 'p-4 md:p-6'}`}>
              <div style={{ width: getIframeWidth() }} className="h-full transition-all duration-300">
                <iframe src={`/blocks/preview/${slug}`} className="w-full h-full border-0" title="Block preview" />
              </div>
            </div>
          ) : (
            <div className={`flex min-h-48 items-center justify-center w-full h-full ${noPadding ? '' : 'p-4 md:p-6'}`}>{children}</div>
          )
        ) : (
          <div className="h-full w-full overflow-y-auto">
            <CodeViewer code={code} language={language} embedded />
          </div>
        )}
      </div>
    </div>
  )
}
