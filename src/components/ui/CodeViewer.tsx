/**
 * @fileoverview Lithos UI code viewer atom.
 * - Displays raw React code inside a hard-shelled container.
 * - Copies the current code block to the clipboard with toast feedback.
 * - Uses explicit spacing only; no gap utilities are allowed.
 */
import { useToast } from '../../core/hooks/useToast'
import { useLithosTheme } from '../../core/useLithosTheme'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from '../../utils/cn'
import { Button } from './Button'

export interface CodeViewerProps {
  code: string
  language?: string
  showLanguage?: boolean
  embedded?: boolean
  className?: string
}

export const CodeViewer = ({
  code,
  language = 'tsx',
  showLanguage = false,
  embedded = false,
  className = '',
}: CodeViewerProps) => {
  const toast = useToast()
  const { accentColor } = useLithosTheme()

  const handleCopy = async () => {
    const addToastExists = typeof toast?.addToast === 'function'

    try {
      await navigator.clipboard.writeText(code)

      if (addToastExists) {
        toast.addToast({
          title: 'SUCCESS',
          message: 'Copied to clipboard',
          intent: 'success',
          color: accentColor,
        })
      }
    } catch {
      if (addToastExists) {
        toast.addToast({
          title: 'ERROR',
          message: 'Failed to copy code to clipboard',
          intent: 'error',
        })
      }
    }
  }

  const classes = cn(
    embedded
      ? 'bg-transparent mb-0 relative overflow-hidden'
      : 'border-2 border-(--lithos-border) bg-(--lithos-bg) mb-8 relative rounded-(--lithos-radius) overflow-hidden',
    className
  )

  return (
    <div className={classes}>
      <div className="border-b-2 border-(--lithos-border) bg-(--lithos-surface) px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          {showLanguage ? (
            <p className="text-xs font-black uppercase tracking-widest text-(--lithos-text) font-code">{language}</p>
          ) : (
            <div className="flex items-center">
              <div
                className="mr-2 h-4 w-4 border-2 border-(--lithos-border) bg-(--lithos-accent) rounded-(--lithos-radius)"
                aria-hidden="true"
              />
              <div
                className="mr-2 h-4 w-4 border-2 border-(--lithos-border) bg-(--lithos-accent) rounded-(--lithos-radius)"
                aria-hidden="true"
              />
              <div
                className="h-4 w-4 border-2 border-(--lithos-border) bg-(--lithos-accent) rounded-(--lithos-radius)"
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        <Button
          onClick={handleCopy}
          intent="secondary"
          className="hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text)"
          aria-label="Copy code"
          title="Copy code"
        >
          Copy
        </Button>
      </div>

      <div className="overflow-x-auto p-4 text-sm bg-[#0a0a0a]">
        <SyntaxHighlighter
          language={language}
          style={okaidia}
          customStyle={{
            background: 'transparent',
            padding: '0',
            margin: '0',
            fontFamily: 'var(--font-code)',
          }}
          codeTagProps={{
            style: { fontFamily: 'inherit' },
          }}
          CodeTag={({ children }) => <code data-code-viewer>{children}</code>}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
