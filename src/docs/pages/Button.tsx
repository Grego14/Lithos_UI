import { Button } from '../../components/ui/Button'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { type PropItem, PropsAccordion } from '../../components/ui/PropsTable'

const buttonPropsData: PropItem[] = [
  {
    name: 'intent',
    type: "'primary' | 'secondary' | 'text'",
    defaultValue: "'primary'",
    required: false,
    description: 'Visual emphasis variant.',
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Expands the button to fill its container width.',
  },
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    defaultValue: "'button'",
    required: false,
    description: 'Native HTML button type.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Content rendered inside the button.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const ButtonDoc = () => {
  const defaultCode = `import { Button } from '../../components/ui/Button'

export const DefaultButton = () => {
  return <Button className="cursor-pointer">Default</Button>
}`

  const secondaryCode = `import { Button } from '../../components/ui/Button'

export const SecondaryButton = () => {
  return (
    <Button intent="secondary" className="cursor-pointer">
      Secondary
    </Button>
  )
}`

  const textCode = `import { Button } from '../../components/ui/Button'

export const TextButton = () => {
  return (
    <Button intent="text" className="cursor-pointer">
      Text
    </Button>
  )
}`

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-display tracking-tight leading-none text-(--lithos-text) mb-6">
          Button
        </h1>
        <p className="mt-2 text-lg md:text-xl font-dsisplay opacity-70 text-(--lithos-text)">
          A hard-bordered, high-contrast clickable primitive with three levels of visual emphasis.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-6 mb-6" />
      </header>

      <section className="mb-6">
        <p className="text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Button is a strict native <code>&lt;button&gt;</code> primitive. It ships three <code>intent</code>{' '}
          variants — Default, Secondary, Text — built on the shared hard-shadow, hard-border interaction physics of{' '}
          <code>.lithos-click</code>.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          <strong>Default</strong> is the primary call to action and requires no <code>intent</code> prop.{' '}
          <strong>Secondary</strong> is a secondary call-to-action with an outlined style.{' '}
          <strong>Text</strong> is a text-only button variant with no border or background, typically used for
          secondary or low-emphasis actions.
        </p>
      </div>

      <h2 id="examples" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-3 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Default
      </h3>
      <PreviewBlock
        code={defaultCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Button.tsx"
      >
        <Button className="cursor-pointer">Default</Button>
      </PreviewBlock>

      <h3 id="secondary" className="mb-3 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Secondary
      </h3>
      <PreviewBlock
        code={secondaryCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Button.tsx"
      >
        <Button intent="secondary" className="cursor-pointer">
          Secondary
        </Button>
      </PreviewBlock>

      <h3 id="text" className="mb-3 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Text
      </h3>
      <PreviewBlock
        code={textCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Button.tsx"
      >
        <Button intent="text" className="cursor-pointer">
          Text
        </Button>
      </PreviewBlock>

      <h2 id="requires" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Requires
      </h2>
      <ul className="list-disc pl-6 mb-12 text-lg font-body text-(--lithos-text)">
        <li><code>clsx</code> and <code>tailwind-merge</code> for class merging utility.</li>
      </ul>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>Uses native <code>&lt;button&gt;</code> element for built-in keyboard navigation and screen reader support.</li>
          <li>Supports standard focus outlines provided by the browser.</li>
          <li>Maintains high contrast ratios for all intent variants.</li>
          <li>Disabled state accurately maps to the native <code>disabled</code> attribute.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <PropsAccordion title="Button Props" data={buttonPropsData} />
      </section>
    </div>
  )
}
