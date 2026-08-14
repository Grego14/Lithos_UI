import { useToast } from '../../core/hooks/useToast'
import { useTheme } from '../../core/useTheme'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { SetupGuide } from '../layout/SetupGuide'
import { Button } from '../../components/ui/Button'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { colors } from '../../utils/colors'
import { toastPropsData, toastProviderPropsData } from '../propsData/toast'
import { ToastProvider } from '../../components/ui/Toast'
import type { ToastProps } from '../../core/types'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Toast.tsx'

const newToast: ToastProps = {
  title: 'SYSTEM TOAST',
  message: 'Structural integrity verified.',
  type: 'success'
}

// inner component that consumes the nested context
const ToastTriggerButton = () => {
  const toast = useToast()
  const { accentColor } = useTheme()

  const triggerToast = () => {
    if (toast && toast.addToast)
      toast.addToast({ ...newToast, color: accentColor })
  }

  return (
    <Button onClick={triggerToast}>
      Trigger Toast
    </Button>
  )
}

const PositionedToast = () => {
  return (
    <ToastProvider position='top-left'>
      <ToastTriggerButton />
    </ToastProvider>
  )
}

export const ToastDoc = () => {
  const toast = useToast()
  const { accentColor } = useTheme()

  const triggerToast = () => {
    if (toast && toast.addToast)
      toast.addToast({ ...newToast, color: accentColor })
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

  const hookUsageCode = `import { useToast } from '../../core/hooks/useToast'

const { addToast } = useToast()
`

  const hookReturnCode = `type ToastContextType = {
  addToast: (props: ToastProps) => string
  removeToast: (id: string) => void
}
`

  const positionedCode = `import { ToastProvider } from '../../components/ui/Toast'
import { useToast } from '../../core/hooks/useToast'
import { useTheme } from '../../core/useTheme'
import { Button } from '../../components/ui/Button'

export const TriggerToastButton = () => {
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
}

export const App = () => {
  return (
    <ToastProvider position='top-left'>
      <TriggerToastButton />
    </ToastProvider>
  )
}
`

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
        componentNames={['ToastProvider', 'useToast']}
        manualPath={{ ToastProvider: '../../components/ui/Toast', useToast: '../../core/hooks/useToast' }}
        requires={[
          'components/ui/icons/IconClose.tsx',
          'components/ui/Button.tsx',
          'core/hooks/useToast.ts',
          'utils/colors.ts'
        ]}
      />

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Toasts require a global provider to wrap your application, enabling any nested component to dispatch notifications using the hook.
        </p>
        <CodeViewer
          language="tsx"
          code={`<ToastProvider>
  {/* Wrap your application router or main layout here */}
  <App />
</ToastProvider>

// Inside a child component:
const { addToast } = useToast()
`}
        />
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Default
      </h3>

      <PreviewBlock code={usageCode} githubUrl={githubUrl}>
        <Button onClick={triggerToast}>
          Trigger Toast
        </Button>
      </PreviewBlock>

      <h3 id="top-left" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Custom position
      </h3>

      <PreviewBlock code={positionedCode} githubUrl={githubUrl}>
        <PositionedToast />
      </PreviewBlock>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <PropsAccordion title="ToastProvider Props" data={toastProviderPropsData} />
      </section>

      <section className="mb-12">
        <h2 id="hooks" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
          Hooks
        </h2>

        <h3 id="useToast" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
          useToast
        </h3>
        <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
          Hook to access dispatch actions for trigger-based toasts.
        </p>

        <CodeViewer code={hookUsageCode} />

        <div className="mt-6">
          <PropsAccordion title="addToast Options (ToastProps)" data={toastPropsData} />
        </div>

        <CodeViewer code={hookReturnCode} />

        <div
          className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4"
          style={{ borderColor: colors.warning }}
        >
          <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
            The removeToast dispatch action is not documented as it is automatically called when a ToastItem is created.
          </p>
        </div>
      </section>
    </div>
  )
}
