import { Tooltip, TooltipTrigger, TooltipContent } from '../../components/ui/Tooltip'
import { Button } from '../../components/ui/Button'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { SetupGuide } from '../layout/SetupGuide'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/tooltip/Tooltip.tsx'

export const TooltipDoc = () => {
  const defaultCode = {
    body: `export const DefaultTooltip = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Hover Me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a neo-brutalist tooltip.</p>
      </TooltipContent>
    </Tooltip>
  )
}`,
    componentNames: ['Tooltip', 'TooltipTrigger', 'TooltipContent', 'Button'],
    manualPath: { Tooltip: '../../components/ui/Tooltip' },
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-6">
          Tooltip
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          Hover and focus hints with the neo-brutalist border-and-shadow treatment.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-6 mb-6" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          A pop-up that displays information related to an element when the element receives keyboard focus or the mouse
          hovers over it.
        </p>
      </section>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Tooltip', 'TooltipTrigger', 'TooltipContent', 'useTooltip']}
        manualPath="../../components/ui/Tooltip"
        requires={['utils/cn.ts', '@floating-ui/react']}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Default
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        The basic tooltip structure. Set <code>asChild</code> on the trigger to attach events directly to your button.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={defaultCode} githubUrl={githubUrl}>
          <div className="flex items-center justify-center p-12">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Hover Me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a neo-brutalist tooltip.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="variants" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Variants
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        You can pass the <code>variant</code> prop to <code>TooltipContent</code> to change its style. Supported
        variants are <code>default</code>, <code>primary</code>, and <code>inverse</code>.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={{
            body: `export const TooltipVariants = () => {
  return (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Default</Button>
        </TooltipTrigger>
        <TooltipContent variant="default">
          <p>Default variant</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="primary">Primary</Button>
        </TooltipTrigger>
        <TooltipContent variant="primary">
          <p>Primary variant</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="solid" color="#000">Inverse</Button>
        </TooltipTrigger>
        <TooltipContent variant="inverse">
          <p>Inverse variant</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}`,
            componentNames: ['Tooltip', 'TooltipTrigger', 'TooltipContent', 'Button'],
            manualPath: { Tooltip: '../../components/ui/Tooltip' },
          }}
        >
          <div className="flex items-center justify-center gap-4 p-12 flex-wrap">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Default</Button>
              </TooltipTrigger>
              <TooltipContent variant="default">
                <p>Default variant</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="primary">Primary</Button>
              </TooltipTrigger>
              <TooltipContent variant="primary">
                <p>Primary variant</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="solid" color="var(--lithos-text)">
                  Inverse
                </Button>
              </TooltipTrigger>
              <TooltipContent variant="inverse">
                <p>Inverse variant</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </PreviewBlock>
      </div>

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <CodeViewer
          language="tsx"
          code={`<Tooltip>
  <TooltipTrigger />
  <TooltipContent />
</Tooltip>`}
        />
      </div>

      <section className="mt-12 mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>Uses `@floating-ui/react` to handle focus trapping and ARIA attributes natively.</li>
          <li>The trigger element receives keyboard focus.</li>
        </ul>
      </section>
    </div>
  )
}
