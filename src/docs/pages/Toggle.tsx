import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { toggleProps } from '../propsData/toggle'
import { SetupGuide } from '../layout/SetupGuide'
import { getComponentGithubUrl } from '../utils/githubUrl'
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
import { ToggleExample } from '../examples/toggle/default'
import toggleSource from '../examples/toggle/default.tsx?raw'

const githubUrl = getComponentGithubUrl('toggle')
const togglePath = '../../components/ui/Toggle'
const usageCode = {
  body: removeImports(toggleSource),
  componentNames: ['Toggle', 'useState'],
  manualPath: { Toggle: togglePath, react: ['useState'] },
}

export const ToggleDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader title="Toggle" description="A high-contrast binary control with strict mathematical dimensions." />
    <DocSection className="mb-6">
      <DocLeadText>
        Unlike native checkboxes, this toggle is engineered as a stationary shell. Only the internal thumb and external
        shadow translate, ensuring the surrounding layout never suffers from sub-pixel shifting during interaction.
      </DocLeadText>
      <DocCallout>Interact with the live assembly below to observe the binary contrast flip.</DocCallout>
    </DocSection>
    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="toggle"
        componentNames={['Toggle']}
        manualPath={togglePath}
        requires={['utils/cn.ts', 'components/ui/Button.tsx']}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="default"
      title="Default"
      description={
        <>
          Use this to instantly apply a binary choice, such as turning a specific setting on or off. It renders a
          prominent switch that clearly indicates its current state via a sliding thumb and color fill. Clicking or
          pressing Space/Enter toggles the state with a smooth horizontal translation. Ensure the <Code text="label" />{' '}
          prop is always provided; even if visually hidden, it provides critical context to screen readers alongside the{' '}
          <Code text="aria-pressed" /> attribute.
        </>
      }
    >
      <PreviewBlock code={usageCode} githubUrl={githubUrl}>
        <ToggleExample />
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Rendered as a native <Code text='<button type="button">' />, ensuring keyboard accessibility and focus
          management.
        </li>
        <li>
          Uses the <Code text="aria-pressed" /> attribute to announce the toggle state (true/false) to assistive
          technology.
        </li>
        <li>
          Accepts a custom <Code text="label" /> prop that powers both <Code text="aria-label" /> and a visually-hidden{' '}
          <Code text=".sr-only" /> span for screen readers.
        </li>
        <li>High-contrast borders (2px black) and sharp state changes ensure visibility for users with low vision.</li>
        <li>Stationary shell design prevents layout shifts, reducing cognitive load and motion-triggered issues.</li>
      </DocList>
    </DocSection>
    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout className="mb-6">
        <strong>Note:</strong> Border radius is configurable globally via the <Code text="--lithos-radius" /> CSS token,
        or per-instance via <Code text="className" /> (e.g. <Code text="rounded-full" />
        ). No custom prop is required.
      </DocCallout>
      <PropsAccordion title="Toggle Props" data={toggleProps} />
    </DocSection>
  </div>
)
