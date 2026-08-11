import { useToast } from '../../core/hooks/useToast'
import { useTheme } from '../../core/useTheme'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { SetupGuide } from '../layout/SetupGuide'
import { Button } from '../../components/ui/Button'

export const ToastDoc = () => {
  const toast = useToast()
  const { accentColor } = useTheme()

  const triggerToast = () => {
    if (toast && toast.addToast) {
      toast.addToast({
        title: 'SYSTEM TOAST',
        message: 'Structural integrity verified.',
        type: 'success',
        color: accentColor,
      })
    }
  }

  const usageCode = `import { useToast } from '../../core/hooks/useToast'
import { useTheme } from '../../core/useTheme'
import { Button } from '../../components/ui/Button'

export const ToastExample = () => {
  const { addToast } = useToast()
  const { accentColor } = useTheme()

  const triggerToast = () => {
    if (addToast) {
      addToast({
        title: 'SYSTEM TOAST',
        message: 'Structural integrity verified.',
        type: 'success',
        color: accentColor,
      })
    }
  }

  return (
    <Button onClick={triggerToast}>
      Trigger Toast
    </Button>
  )
}`

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">Toast</h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A transient feedback stack operating strictly outside the page flow.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Toast primitive renders as a hard plaque rather than a soft notification card. It utilizes explicit
          margins and absolute positioning to guarantee it never shifts or breaks the underlying layout grid when
          mounting.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Click the button below to dispatch a toast to the fixed coordinate stack.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        commandImport='import { ToastProvider, useToast } from "lithos-ui"'
        manualImport={`import { ToastProvider } from '../../components/ui/Toast.tsx'
import { useToast } fromm '../../core/hooks/useToast.ts'`}
        requires={[
          'components/ui/icons/IconClose.tsx',
          'components/ui/Button.tsx',
          'core/hooks/useToast.ts',
          'utils/colors.ts'
        ]}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Default
      </h3>

      <PreviewBlock
        code={usageCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Toast.tsx"
      >
        <Button onClick={triggerToast}>
          Trigger Toast
        </Button>
      </PreviewBlock>
    </div>
  )
}
