import { useRef, useState } from 'react'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Button } from '../../components/ui/Button'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { colors } from '../../utils/colors'
import { isHexColor } from '../../core/types'
import { DocCallout, DocExample, DocHeader, DocHeading, DocLeadText, DocList, DocSection } from '../layout/DocPage'
import { SetupGuide } from '../layout/SetupGuide'
import { removeImports } from '../examples/removeImports'
import { checkboxPropsData, iconCheckboxPropsData, checkboxGroupPropsData } from '../propsData/checkbox'
import { SingleCheckboxExample } from '../examples/checkbox/single'
import singleSource from '../examples/checkbox/single.tsx?raw'
import { PlainCheckboxExample } from '../examples/checkbox/plain'
import plainSource from '../examples/checkbox/plain.tsx?raw'
import { IconCheckboxExample } from '../examples/checkbox/icon'
import iconSource from '../examples/checkbox/icon.tsx?raw'
import { CustomColorCheckboxExample } from '../examples/checkbox/customColor'
import customColorSource from '../examples/checkbox/customColor.tsx?raw'
import { IndeterminateCheckboxExample } from '../examples/checkbox/indeterminate'
import indeterminateSource from '../examples/checkbox/indeterminate.tsx?raw'
import { DisabledCheckboxExample } from '../examples/checkbox/disabled'
import disabledSource from '../examples/checkbox/disabled.tsx?raw'
import { CheckboxGroupExample } from '../examples/checkbox/group'
import groupSource from '../examples/checkbox/group.tsx?raw'
import { HorizontalCheckboxGroupExample } from '../examples/checkbox/horizontalGroup'
import horizontalGroupSource from '../examples/checkbox/horizontalGroup.tsx?raw'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Checkbox.tsx'
const manualPath = {
  Checkbox: '../../components/ui/Checkbox',
  PlainCheckbox: '../../components/ui/Checkbox',
  IconCheckbox: '../../components/ui/Checkbox',
  CheckboxGroup: '../../components/ui/Checkbox',
}
const checkboxCode = (source: string, componentNames: string[], usesState = false) => ({
  body: removeImports(source),
  componentNames: usesState ? [...componentNames, 'useState'] : componentNames,
  manualPath: usesState ? { ...manualPath, react: ['useState'] } : manualPath,
})

