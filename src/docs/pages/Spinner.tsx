import { Spinner } from '../../components/ui/Spinner'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { spinnerProps } from '../propsData/spinner'
import { SetupGuide } from '../layout/SetupGuide'

export const SpinnerDoc = () => {
  const usageCode = {
    body: `export const SpinnerExample = () => {
  return (
    <Spinner size={32} className="text-(--lithos-accent)" />
  )
}`,
    componentNames: ['Spinner'],
    manualPath: { Spinner: '../../components/ui/Spinner' },
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Spinner
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          An animated loading indicator for pending states.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          A drop-in icon for any neobrutalist control. Use this component to indicate loading states during pending
          submits, fetches, and inline busy states.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Spinners do not disrupt layout or block interactions directly; combine them with disabled states on parent
          interactive elements.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide componentNames={['Spinner']} manualPath="../../components/ui/Spinner" requires={['utils/cn.ts']} />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Default
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Renders a simple rotating loader. It inherits text color by default, making it easy to drop into buttons, cards,
        or alerts.
      </p>

      <PreviewBlock
        code={usageCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Spinner.tsx"
      >
        <div className="flex items-center justify-center p-8">
          <Spinner size={32} className="text-(--lithos-accent)" />
        </div>
      </PreviewBlock>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Uses <code>role="status"</code> to announce its presence to screen readers dynamically.
          </li>
          <li>
            Includes a visually hidden <code>.sr-only</code> text node ("Loading...") as a fallback.
          </li>
          <li>
            Respects system animation settings; while the spin class handles rotation, ensure you don't over-use
            animations for users sensitive to motion.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <PropsAccordion title="Spinner Props" data={spinnerProps} />
      </section>
    </div>
  )
}
