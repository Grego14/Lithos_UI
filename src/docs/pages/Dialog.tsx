import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import {
  DocCallout,
  DocExample,
  DocHeader,
  DocHeading,
  DocLeadText,
  DocList,
  DocSection,
  Code,
} from '../layout/DocPage'
import { removeImports } from '../examples/removeImports'
import {
  dialogPropsData,
  dialogHeaderPropsData,
  dialogTitlePropsData,
  dialogBodyPropsData,
  dialogFooterPropsData,
  customDialogPropsData,
} from '../propsData/dialog'
import { DefaultDialogExample } from '../examples/dialog/default'
import defaultSource from '../examples/dialog/default.tsx?raw'
import { SizeDialogExample } from '../examples/dialog/sizes'
import sizesSource from '../examples/dialog/sizes.tsx?raw'
import { ScrollableDialogExample } from '../examples/dialog/scrollable'
import scrollableSource from '../examples/dialog/scrollable.tsx?raw'
import { NoCloseDialogExample } from '../examples/dialog/noClose'
import noCloseSource from '../examples/dialog/noClose.tsx?raw'
import { CustomDialogExample } from '../examples/dialog/custom'
import customSource from '../examples/dialog/custom.tsx?raw'
import { getComponentGithubUrl } from '../utils/githubUrl'

const githubUrl = getComponentGithubUrl('dialog')
const dialogPath = '../../components/ui/Dialog'
const dialogCode = (source: string, componentNames: string[], manualPath: Record<string, string | string[]> = {}) => ({
  body: removeImports(source),
  componentNames,
  manualPath: { others: dialogPath, Button: '../../components/ui/Button', ...manualPath, react: ['useState'] },
})

export const DialogDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Dialog"
      description="A focus-trapped, always-dismissible overlay for dialogs and confirmations."
    />
    <DocSection className="mb-6">
      <DocLeadText>
        Dialog renders as a hard-edged plaque above a scrim, portaled to <Code text="document.body" />. It closes on
        Escape, a backdrop click, or the header close button. While open, it traps Tab focus inside the panel and
        restores focus to the trigger on close.
      </DocLeadText>
      <DocCallout>
        Try the examples with keyboard only: Tab cycles inside the panel, Shift+Tab reverses, and Escape closes it.
      </DocCallout>
    </DocSection>
    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="dialog"
        componentNames={['Dialog', 'DialogHeader', 'DialogTitle', 'DialogBody', 'DialogFooter', 'CustomDialog']}
        manualPath={dialogPath}
        requires={[
          'components/ui/icons/IconClose.tsx',
          'components/ui/icons/IconSettings.tsx',
          'components/ui/icons/IconAlertTriangle.tsx',
          'components/ui/Button.tsx',
          'core/hooks/useFocusTrap.ts',
          'core/types.ts',
          'utils/cn.ts',
        ]}
      />
    </DocSection>
    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="default"
      title="Default"
      description="A standard modal overlay for forms, alerts, or interactions that need focused attention. It blocks interaction with the page behind it and traps focus while open."
    >
      <PreviewBlock
        code={dialogCode(
          defaultSource,
          ['Dialog', 'DialogHeader', 'DialogTitle', 'DialogBody', 'DialogFooter', 'Button', 'IconSettings', 'useState'],
          {
            IconSettings: '../../components/ui/icons/IconSettings',
          }
        )}
        githubUrl={githubUrl}
      >
        <DefaultDialogExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="sizes"
      title="Sizes"
      description={
        <>
          Use <Code text="size" /> to constrain the maximum panel width. This example uses <Code text="lg" /> for a
          data-heavy view.
        </>
      }
    >
      <PreviewBlock
        code={dialogCode(sizesSource, [
          'Dialog',
          'DialogHeader',
          'DialogTitle',
          'DialogBody',
          'DialogFooter',
          'Button',
          'useState',
        ])}
        githubUrl={githubUrl}
      >
        <SizeDialogExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="scrollable"
      title="Scrollable"
      description="Long content scrolls inside DialogBody while the header and footer remain pinned and available."
    >
      <PreviewBlock
        code={dialogCode(scrollableSource, [
          'Dialog',
          'DialogHeader',
          'DialogTitle',
          'DialogBody',
          'DialogFooter',
          'Button',
          'useState',
        ])}
        githubUrl={githubUrl}
      >
        <ScrollableDialogExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="no-close"
      title="No close icon"
      description={
        <>
          Pass <Code text="hideClose" /> to DialogHeader to remove its close button. Escape and backdrop dismissal
          remain available.
        </>
      }
    >
      <PreviewBlock
        code={dialogCode(noCloseSource, [
          'Dialog',
          'DialogHeader',
          'DialogTitle',
          'DialogBody',
          'DialogFooter',
          'Button',
          'useState',
        ])}
        githubUrl={githubUrl}
      >
        <NoCloseDialogExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="custom-dialog"
      title="Custom Dialog"
      description="Use CustomDialog for destructive confirmations and customize its action color and icon."
    >
      <PreviewBlock
        code={dialogCode(customSource, ['CustomDialog', 'Button', 'IconAlertTriangle', 'useState'], {
          IconAlertTriangle: '../../components/ui/icons/IconAlertTriangle',
        })}
        githubUrl={githubUrl}
      >
        <CustomDialogExample />
      </PreviewBlock>
    </DocExample>
    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
        Dialog is controlled: pair it with consumer-owned <Code text="open" /> and <Code text="onClose" /> state.
      </p>
      <CodeViewer
        language="tsx"
        code={`<Dialog>
  <DialogHeader>
    <DialogTitle></DialogTitle>
  </DialogHeader>
  <DialogBody></DialogBody>
  <DialogFooter>
    <Button></Button>
  </DialogFooter>
</Dialog>`}
      />
    </DocSection>
    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          The panel carries <Code text='role="dialog"' /> (or <Code text="alertdialog" /> for error intent),{' '}
          <Code text='aria-modal="true"' />, and an <Code text="aria-labelledby" /> reference to DialogTitle.
        </li>
        <li>Focus moves into the panel and is trapped there; focus returns to the trigger when the dialog closes.</li>
        <li>Escape, backdrop click, and the header close button dismiss the panel.</li>
        <li>Background page scrolling is locked while the overlay is open.</li>
      </DocList>
    </DocSection>
    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <PropsAccordion title="Dialog Props" data={dialogPropsData} />
      <div className="mt-8">
        <PropsAccordion title="DialogHeader Props" data={dialogHeaderPropsData} />
      </div>
      <div className="mt-8">
        <PropsAccordion title="DialogTitle Props" data={dialogTitlePropsData} />
      </div>
      <div className="mt-8">
        <PropsAccordion title="DialogBody Props" data={dialogBodyPropsData} />
      </div>
      <div className="mt-8">
        <PropsAccordion title="DialogFooter Props" data={dialogFooterPropsData} />
      </div>
      <div className="mt-8">
        <PropsAccordion title="CustomDialog Props" data={customDialogPropsData} />
      </div>
    </DocSection>
  </div>
)