export const CheckboxDoc = () => {
  const [customColor, setCustomColor] = useState('#FF0033')
  const [colorError, setColorError] = useState('')
  const colorInputRef = useRef<HTMLInputElement>(null)

  const handleCustomColor = () => {
    const value = colorInputRef.current?.value
    if (!value) return
    if (!isHexColor(value)) {
      setColorError('Please specify a valid HEX color. (Example: #FF00FF)')
      return
    }
    setColorError('')
    setCustomColor(value)
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <DocHeader title="Checkbox" description="A native, form-friendly checkbox with a multi-select group." />
      <DocSection className="mb-6">
        <DocLeadText>
          Checkbox keeps a real <code>&lt;input type="checkbox"&gt;</code> mounted off-screen for native keyboard,
          focus, and form-submission behavior, and paints a hard-edged box next to it from that input&apos;s own state.
          Use a single <code>Checkbox</code> for one on/off choice, or wrap several in a <code>CheckboxGroup</code> to
          collect multiple selections into one array.
        </DocLeadText>
        <DocCallout>
          A standalone Checkbox works uncontrolled with <code>defaultChecked</code>. CheckboxGroup is controlled and
          receives its selected values through <code>value</code> and <code>onChange</code>.
        </DocCallout>
      </DocSection>

      <DocSection>
        <DocHeading id="installation">Installation</DocHeading>
        <SetupGuide
          slug="checkbox"
          componentNames={['Checkbox', 'PlainCheckbox', 'IconCheckbox', 'CheckboxGroup']}
          manualPath={manualPath}
          requires={['utils/cn.ts', 'utils/yiq.ts', 'core/types.ts']}
        />
      </DocSection>

      <DocHeading id="examples">Examples</DocHeading>
      <DocExample
        id="single"
        title="Single"
        description={
          <>
            A single on/off choice, equivalent to a native input. Use <code>defaultChecked</code> for an uncontrolled
            default.
          </>
        }
      >
        <PreviewBlock code={checkboxCode(singleSource, ['Checkbox'])} githubUrl={githubUrl}>
          <SingleCheckboxExample />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="plain"
        title="Plain"
        description="Use PlainCheckbox when the check mark would be redundant, such as a settings toggle."
      >
        <PreviewBlock code={checkboxCode(plainSource, ['PlainCheckbox'])} githubUrl={githubUrl}>
          <PlainCheckboxExample />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="icon"
        title="Icon"
        description={
          <>
            <code>IconCheckbox</code> drops the box for an outlined/filled icon toggle. It defaults to a heart; pass{' '}
            <code>icon</code> and <code>checkedIcon</code> to use another pair.
          </>
        }
      >
        <PreviewBlock code={checkboxCode(iconSource, ['IconCheckbox'])} githubUrl={githubUrl}>
          <IconCheckboxExample />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="custom-color"
        title="Custom color"
        description="Pass a valid hex color to override the theme accent. Contrast is selected automatically."
      >
        <PreviewBlock
          code={checkboxCode(customColorSource, ['Checkbox', 'PlainCheckbox', 'IconCheckbox'])}
          githubUrl={githubUrl}
        >
          <div className="flex flex-col items-center text-center">
            <div className="flex flex-col [&>*:not(:first-child)]:mt-3">
              <CustomColorCheckboxExample />
            </div>
            <div className="mt-6 flex items-center">
              <input
                ref={colorInputRef}
                type="text"
                defaultValue={customColor}
                aria-label="Custom checkbox color"
                className="max-w-30 border-2 border-(--lithos-border) p-1.5 text-sm outline-none shadow-[2px_2px_0_0_var(--lithos-shadow)]"
                onChange={() => setColorError('')}
              />
              <Button variant="primary" className="ml-6 text-sm" onClick={handleCustomColor}>
                Use color
              </Button>
            </div>
            {colorError && (
              <span className="mt-2 text-xs" style={{ color: colors.error }}>
                {colorError}
              </span>
            )}
          </div>
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="indeterminate"
        title="Indeterminate"
        description={
          <>
            Use <code>indeterminate</code> for a select-all checkbox with partially checked children. It sets the native
            DOM property directly and renders a dash.
          </>
        }
      >
        <PreviewBlock code={checkboxCode(indeterminateSource, ['Checkbox'], true)} githubUrl={githubUrl}>
          <div className="flex flex-col [&>*:not(:first-child)]:mt-2">
            <IndeterminateCheckboxExample />
          </div>
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="disabled"
        title="Disabled"
        description="The native disabled state prevents interaction and dims the label."
      >
        <PreviewBlock code={checkboxCode(disabledSource, ['Checkbox'])} githubUrl={githubUrl}>
          <div className="flex flex-col [&>*:not(:first-child)]:mt-3">
            <DisabledCheckboxExample />
          </div>
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="group"
        title="Group"
        description={
          <>
            CheckboxGroup controls one <code>string[]</code>. Children declare values and inherit checked state and
            toggling from the group.
          </>
        }
      >
        <PreviewBlock code={checkboxCode(groupSource, ['Checkbox', 'CheckboxGroup'], true)} githubUrl={githubUrl}>
          <CheckboxGroupExample />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="group-horizontal"
        title="Horizontal group"
        description={
          <>
            Pass <code>mode="horizontal"</code> to flow the group items in a row.
          </>
        }
      >
        <PreviewBlock
          code={checkboxCode(horizontalGroupSource, ['Checkbox', 'CheckboxGroup'], true)}
          githubUrl={githubUrl}
        >
          <HorizontalCheckboxGroupExample />
        </PreviewBlock>
      </DocExample>

      <DocSection>
        <DocHeading id="anatomy">Anatomy</DocHeading>
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          A standalone Checkbox needs no wrapper. Group several options under one controlled array with CheckboxGroup:
        </p>
        <CodeViewer
          language="tsx"
          code={`<Checkbox />

<CheckboxGroup>
  <Checkbox />
  <Checkbox />
</CheckboxGroup>`}
        />
      </DocSection>
      <DocSection>
        <DocHeading id="accessibility">Accessibility</DocHeading>
        <DocList>
          <li>
            Renders a real <code>&lt;input type="checkbox"&gt;</code> wrapped in a label, providing native click
            targets, keyboard toggling, and screen reader semantics.
          </li>
          <li>The custom box is purely visual and tracks the input's state.</li>
          <li>
            <code>CheckboxGroup</code> exposes <code>role="group"</code> and labels the group.
          </li>
          <li>Keyboard focus is visible through a ring on the checkbox.</li>
        </DocList>
      </DocSection>
      <DocSection>
        <DocHeading id="api">API Reference</DocHeading>
        <PropsAccordion title="Checkbox / PlainCheckbox / IconCheckbox Props" data={checkboxPropsData} />
        <div className="mt-8">
          <PropsAccordion title="IconCheckbox-only Props" data={iconCheckboxPropsData} />
        </div>
        <div className="mt-8">
          <PropsAccordion title="CheckboxGroup Props" data={checkboxGroupPropsData} />
        </div>
      </DocSection>
    </div>
  )
}
