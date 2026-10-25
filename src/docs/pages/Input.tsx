import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
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
import { SetupGuide } from '../layout/SetupGuide'
import { removeImports } from '../examples/removeImports'
import {
  inputPropsData,
  inputGroupPropsData,
  inputGroupInputPropsData,
  inputGroupAddonPropsData,
} from '../propsData/input'
import { BasicInputExample } from '../examples/input/basic'
import basicSource from '../examples/input/basic.tsx?raw'
import { NativeAttributesInputExample } from '../examples/input/nativeAttributes'
import nativeAttributesSource from '../examples/input/nativeAttributes.tsx?raw'
import { DisabledInputExample } from '../examples/input/disabled'
import disabledSource from '../examples/input/disabled.tsx?raw'
import { InvalidInputExample } from '../examples/input/invalid'
import invalidSource from '../examples/input/invalid.tsx?raw'
import { CustomizedInputExample } from '../examples/input/custom'
import customSource from '../examples/input/custom.tsx?raw'
import { InputSizesExample } from '../examples/input/sizes'
import sizesSource from '../examples/input/sizes.tsx?raw'
import { InputIconsExample } from '../examples/input/icons'
import iconsSource from '../examples/input/icons.tsx?raw'
import { InputGroupExample } from '../examples/input/group'
import groupSource from '../examples/input/group.tsx?raw'
import { PasswordInputGroupExample } from '../examples/input/groupPassword'
import groupPasswordSource from '../examples/input/groupPassword.tsx?raw'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Input.tsx'
const inputPath = '../../components/ui/Input'
const inputCode = (
  source: string,
  componentNames = ['Input'],
  manualPath: Record<string, string> | string = inputPath
) => ({
  body: removeImports(source),
  componentNames,
  manualPath,
})

const iconsCode = inputCode(iconsSource, ['InputGroup', 'InputGroupInput', 'IconSearch', 'IconSettings'], {
  others: inputPath,
  IconSearch: '../../components/ui/icons/IconSearch',
  IconSettings: '../../components/ui/icons/IconSettings',
})
const groupCode = inputCode(groupSource, ['InputGroup', 'InputGroupInput', 'InputGroupAddon', 'IconSearch'], {
  others: inputPath,
  IconSearch: '../../components/ui/icons/IconSearch',
})

export const InputDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Input"
      description="A foundational form primitive that wraps the native input element with theme awareness."
    />
    <DocSection className="mb-6">
      <DocLeadText>
        The Input is an atomic primitive built around the native HTML input element. It resolves the active accent color
        through the theme engine and forwards every native attribute, so it drops into any form without fighting your
        types or your styles.
      </DocLeadText>
      <DocCallout>
        The component intentionally ships unopinionated base styling. Use <code>className</code> to align it with the
        brutalist geometry of your layout.
      </DocCallout>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="input"
        componentNames={['Input', 'InputGroup', 'InputGroupInput', 'InputGroupAddon']}
        manualPath={inputPath}
        requires={[
          'utils/cn.ts',
          'utils/colors.ts',
          'components/ui/icons/IconSearch.tsx',
          'components/ui/icons/IconSettings.tsx',
        ]}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>
    <DocExample id="basic" title="Basic" description="A minimal text field.">
      <PreviewBlock code={inputCode(basicSource)} githubUrl={githubUrl}>
        <div className="flex flex-col items-center text-center flex-wrap">
          <BasicInputExample />
        </div>
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="native-attributes"
      title="Native attributes"
      description="Input forwards native HTML input attributes, including type, min, and max."
    >
      <PreviewBlock code={inputCode(nativeAttributesSource)} githubUrl={githubUrl}>
        <div className="flex flex-col items-center text-center flex-wrap">
          <NativeAttributesInputExample />
        </div>
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="disabled"
      title="Disabled"
      description="The native disabled attribute removes the field from keyboard focus."
    >
      <PreviewBlock code={inputCode(disabledSource)} githubUrl={githubUrl}>
        <div className="flex flex-col items-center text-center flex-wrap">
          <DisabledInputExample />
        </div>
      </PreviewBlock>
    </DocExample>
    <DocExample id="invalid" title="Invalid" description="Set invalid to communicate a validation error visually.">
      <PreviewBlock code={inputCode(invalidSource)} githubUrl={githubUrl}>
        <div className="flex flex-col items-center text-center flex-wrap">
          <InvalidInputExample />
        </div>
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="sizes"
      title="Sizes"
      description={
        <>
          Use <code>size</code> to control input height and padding. Explicit <code>h-*</code> utilities keep input
          types aligned.
        </>
      }
    >
      <PreviewBlock code={inputCode(sizesSource)} githubUrl={githubUrl}>
        <div className="flex flex-col items-center text-center flex-wrap">
          <InputSizesExample />
        </div>
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="custom-styling"
      title="Custom styling"
      description="Use className to override the primitive's base presentation."
    >
      <PreviewBlock code={inputCode(customSource)} githubUrl={githubUrl}>
        <div className="flex flex-col items-center text-center flex-wrap">
          <CustomizedInputExample />
        </div>
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="icons"
      title="Icons"
      description="Pass startAdornment or endAdornment to InputGroup to render icons inside the group border."
    >
      <PreviewBlock code={iconsCode} githubUrl={githubUrl}>
        <div className="flex flex-col items-center text-center flex-wrap">
          <InputIconsExample />
        </div>
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="input-group"
      title="Input group"
      description="InputGroup wraps a field with addon segments pinned to either edge."
    >
      <PreviewBlock code={groupCode} githubUrl={githubUrl}>
        <div className="flex flex-col items-center text-center flex-wrap">
          <InputGroupExample />
        </div>
      </PreviewBlock>
      <div className="mt-10">
        <PreviewBlock
          code={inputCode(groupPasswordSource, ['InputGroup', 'InputGroupInput', 'InputGroupAddon'])}
          githubUrl={githubUrl}
        >
          <div className="flex flex-col items-center text-center flex-wrap">
            <PasswordInputGroupExample />
          </div>
        </PreviewBlock>
      </div>
    </DocExample>

    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
        InputGroup composes an input with optional start and end addons.
      </p>
      <CodeViewer
        language="tsx"
        code={`<InputGroup>
  <InputGroupInput />
  <InputGroupAddon />
</InputGroup>`}
      />
    </DocSection>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>Renders a real native input element, preserving keyboard navigation and focus behavior.</li>
        <li>
          Pair it with a label element and pass <Code text="id" /> to keep forms screen-reader friendly.
        </li>
        <li>Disabled inputs are excluded from the focus order automatically by the browser.</li>
        <li>
          InputGroup renders with <Code text='role="group"' />; pass an <Code text="aria-label" /> when surrounding
          context is not self-describing.
        </li>
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout className="mb-6">
        Because Input extends native input props, attributes such as <Code text="type" />, <Code text="value" />,{' '}
        <Code text="onChange" />, and <Code text="autoComplete" /> work without extra configuration.
      </DocCallout>
      <PropsAccordion title="Input Props" data={inputPropsData} />
      <PropsAccordion title="InputGroup Props" data={inputGroupPropsData} />
      <PropsAccordion title="InputGroupInput Props" data={inputGroupInputPropsData} />
      <PropsAccordion title="InputGroupAddon Props" data={inputGroupAddonPropsData} />
    </DocSection>
  </div>
)
