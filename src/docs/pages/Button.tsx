import { Button } from '../../components/ui/Button'
import PreviewBlock from '../../components/ui/PreviewBlock'

export const ButtonDoc = () => {
  const intentsCode = `import { Button } from '../../components/ui/Button'

export default function ButtonIntents() {
  return (
    <>
      <Button intent="primary" className="mr-4 mb-4">Primary</Button>
      <Button intent="surface" className="mr-4 mb-4">Surface</Button>
      <Button intent="ghost" className="mb-4">Ghost</Button>
    </>
  )
}`

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Button
        </h1>
        <p className="mt-2 text-lg md:text-xl font-bold opacity-70 text-(--lithos-text) font-body">
          A hard-bordered, high-contrast clickable primitive with three levels of visual emphasis.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Button is a strict native <code>&lt;button&gt;</code> primitive. It ships three <code>intent</code>{' '}
          variants — Primary, Surface, Ghost — built on the shared hard-shadow, hard-border interaction physics of{' '}
          <code>.lithos-click</code>.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          <strong>Primary</strong> is the main call to action. <strong>Surface</strong> is a secondary action.{' '}
          <strong>Ghost</strong> is the lowest-emphasis action, transparent until hover.
        </p>
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="intents" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Intents
      </h3>

      <PreviewBlock
        code={intentsCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Button.tsx"
      >
        <Button intent="primary" className="mr-4 mb-4">
          Primary
        </Button>
        <Button intent="surface" className="mr-4 mb-4">
          Surface
        </Button>
        <Button intent="ghost" className="mb-4">
          Ghost
        </Button>
      </PreviewBlock>
    </div>
  )
}
