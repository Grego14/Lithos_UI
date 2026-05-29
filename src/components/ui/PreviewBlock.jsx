import { useState } from 'react'
import CodeViewer from './CodeViewer'
export default function PreviewBlock({ children, code, githubUrl }) {
  const [activeTab, setActiveTab] = useState('preview')

  // 1. Decoupled, floating tab classes
  const baseBtnClass = 'px-4 py-2 font-black uppercase tracking-tighter leading-none border-2 border-(--lithos-border) transition-all duration-75 cursor-pointer'
  const inactiveBtnClass = `${baseBtnClass} bg-(--lithos-surface) text-(--lithos-text) shadow-[2px_2px_0px_0px_var(--lithos-shadow)] hover:shadow-[4px_4px_0px_0px_var(--lithos-shadow)] hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) active:shadow-none active:translate-x-0.5 active:translate-y-0.5`
  // The active state locks in the hovered physical depth
  const activeBtnClass = `${baseBtnClass} bg-(--lithos-accent) text-(--lithos-accent-text) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]`

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
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className={inactiveBtnClass}
          >
            Source ↗
          </a>
        ) : null}
      </div>

      {/* 3. Main Content Pane - Single rigid box */}
      <div className="border-2 border-(--lithos-border) bg-(--lithos-bg) overflow-hidden">
        {activeTab === 'preview' ? (
          <div className="flex min-h-48 items-center justify-center p-4 md:p-6">
            {children}
          </div>
        ) : (
          <CodeViewer code={code} language="jsx" embedded />
        )}
      </div>
    </div>
  )
}