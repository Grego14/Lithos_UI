import { useState, type ReactNode } from 'react'
import { CodeViewer } from './CodeViewer'

type AvailableTabs = 'preview' | 'code'

interface PreviewBlockProps {
  children: ReactNode
  code: string
  githubUrl?: string
  language?: string
  height?: string
  noPadding?: boolean
}

// 1. Decoupled, floating tab classes relying purely on the primitive
const inactiveBtnClass =
  'bg-(--lithos-surface) text-(--lithos-text) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) lithos-click'
const activeBtnClass =
  'bg-(--lithos-accent) text-(--lithos-accent-text) shadow-[4px_4px_0px_0px_var(--lithos-shadow)] lithos-click'

export const PreviewBlock = ({ children, code, githubUrl, language = 'tsx', height, noPadding }: PreviewBlockProps) => {
  const [activeTab, setActiveTab] = useState<AvailableTabs>('preview')

  return (
    <div className="mb-8">
      {/* 2. Lifted Control Bar - NO background, NO wrapping border */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
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
            className={activeTab === 'code' ? activeBtnClass : inactiveBtnClass}
          >
            Code
          </button>
        </div>

        {githubUrl ? (
          <a href={githubUrl} target="_blank" rel="noreferrer" className={inactiveBtnClass}>
            Source ↗
          </a>
        ) : null}
      </div>

      {/* 3. Main Content Pane - Single rigid box */}
      <div className="border-2 border-(--lithos-border) bg-(--lithos-bg) overflow-hidden [transform:translateZ(0)]" style={height ? { minHeight: height } : undefined}>
        {activeTab === 'preview' ? (
          <div className={`flex min-h-48 items-center justify-center w-full h-full ${noPadding ? '' : 'p-4 md:p-6'}`}>{children}</div>
        ) : (
          <CodeViewer code={code} language={language} embedded />
        )}
      </div>
    </div>
  )
};
