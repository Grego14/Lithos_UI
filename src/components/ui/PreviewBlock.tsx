import { useState, type ReactNode } from 'react'
import { CodeViewer } from './CodeViewer'

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
}

// 1. Decoupled, floating tab classes relying purely on the primitive
const inactiveBtnClass =
  'bg-(--lithos-surface) text-(--lithos-text) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) lithos-click'
const activeBtnClass =
  'bg-(--lithos-accent) text-(--lithos-accent-text) shadow-[4px_4px_0px_0px_var(--lithos-shadow)] lithos-click'

export const PreviewBlock = ({ children, code, githubUrl, language = 'tsx', height, noPadding, slug }: PreviewBlockProps) => {
  const [activeTab, setActiveTab] = useState<AvailableTabs>('preview')
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop')

  const getIframeWidth = () => {
    if (breakpoint === 'mobile') return '375px'
    if (breakpoint === 'tablet') return '768px'
    return '100%'
  }

  return (
    <div className="mb-8">
      {/* 2. Lifted Control Bar - NO background, NO wrapping border */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center mb-4">
          <div className="flex items-center mr-4">
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`${activeTab === 'preview' ? activeBtnClass : inactiveBtnClass} mr-4`}
            >
              Preview
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`${activeTab === 'code' ? activeBtnClass : inactiveBtnClass}`}
            >
              Code
            </button>
          </div>

          {slug && (
            <div className="hidden md:flex items-center space-x-2 border-l-2 border-(--lithos-border) pl-4">
              <button
                type="button"
                onClick={() => setBreakpoint('mobile')}
                className={breakpoint === 'mobile' ? activeBtnClass : inactiveBtnClass}
              >
                Mobile
              </button>
              <button
                type="button"
                onClick={() => setBreakpoint('tablet')}
                className={breakpoint === 'tablet' ? activeBtnClass : inactiveBtnClass}
              >
                Tablet
              </button>
              <button
                type="button"
                onClick={() => setBreakpoint('desktop')}
                className={breakpoint === 'desktop' ? activeBtnClass : inactiveBtnClass}
              >
                Desktop
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 mb-4">
          {slug && (
            <a href={`/blocks/preview/${slug}`} target="_blank" rel="noreferrer" className={inactiveBtnClass}>
              Open in New Tab ↗
            </a>
          )}
          {githubUrl ? (
            <a href={githubUrl} target="_blank" rel="noreferrer" className={inactiveBtnClass}>
              Source ↗
            </a>
          ) : null}
        </div>
      </div>

      {/* 3. Main Content Pane - Single rigid box */}
      <div className="border-2 border-(--lithos-border) bg-(--lithos-bg) overflow-hidden [transform:translateZ(0)]" style={height ? { height: height } : undefined}>
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
};
