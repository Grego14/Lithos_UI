import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { SetupGuide } from '../layout/SetupGuide'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { toastPropsData, toastProviderPropsData } from '../propsData/toast'
import { removeImports } from '../examples/removeImports'
import { getComponentGithubUrl } from '../utils/githubUrl'
import { DefaultToast } from '../examples/toast/default'
import defaultSource from '../examples/toast/default.tsx?raw'
import { PositionedToast } from '../examples/toast/customPosition'
import positionedSource from '../examples/toast/customPosition.tsx?raw'
import { AllIntentsToast } from '../examples/toast/allIntents'
import allIntentsSource from '../examples/toast/allIntents.tsx?raw'
import {
  DocCallout,
  DocExample,
  DocHeader,
  DocHeading,
  DocLeadText,
  DocSection,
  DocList,
  Code,
} from '../layout/DocPage'

const githubUrl = getComponentGithubUrl('toast')
const toastPath = '../../components/ui/Toast'
const manualPath = {
  others: toastPath,
  ToastProvider: toastPath,
  useToast: toastPath,
  Button: '../../components/ui/Button',
}
const toastCode = (source: string, componentNames: string[], types: string[] = []) => ({
  body: removeImports(source),
  componentNames,
  types,
  manualPath,
})

const defaultCode = toastCode(defaultSource, ['useToast', 'Button'])
const allIntentsCode = toastCode(allIntentsSource, ['useToast', 'Button', 'ToastType'], ['ToastType'])
const positionedCode = toastCode(positionedSource, ['useToast', 'ToastProvider', 'Button'])

export const ToastDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader title="Toast" description="A transient feedback stack operating strictly outside the page flow." />
    <DocSection className="mb-6">
      <DocLeadText>
        The Toast primitive renders as a hard plaque rather than a soft notification card. It utilizes explicit margins
        and absolute positioning to guarantee it never shifts or breaks the underlying layout grid when mounting.
      </DocLeadText>
      <DocCallout>Click the button below to dispatch a toast to the fixed coordinate stack.</DocCallout>
    </DocSection>
    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="toast"
        componentNames={['useToast', 'Button']}
        manualPath={manualPath}
        requires={[
          'components/ui/icons/IconClose.tsx',
          'components/ui/Button.tsx',
          'utils/colors.ts',
          'utils/yiq.ts',
          'utils/cn.ts',
        ]}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="default"
      title="Default"
      description={
        <>
          Use this to provide transient feedback after a user action, such as saving a form or confirming a deletion. It
          renders a temporary overlay notification in the bottom-right corner. Toasts automatically disappear after a
          set duration, but hovering pauses the timer. Ensure messages are brief. Inherits <Code text='role="status"' />
          for polite screen reader announcements without stealing focus.
        </>
      }
    >
      <PreviewBlock code={defaultCode} githubUrl={githubUrl}>
        <DefaultToast />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="intents"
      title="Intents"
      description={
        <>
          Toasts support multiple semantic intents (<Code text="success" />, <Code text="error" />,{' '}
          <Code text="warning" />, <Code text="info" />, <Code text="default" />, and <Code text="accent" />) which
          automatically map to specific background colors and guarantee perfect text/shadow contrast in both light and
          dark themes.
        </>
      }
    >
      <PreviewBlock code={allIntentsCode} githubUrl={githubUrl}>
        <AllIntentsToast />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="custom-position"
      title="Custom position"
      description="Use this when the default bottom-right placement obscures critical UI elements on your specific page. It alters the fixed positioning coordinates (e.g., top-left, bottom-center) of the toast container. The structural layout and animations remain identical. Positioning choices do not impact accessibility order or DOM semantics."
    >
      <PreviewBlock code={positionedCode} githubUrl={githubUrl}>
        <PositionedToast />
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <CodeViewer
        language="tsx"
        code={`<ToastProvider>
  <App />
</ToastProvider>`}
      />
    </DocSection>
    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Uses <Code text='role="alert"' /> and <Code text='aria-live="assertive"' /> for error toasts so critical
          feedback is announced immediately to screen readers.
        </li>
        <li>
          Uses <Code text='role="status"' /> and <Code text='aria-live="polite"' /> for non-critical notifications
          (success, info, warning) to avoid interrupting ongoing screen reader speech.
        </li>
        <li>
          Automatically shifts focus to error notifications when mounted and restores focus to the previously active
          element upon dismissal.
        </li>
        <li>Pauses the auto-dismiss timer on hover, allowing users extra time to read or interact with the content.</li>
      </DocList>
    </DocSection>
    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout className="mb-6">
        <strong>Note:</strong> Border radius is configurable globally via the <Code text="--lithos-radius" /> CSS token,
        or per-instance via <Code text="className" /> (e.g. <Code text="rounded-full" />
        ). No custom prop is required.
      </DocCallout>
      <PropsAccordion title="ToastProvider Props" data={toastProviderPropsData} />
      <div className="mt-8">
        <PropsAccordion title="addToast Options (ToastProps)" data={toastPropsData} />
      </div>
    </DocSection>
  </div>
)
