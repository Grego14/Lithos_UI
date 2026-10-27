import { useRef, useState } from 'react'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Kbd } from '../../components/ui/Kbd'
import { Button } from '../../components/ui/Button'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { kbdPropsData, kbdGroupPropsData } from '../propsData/kbd'
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
import type { ManualPath } from '../utils/deriveUsageCode'
import { isHexColor } from '../../core/types'
import { colors } from '../../utils/colors'
import { DefaultKbd } from '../examples/kbd/default'
import defaultSource from '../examples/kbd/default.tsx?raw'
import { ShortcutSequences } from '../examples/kbd/shortcuts'
import shortcutsSource from '../examples/kbd/shortcuts.tsx?raw'
import { KbdVariants } from '../examples/kbd/variants'
import variantsSource from '../examples/kbd/variants.tsx?raw'
import { KbdSizes } from '../examples/kbd/sizes'
import sizesSource from '../examples/kbd/sizes.tsx?raw'
import { InContextKbd } from '../examples/kbd/inContext'
import inContextSource from '../examples/kbd/inContext.tsx?raw'
import customColorSource from '../examples/kbd/customColor.tsx?raw'

import { getComponentGithubUrl } from '../utils/githubUrl'

const githubUrl = getComponentGithubUrl('kbd')
const kbdPath = '../../components/ui/Kbd'

const kbdCode = (source: string, componentNames: string[], manualPath: ManualPath = kbdPath) => ({
  body: removeImports(source),
  componentNames,
  manualPath,
})

const customColorCode = kbdCode(customColorSource, ['Kbd'])
const inContextCode = kbdCode(
  inContextSource,
  ['Kbd', 'KbdGroup', 'InputGroup', 'InputGroupInput', 'useRef', 'useEffect'],
  {
    others: kbdPath,
    InputGroup: '../../components/ui/Input',
    InputGroupInput: '../../components/ui/Input',
    react: ['useRef', 'useEffect'],
  }
)

