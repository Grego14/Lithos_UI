import { useState } from 'react'
import { Card, CardImage, CardContent, CardTitle, CardDescription, CardFooter } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import {
  cardPropsData,
  cardImagePropsData,
  cardContentPropsData,
  cardTitlePropsData,
  cardDescriptionPropsData,
  cardFooterPropsData,
} from '../propsData/card'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Card.tsx'

export const CardDoc = () => {
  const [spacing, setSpacing] = useState<'sm' | 'md' | 'lg'>('md')

  const cardManualPath = {
    Card: '../../components/ui/Card',
    CardImage: '../../components/ui/Card',
    CardContent: '../../components/ui/Card',
    CardTitle: '../../components/ui/Card',
    CardDescription: '../../components/ui/Card',
    CardFooter: '../../components/ui/Card',
    Button: '../../components/ui/Button',
  }

  const defaultCode = {
    body: `export const DefaultCard = () => {
  return (
    <Card interactive className="max-w-sm">
      <CardImage src="https://picsum.photos/600/400" alt="Thumbnail" />
      <CardContent>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Short supporting copy goes here.</CardDescription>
      </CardContent>
      <CardFooter>
        <Button intent="secondary" className="mr-3">
          Cancel
        </Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  );
};`,
    componentNames: ['Card', 'CardImage', 'CardContent', 'CardTitle', 'CardDescription', 'CardFooter', 'Button'],
    manualPath: cardManualPath,
  }

  const accentCode = {
    body: `export const AccentCard = () => {
  return (
    <Card variant="accent" interactive className="max-w-sm">
      <CardImage src="https://picsum.photos/600/400?1" alt="Preview" />
      <CardContent>
        <CardTitle>Accent Card</CardTitle>
        <CardDescription>Hover over this card to see the background fill with the active theme color.</CardDescription>
      </CardContent>
    </Card>
  )
}`,
    componentNames: ['Card', 'CardImage', 'CardContent', 'CardTitle', 'CardDescription'],
    manualPath: cardManualPath,
  }

  const solidCode = {
    body: `export const SolidCard = () => {
  return (
    <Card variant="solid" interactive className="max-w-sm">
      <CardImage src="https://picsum.photos/600/400?2" alt="Preview" />
      <CardContent>
        <CardTitle>Solid Card</CardTitle>
        <CardDescription>A card that permanently stays in the accent color rather than waiting for a hover interaction.</CardDescription>
      </CardContent>
    </Card>
  )
}`,
    componentNames: ['Card', 'CardImage', 'CardContent', 'CardTitle', 'CardDescription'],
    manualPath: cardManualPath,
  }

  const elevateCode = {
    body: `export const ElevateCard = () => {
  return (
    <Card interactive="elevate" className="max-w-sm">
      <CardImage src="https://picsum.photos/600/400?3" alt="Preview" />
      <CardContent>
        <CardTitle>Elevate Physics</CardTitle>
        <CardDescription>This interactive mode restores the legacy translation lift on hover instead of expanding the shadow.</CardDescription>
      </CardContent>
    </Card>
  )
}`,
    componentNames: ['Card', 'CardImage', 'CardContent', 'CardTitle', 'CardDescription'],
    manualPath: cardManualPath,
  }

  const spacingCode = {
    body: `export const SpacingCard = () => {
  return (
    <Card className="max-w-sm">
      <CardContent spacing="${spacing}">
        <CardTitle>Spacious Card</CardTitle>
        <CardDescription>This card uses the ${spacing} spacing token for maximum internal breathing room.</CardDescription>
      </CardContent>
      <CardFooter spacing="${spacing}">
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}`,
    componentNames: ['Card', 'CardContent', 'CardTitle', 'CardDescription', 'CardFooter', 'Button'],
    manualPath: cardManualPath,
  }

  const imageCode = {
    body: `export const ImageBackgroundCard = () => {
  return (
    <Card variant="image" className="w-full max-w-sm min-h-[300px]">
      <CardImage src="https://picsum.photos/600/600" alt="Full bleed background" isBackground />
      <CardContent>
        <CardTitle>Full Bleed Overlay</CardTitle>
        <CardDescription className="opacity-90">Using isBackground on CardImage to compose a rich media card.</CardDescription>
      </CardContent>
    </Card>
  )
}`,
    componentNames: ['Card', 'CardImage', 'CardContent', 'CardTitle', 'CardDescription'],
    manualPath: cardManualPath,
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-6">Card</h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A hard-bordered container with hard-shadow lift physics on hover, built from composable image, content, and
          footer parts.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-6 mb-6" />
      </header>

      <section className="mb-6">
        <p className="text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Card is a foundational container composed of <code>CardImage</code>, <code>CardContent</code> (with{' '}
          <code>CardTitle</code> and <code>CardDescription</code>) and <code>CardFooter</code>. Every part is optional —
          compose only what the content needs.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          <strong>Default</strong>, <strong>accent</strong>, <strong>solid</strong>, and <strong>image</strong> are the
          available variants, all shown below. Hover lift is opt-in via the <code>interactive</code> prop and off by
          default.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide componentNames={['Card']} manualPath="../../components/ui/Card" requires={['utils/cn.ts']} />

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <CodeViewer
          language="tsx"
          code={`<Card>
  <CardImage />
  <CardContent>
    <CardTitle />
    <CardDescription />
  </CardContent>
  <CardFooter />
</Card>`}
        />
      </div>

      <h2 id="examples" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-3 text-xl font-black tracking-tight text-(--lithos-text)">
        Default
      </h3>
      <PreviewBlock code={defaultCode} githubUrl={githubUrl}>
        <Card interactive className="max-w-sm">
          <CardImage src="https://picsum.photos/600/400" alt="Preview thumbnail" />
          <CardContent>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Short supporting copy goes here.</CardDescription>
          </CardContent>
          <CardFooter>
            <Button intent="secondary" className="mr-3">
              Cancel
            </Button>
            <Button>Confirm</Button>
          </CardFooter>
        </Card>
      </PreviewBlock>

      <h3 id="accent" className="mt-12 mb-3 text-xl font-black tracking-tight text-(--lithos-text)">
        Accent
      </h3>
      <PreviewBlock code={accentCode} githubUrl={githubUrl}>
        <Card variant="accent" interactive className="max-w-sm">
          <CardImage src="https://picsum.photos/600/400?1" alt="Preview" />
          <CardContent>
            <CardTitle>Accent Card</CardTitle>
            <CardDescription>
              Hover over this card to see the background fill with the active theme color.
            </CardDescription>
          </CardContent>
        </Card>
      </PreviewBlock>

      <h3 id="solid" className="mt-12 mb-3 text-xl font-black tracking-tight text-(--lithos-text)">
        Solid
      </h3>
      <PreviewBlock code={solidCode} githubUrl={githubUrl}>
        <Card variant="solid" interactive className="max-w-sm">
          <CardImage src="https://picsum.photos/600/400?2" alt="Preview" />
          <CardContent>
            <CardTitle>Solid Card</CardTitle>
            <CardDescription>
              A card that permanently stays in the accent color rather than waiting for a hover interaction.
            </CardDescription>
          </CardContent>
        </Card>
      </PreviewBlock>

      <h3 id="elevate" className="mt-12 mb-3 text-xl font-black tracking-tight text-(--lithos-text)">
        Interactive: Elevate
      </h3>
      <PreviewBlock code={elevateCode} githubUrl={githubUrl}>
        <Card interactive="elevate" className="max-w-sm">
          <CardImage src="https://picsum.photos/600/400?3" alt="Preview" />
          <CardContent>
            <CardTitle>Elevate Physics</CardTitle>
            <CardDescription>
              This interactive mode restores the legacy translation lift on hover instead of expanding the shadow.
            </CardDescription>
          </CardContent>
        </Card>
      </PreviewBlock>

      <h3 id="spacing" className="mt-12 mb-3 text-xl font-black tracking-tight text-(--lithos-text)">
        Spacing
      </h3>
      <PreviewBlock code={spacingCode} githubUrl={githubUrl}>
        <div className="flex flex-col">
          <div className="flex mb-6">
            <Button
              intent={spacing === 'sm' ? 'primary' : 'secondary'}
              onClick={() => setSpacing('sm')}
              className="mr-4"
            >
              Small
            </Button>
            <Button
              intent={spacing === 'md' ? 'primary' : 'secondary'}
              onClick={() => setSpacing('md')}
              className="mr-4"
            >
              Medium
            </Button>
            <Button intent={spacing === 'lg' ? 'primary' : 'secondary'} onClick={() => setSpacing('lg')}>
              Large
            </Button>
          </div>
          <Card className="max-w-sm">
            <CardContent spacing={spacing}>
              <CardTitle>Spacious Card</CardTitle>
              <CardDescription>
                This card uses the {spacing} spacing token for maximum internal breathing room.
              </CardDescription>
            </CardContent>
            <CardFooter spacing={spacing}>
              <Button>Action</Button>
            </CardFooter>
          </Card>
        </div>
      </PreviewBlock>

      <h3 id="image" className="mt-12 mb-3 text-xl font-black tracking-tight text-(--lithos-text)">
        Image
      </h3>
      <PreviewBlock code={imageCode} githubUrl={githubUrl}>
        <Card variant="image" className="w-full max-w-sm min-h-[300px]">
          <CardImage src="https://picsum.photos/600/600" alt="Full bleed background" isBackground />
          <CardContent>
            <CardTitle>Full Bleed Overlay</CardTitle>
            <CardDescription className="opacity-90">
              Using isBackground on CardImage to compose a rich media card.
            </CardDescription>
          </CardContent>
        </Card>
      </PreviewBlock>

      <section className="mt-12 mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Card renders a plain <code>div</code> — it carries no implicit role or focus behavior of its own.
          </li>
          <li>
            <code>CardTitle</code> renders an <code>h3</code>, so cards compose into the surrounding document heading
            order rather than skipping levels.
          </li>
          <li>
            Always pass descriptive <code>alt</code> text to <code>CardImage</code>; it is required, not optional, on
            the component's props.
          </li>
          <li>
            When a Card wraps interactive controls (links, buttons), keyboard focus and activation come from those
            native elements, not from the Card itself.
          </li>
          <li>
            If an entire Card is meant to be a single click target, wrap it in a native <code>a</code> or{' '}
            <code>button</code> rather than relying on an <code>onClick</code> on the <code>div</code>, so it stays
            keyboard operable.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <div className="mb-6 p-4 border-l-4 border-(--lithos-accent) bg-(--lithos-surface) text-sm font-body text-(--lithos-text)">
          <strong>Note:</strong> Border radius is configurable globally via the <code>--lithos-radius</code> CSS token,
          or per-instance via <code>className</code> (e.g. <code>rounded-full</code>). No custom prop is required.
        </div>
        <PropsAccordion title="Card Props" data={cardPropsData} />
        <PropsAccordion title="CardImage Props" data={cardImagePropsData} />
        <PropsAccordion title="CardContent Props" data={cardContentPropsData} />
        <PropsAccordion title="CardTitle Props" data={cardTitlePropsData} />
        <PropsAccordion title="CardDescription Props" data={cardDescriptionPropsData} />
        <PropsAccordion title="CardFooter Props" data={cardFooterPropsData} />
      </section>
    </div>
  )
}
