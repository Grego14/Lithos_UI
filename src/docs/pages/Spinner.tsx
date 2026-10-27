import { useRef, useState } from 'react'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { spinnerProps } from '../propsData/spinner'
import { SetupGuide } from '../layout/SetupGuide'
import { Button } from '../../components/ui/Button'
import { colors } from '../../utils/colors'
import { isHexColor } from '../../core/types'
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
import { SpinnerExample } from '../examples/spinner/default'
import defaultSource from '../examples/spinner/default.tsx?raw'
import { SpinnerSizes } from '../examples/spinner/sizes'
import sizesSource from '../examples/spinner/sizes.tsx?raw'
import { SpinnerIcons } from '../examples/spinner/icons'
import iconsSource from '../examples/spinner/icons.tsx?raw'
import { SpinnerRotation } from '../examples/spinner/rotation'
import rotationSource from '../examples/spinner/rotation.tsx?raw'
import { SpinnerIntegration } from '../examples/spinner/integration'
import integrationSource from '../examples/spinner/integration.tsx?raw'
import { getComponentGithubUrl } from '../utils/githubUrl'

const githubUrl = getComponentGithubUrl('spinner')
const spinnerPath = '../../components/ui/Spinner'

const sourceCode = (
  source: string,
  componentNames: string[],
  manualPath: Record<string, string> | string = spinnerPath
) => ({
  body: removeImports(source),
  componentNames,
  manualPath,
})

const usageCode = sourceCode(defaultSource, ['Spinner'])

const sizesCode = sourceCode(sizesSource, ['Spinner'])

const iconsCode = {
  ...sourceCode(iconsSource, ['Spinner', 'SpinnerIconType']),
  types: ['SpinnerIconType'],
}

const rotationCode = sourceCode(rotationSource, ['Spinner'])

const integrationCode = sourceCode(
  integrationSource,
  ['Spinner', 'Button', 'InputGroup', 'InputGroupInput', 'Badge', 'Alert'],
  {
    Spinner: spinnerPath,
    Button: '../../components/ui/Button',
    Badge: '../../components/ui/Badge',
    Alert: '../../components/ui/Alert',
    others: '../../components/ui/Input',
  }
)

export const SpinnerDoc = () => {
  const [customColor, setCustomColor] = useState('#f59e0b')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => setError('')

  const handleCustomColor = () => {
    if (!inputRef.current) return
    const value = inputRef.current.value
    if (!isHexColor(value)) {
      setError('Please specify a valid HEX color. (Example: #00FF00)')
      return
    }
    setCustomColor(value)
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <DocHeader title="Spinner" description="An animated loading indicator for pending states." />
      <DocSection className="mb-6">
        <DocLeadText>
          A drop-in icon for any neobrutalist control. Use this component to indicate loading states during pending
          submits, fetches, and inline busy states.
        </DocLeadText>
        <DocCallout>
          Spinners do not disrupt layout or block interactions directly; combine them with disabled states on parent
          interactive elements.
        </DocCallout>
      </DocSection>

      <DocSection>
        <DocHeading id="installation">Installation</DocHeading>
        <SetupGuide componentNames={['Spinner']} manualPath={spinnerPath} requires={['utils/cn.ts']} />
      </DocSection>

      <DocHeading id="examples">Examples</DocHeading>
      <DocExample
        id="default"
        title="Custom Color"
        description="Renders a simple rotating loader. It inherits text color by default, making it easy to drop into buttons, cards, or alerts."
      >
        <PreviewBlock code={usageCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center p-8">
            <SpinnerExample color={customColor} />
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
        id="sizes"
        title="Sizes"
        description={
          <>
            Scale the spinner to any proportion using the <Code text="size" /> prop, which accepts a number (in pixels)
            or a string.
          </>
        }
      >
        <PreviewBlock code={sizesCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center p-8">
            <SpinnerSizes />
          </div>
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="rotation"
        title="Rotation"
        description={
          <>
            You can control the direction of the spinner&apos;s rotation using the <Code text="anticlockwise" /> prop.
            The default rotation is clockwise.
          </>
        }
      >
        <PreviewBlock code={rotationCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center p-8">
            <SpinnerRotation />
          </div>
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="icons"
        title="Custom Spinner"
        description={
          <>
            You can pass a predefined string to the <Code text="icon" /> prop. The Spinner will render the corresponding
            icon and automatically pass down the <Code text="size" /> while spinning indefinitely.
          </>
        }
      >
        <PreviewBlock code={iconsCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center p-8">
            <SpinnerIcons />
          </div>
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="integration"
        title="Integration"
        description="Spinners compose effortlessly with other UI components. Drop them into buttons, inputs, or badges to indicate processing states."
      >
        <PreviewBlock code={integrationCode} githubUrl={githubUrl}>
          <div className="w-full p-8">
            <SpinnerIntegration />
          </div>
        </PreviewBlock>
      </DocExample>

      <DocSection>
        <DocHeading id="accessibility">Accessibility</DocHeading>
        <DocList>
          <li>
            Uses <Code text='role="status"' /> to announce its presence to screen readers dynamically.
          </li>
          <li>
            Includes a visually hidden <Code text=".sr-only" /> text node (&quot;Loading...&quot;) as a fallback.
          </li>
          <li>
            Respects system animation settings; while the spin class handles rotation, ensure you don&apos;t over-use
            animations for users sensitive to motion.
          </li>
        </DocList>
      </DocSection>
      <DocSection>
        <DocHeading id="api">API Reference</DocHeading>
        <PropsAccordion title="Spinner Props" data={spinnerProps} />
      </DocSection>
    </div>
  )
}
