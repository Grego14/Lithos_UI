import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { SetupGuide } from '../layout/SetupGuide'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import {
  popoverPropsData,
  popoverTriggerPropsData,
  popoverContentPropsData,
  popoverClosePropsData,
} from '../propsData/popover'
import { removeImports } from '../examples/removeImports'
import { DocExample, DocHeader, DocHeading, DocLeadText, DocList, DocSection, Code } from '../layout/DocPage'
import { DefaultPopover } from '../examples/popover/default'
import defaultSource from '../examples/popover/default.tsx?raw'

import { getComponentGithubUrl } from '../utils/githubUrl'

const githubUrl = getComponentGithubUrl('popover')
const popoverPath = '../../components/ui/Popover'

const defaultCode = {
  body: removeImports(defaultSource),
  componentNames: ['Popover', 'PopoverTrigger', 'PopoverContent', 'PopoverClose', 'Button'],
  manualPath: {
    others: popoverPath,
    Button: '../../components/ui/Button',
  }
}

const componentNames = ['Popover', 'PopoverTrigger', 'PopoverContent', 'PopoverClose']

export const PopoverPage = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Popover"
      description="A floating overlay primitive powered by Floating UI, built for menus, dropdowns, and settings panels."
    />
    <DocSection className="mb-6">
      <DocLeadText>
        Popover is the foundational abstraction for building complex floating interfaces like <Code text="Select" />,{' '}
        <Code text="DropdownMenu" />, and <Code text="Tooltip" />. It completely abstracts away the collision-detection
        math and DOM-portal logic using <Code text="@floating-ui/react" /> while maintaining the brutalist UI aesthetic.
      </DocLeadText>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="popover"
        componentNames={componentNames}
        manualPath={popoverPath}
        requires={['@floating-ui/react', 'utils/cn.ts', 'components/ui/Button.tsx']}
      />
    </DocSection>
    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="default"
      title="Default"
      description="By default, the popover opens below its trigger and flips above when it collides with the viewport. Focus is trapped inside while open."
    >
      <PreviewBlock code={defaultCode} githubUrl={githubUrl}>
        <div className="flex justify-center py-12">
          <DefaultPopover />
        </div>
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
        Popover is an uncontrolled or controlled compound component composed from these parts:
      </p>
      <CodeViewer
        code={`<Popover>
  <PopoverTrigger></PopoverTrigger>

  <PopoverContent>
    <PopoverClose></PopoverClose>
  </PopoverContent>
</Popover>
`}
        language="tsx"
      />
    </DocSection>
    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Uses <Code text="FloatingFocusManager" /> to trap focus inside the Popover when open.
        </li>
        <li>
          Automatically handles <Code text="aria-labelledby" /> and <Code text="aria-describedby" /> if IDs are
          provided.
        </li>
        <li>
          Toggles <Code text='data-state="open | closed"' /> on the trigger for custom styling.
        </li>
        <li>Dismissible via the Escape key, clicking outside, or clicking a trigger.</li>
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="api-reference">API Reference</DocHeading>
      <PropsAccordion title="Popover Props" data={popoverPropsData} />
      <div className="mt-8">
        <PropsAccordion title="PopoverTrigger Props" data={popoverTriggerPropsData} />
      </div>
      <div className="mt-8">
        <PropsAccordion title="PopoverContent Props" data={popoverContentPropsData} />
      </div>
      <div className="mt-8">
        <PropsAccordion title="PopoverClose Props" data={popoverClosePropsData} />
      </div>
    </DocSection>
  </div>
)
