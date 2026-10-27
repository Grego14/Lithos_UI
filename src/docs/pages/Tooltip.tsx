import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { SetupGuide } from '../layout/SetupGuide'
import { PropsAccordion } from '../../components/ui/PropsTable'
import {
  tooltipPropsData,
  tooltipTriggerPropsData,
  tooltipContentPropsData,
  useTooltipPropsData,
} from '../propsData/tooltip'
import { removeImports } from '../examples/removeImports'
import { getComponentGithubUrl } from '../utils/githubUrl'
import { DocExample, DocHeader, DocHeading, DocLeadText, DocList, DocSection, Code } from '../layout/DocPage'
import { DefaultExample } from '../examples/tooltip/default'
import defaultSource from '../examples/tooltip/default.tsx?raw'
import { PlacementExample } from '../examples/tooltip/placement'
import placementSource from '../examples/tooltip/placement.tsx?raw'
import { PrimaryExample } from '../examples/tooltip/primary'
import primarySource from '../examples/tooltip/primary.tsx?raw'
import { InverseExample } from '../examples/tooltip/inverse'
import inverseSource from '../examples/tooltip/inverse.tsx?raw'

const githubUrl = getComponentGithubUrl('tooltip')
const tooltipPath = '../../components/ui/Tooltip'
const tooltipCode = (source: string) => ({
  body: removeImports(source),
  componentNames: ['Tooltip', 'TooltipTrigger', 'TooltipContent', 'Button'],
  manualPath: {
    others: tooltipPath,
    Button: '../../components/ui/Button',
  },
})

const defaultCode = tooltipCode(defaultSource)
const placementCode = tooltipCode(placementSource)
const primaryCode = tooltipCode(primarySource)
const inverseCode = tooltipCode(inverseSource)

export const TooltipDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Tooltip"
      description="Hover and focus hints with the neo-brutalist border-and-shadow treatment."
    />
    <DocSection>
      <DocLeadText>
        A pop-up that displays information related to an element when the element receives keyboard focus or the mouse
        hovers over it.
      </DocLeadText>
    </DocSection>
    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="tooltip"
        componentNames={['Tooltip', 'TooltipTrigger', 'TooltipContent', 'useTooltip']}
        manualPath={tooltipPath}
        requires={['utils/cn.ts', 'components/ui/Popover']}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="default"
      title="Default"
      description={
        <>
          The basic tooltip structure. Set <Code text="asChild" /> on the trigger to attach events directly to your
          button.
        </>
      }
    >
      <PreviewBlock code={defaultCode} githubUrl={githubUrl}>
        <div className="flex items-center justify-center p-12">
          <DefaultExample />
        </div>
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="placement"
      title="Placement"
      description={
        <>
          Use the <Code text="placement" /> prop to change the position of the tooltip.
        </>
      }
    >
      <PreviewBlock code={placementCode} githubUrl={githubUrl}>
        <PlacementExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="primary-variant"
      title="Primary"
      description={
        <>
          Pass the <Code text="variant" /> prop to <Code text="TooltipContent" /> to change its style. This example uses
          the primary variant.
        </>
      }
    >
      <PreviewBlock code={primaryCode} githubUrl={githubUrl}>
        <div className="flex items-center justify-center p-12">
          <PrimaryExample />
        </div>
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="inverse-variant"
      title="Inverse"
      description={
        <>
          <Code text="TooltipContent" /> also supports the inverse variant for use on contrasting surfaces.
        </>
      }
    >
      <PreviewBlock code={inverseCode} githubUrl={githubUrl}>
        <div className="flex items-center justify-center p-12">
          <InverseExample />
        </div>
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
        Wrap the trigger and content in <Code text="Tooltip" />. Use <Code text="asChild" /> to compose the trigger with
        an interactive element.
      </p>
      <CodeViewer
        language="tsx"
        code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button>Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>Helpful information</TooltipContent>
</Tooltip>`}
      />
    </DocSection>
    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>Inherits accessibility and ARIA management directly from Popover.</li>
        <li>
          Automatically sets <Code text='role="tooltip"' /> and configures appropriate ARIA references between the
          trigger and content.
        </li>
        <li>Supports hover and keyboard focus interactions out of the box.</li>
      </DocList>
    </DocSection>
    <DocSection>
      <DocHeading id="api-reference">API Reference</DocHeading>
      <PropsAccordion title="Tooltip Props" data={tooltipPropsData} />
      <div className="mt-8">
        <PropsAccordion title="TooltipTrigger Props" data={tooltipTriggerPropsData} />
      </div>
      <div className="mt-8">
        <PropsAccordion title="TooltipContent Props" data={tooltipContentPropsData} />
      </div>
      <div className="mt-8">
        <PropsAccordion title="useTooltip Return" data={useTooltipPropsData} isHook />
      </div>
    </DocSection>
  </div>
)