export const KbdDoc = () => {
  const [customColor, setCustomColor] = useState('#A855F7')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCustomColor = () => {
    const value = inputRef.current?.value
    if (!value) return
    if (!isHexColor(value)) {
      setError('Please specify a valid HEX color. (Example: #00FF00)')
      return
    }
    setError('')
    setCustomColor(value)
  }

  const handleFocus = () => setError('')

  return (
    <div className="max-w-5xl mx-auto px-6">
      <DocHeader
        title="Kbd"
        description="A mechanical neo-brutalist keycap primitive for displaying keyboard shortcuts and hardware triggers."
      />
      <DocSection className="mb-6">
        <DocLeadText>
          The <Code text="Kbd" /> component renders a semantic HTML <Code text="<kbd>" /> element with tactical keycap
          proportions, high-contrast monospace typography, and brutalist 0px-blur hard-drop shadows.
        </DocLeadText>
        <DocCallout>
          Adheres to the Zero-Gap Rule: multi-key shortcut layouts use <Code text="KbdGroup" /> with explicit margin
          arithmetic, never CSS <Code text="gap" />.
        </DocCallout>
      </DocSection>

      <DocSection>
        <DocHeading id="installation">Installation</DocHeading>
        <SetupGuide
          slug="kbd"
          componentNames={['Kbd', 'KbdGroup']}
          manualPath={kbdPath}
          requires={['utils/cn.ts', 'utils/yiq.ts', 'core/types.ts']}
        />
      </DocSection>

      <DocHeading id="examples">Examples</DocHeading>
      <DocExample
        id="default"
        title="Default"
        description="Standard atomic keycaps for single keys and special modifier characters."
      >
        <PreviewBlock code={kbdCode(defaultSource, ['Kbd'])} githubUrl={githubUrl}>
          <DefaultKbd />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="shortcuts"
        title="Shortcuts & Groups"
        description={
          <>
            Use <Code text="KbdGroup" /> to compose shortcut combinations. The <Code text="attached" /> prop fuses
            adjacent keycaps into a single monolithic strip.
          </>
        }
      >
        <PreviewBlock code={kbdCode(shortcutsSource, ['Kbd', 'KbdGroup'])} githubUrl={githubUrl}>
          <ShortcutSequences />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="variants"
        title="Variants"
        description="Preset styles include brand accent fills, flat outlines, and subtle borders."
      >
        <PreviewBlock code={kbdCode(variantsSource, ['Kbd'])} githubUrl={githubUrl}>
          <KbdVariants />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="sizes"
        title="Sizes"
        description={
          <>
            Scale keycaps proportionally using the <Code text="size" /> prop (
            <Code text="xs" />, <Code text="sm" />, <Code text="md" />, <Code text="lg" />
            ).
          </>
        }
      >
        <PreviewBlock code={kbdCode(sizesSource, ['Kbd'])} githubUrl={githubUrl}>
          <KbdSizes />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="custom-color"
        title="Custom Color"
        description={
          <>
            Pass any valid hex color to the <Code text="color" /> prop. The YIQ contrast engine automatically
            recalculates high-contrast text color.
          </>
        }
      >
        <PreviewBlock code={customColorCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center text-center">
            <div className="flex flex-wrap items-center justify-center space-x-3">
              <Kbd color="#00FF00" size="lg">
                Ctrl
              </Kbd>
              <Kbd color="#00FFFF" size="lg">
                Alt
              </Kbd>
              <Kbd color="#FFFF00" size="lg">
                Shift
              </Kbd>
              <Kbd color="#FF0055" size="lg">
                ⌘
              </Kbd>
              <Kbd color={customColor} size="lg">
                Custom
              </Kbd>
            </div>
            <div className="mt-6 flex items-center text-center">
              <input
                ref={inputRef}
                type="text"
                onFocus={handleFocus}
                defaultValue={customColor}
                maxLength={7}
                minLength={4}
                className="p-1.5 text-sm outline-none border-2 border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)] focus:shadow-[4px_4px_0_0_var(--lithos-shadow)] hover:shadow-[4px_4px_0_0_var(--lithos-shadow)] max-w-30"
              />
              <Button variant="primary" className="ml-6 text-sm" onClick={handleCustomColor}>
                Use color
              </Button>
            </div>
            {error && (
              <span className="mt-2 text-xs" style={{ color: colors.error }}>
                {error}
              </span>
            )}
          </div>
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="in-context"
        title="In Context"
        description={
          <>
            Seamlessly integrates alongside search fields, buttons, dialogs, and navigation palettes. Pressing{' '}
            <Kbd size="xs">Ctrl</Kbd> + <Kbd size="xs">K</Kbd> directly focuses the input below.
          </>
        }
      >
        <PreviewBlock code={inContextCode} githubUrl={githubUrl}>
          <InContextKbd />
        </PreviewBlock>
      </DocExample>

      <DocSection>
        <DocHeading id="accessibility">Accessibility</DocHeading>
        <DocList>
          <li>
            Uses semantic <Code text="<kbd>" /> elements so assistive technologies recognize keyboard input indicators.
          </li>
          <li>Enforces WCAG AA/AAA contrast ratios dynamically through the YIQ engine.</li>
          <li>
            Grouping container uses <Code text='role="group"' /> for assistive software hierarchy.
          </li>
        </DocList>
      </DocSection>
      <DocSection>
        <DocHeading id="api">API Reference</DocHeading>
        <DocCallout className="mb-6">
          <strong>Note:</strong> Corner radius adheres to global <Code text="--lithos-radius" /> token, and layout
          spacing honors the Zero-Gap rule.
        </DocCallout>
        <PropsAccordion title="Kbd Props" data={kbdPropsData} />
        <div className="mt-6">
          <PropsAccordion title="KbdGroup Props" data={kbdGroupPropsData} />
        </div>
      </DocSection>
    </div>
  )
}
