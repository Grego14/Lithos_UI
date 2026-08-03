import { useState } from 'react'
import { Card, CardImage, CardContent, CardTitle, CardDescription, CardFooter } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { PreviewBlock } from '../../components/ui/PreviewBlock'

export const CardDoc = () => {
  const [spacing, setSpacing] = useState<'sm' | 'md' | 'lg'>('md')

  const defaultCode = `import { Card, CardImage, CardContent, CardTitle, CardDescription, CardFooter } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export const DefaultCard = () => {
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
};`

  const accentCode = `import { Card, CardImage, CardContent, CardTitle, CardDescription } from '../../components/ui/Card'

export const AccentCard = () => {
  return (
    <Card variant="accent" interactive className="max-w-sm">
      <CardImage src="https://picsum.photos/600/400?1" alt="Preview" />
      <CardContent>
        <CardTitle>Accent Card</CardTitle>
        <CardDescription>Hover over this card to see the background fill with the active theme color.</CardDescription>
      </CardContent>
    </Card>
  )
}`

  const solidCode = `import { Card, CardImage, CardContent, CardTitle, CardDescription } from '../../components/ui/Card'

export const SolidCard = () => {
  return (
    <Card variant="solid" interactive className="max-w-sm">
      <CardImage src="https://picsum.photos/600/400?2" alt="Preview" />
      <CardContent>
        <CardTitle>Solid Card</CardTitle>
        <CardDescription>A card that permanently stays in the accent color rather than waiting for a hover interaction.</CardDescription>
      </CardContent>
    </Card>
  )
}`


  const spacingCode = `import { Card, CardContent, CardTitle, CardDescription, CardFooter } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export const SpacingCard = () => {
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
}`

  const imageCode = `import { Card, CardImage, CardContent, CardTitle, CardDescription } from '../../components/ui/Card'

export const ImageBackgroundCard = () => {
  return (
    <Card variant="image" className="w-full max-w-sm min-h-[300px]">
      <CardImage src="https://picsum.photos/600/600" alt="Full bleed background" isBackground />
      <CardContent>
        <CardTitle>Full Bleed Overlay</CardTitle>
        <CardDescription className="opacity-90">Using isBackground on CardImage to compose a rich media card.</CardDescription>
      </CardContent>
    </Card>
  )
}`

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-6">
          Card
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A hard-bordered container with hard-shadow lift physics on hover, built from composable image, content,
          and footer parts.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-6 mb-6" />
      </header>

      <section className="mb-6">
        <p className="text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Card is a foundational container composed of <code>CardImage</code>, <code>CardContent</code> (with{' '}
          <code>CardTitle</code> and <code>CardDescription</code>) and <code>CardFooter</code>. Every part is optional — compose only what the content needs.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          <strong>Default</strong> is the only variant today, with more on the roadmap. Hover lift is opt-in via the{' '}
          <code>interactive</code> prop and off by default.
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
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Card.tsx"
      >
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

      <h3 id="accent" className="mt-12 mb-3 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Accent
      </h3>
      <PreviewBlock code={accentCode} githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Card.tsx">
        <Card variant="accent" interactive className="max-w-sm">
          <CardImage src="https://picsum.photos/600/400?1" alt="Preview" />
          <CardContent>
            <CardTitle>Accent Card</CardTitle>
            <CardDescription>Hover over this card to see the background fill with the active theme color.</CardDescription>
          </CardContent>
        </Card>
      </PreviewBlock>

      <h3 id="solid" className="mt-12 mb-3 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Solid
      </h3>
      <PreviewBlock code={solidCode} githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Card.tsx">
        <Card variant="solid" interactive className="max-w-sm">
          <CardImage src="https://picsum.photos/600/400?2" alt="Preview" />
          <CardContent>
            <CardTitle>Solid Card</CardTitle>
            <CardDescription>A card that permanently stays in the accent color rather than waiting for a hover interaction.</CardDescription>
          </CardContent>
        </Card>
      </PreviewBlock>

      <h3 id="spacing" className="mt-12 mb-3 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Spacing
      </h3>
      <PreviewBlock code={spacingCode} githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Card.tsx">
        <div className="flex flex-col">
          <div className="flex mb-6">
            <Button intent={spacing === 'sm' ? 'primary' : 'secondary'} onClick={() => setSpacing('sm')} className="mr-4">Small</Button>
            <Button intent={spacing === 'md' ? 'primary' : 'secondary'} onClick={() => setSpacing('md')} className="mr-4">Medium</Button>
            <Button intent={spacing === 'lg' ? 'primary' : 'secondary'} onClick={() => setSpacing('lg')}>Large</Button>
          </div>
          <Card className="max-w-sm">
            <CardContent spacing={spacing}>
              <CardTitle>Spacious Card</CardTitle>
              <CardDescription>This card uses the {spacing} spacing token for maximum internal breathing room.</CardDescription>
            </CardContent>
            <CardFooter spacing={spacing}>
              <Button>Action</Button>
            </CardFooter>
          </Card>
        </div>
      </PreviewBlock>

      <h3 id="image" className="mt-12 mb-3 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Image
      </h3>
      <PreviewBlock code={imageCode} githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Card.tsx">
        <Card variant="image" className="w-full max-w-sm min-h-[300px]">
          <CardImage src="https://picsum.photos/600/600" alt="Full bleed background" isBackground />
          <CardContent>
            <CardTitle>Full Bleed Overlay</CardTitle>
            <CardDescription className="opacity-90">Using isBackground on CardImage to compose a rich media card.</CardDescription>
          </CardContent>
        </Card>
      </PreviewBlock>
    </div>
  )
}

