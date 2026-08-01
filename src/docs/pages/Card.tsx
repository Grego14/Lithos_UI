import { Card, CardImage, CardContent, CardTitle, CardDescription, CardFooter, CardClose } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { PreviewBlock } from '../../components/ui/PreviewBlock'

export const CardDoc = () => {
  const defaultCode = `import { Card, CardImage, CardContent, CardTitle, CardDescription, CardFooter, CardClose } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export function DefaultCard() {
  return (
    <Card interactive>
      <CardClose onClick={() => {}} />
      <CardImage src="/thumbnail.jpg" alt="Thumbnail" />
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
  )
}`

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-6">
          Card
        </h1>
        <p className="mt-2 text-lg md:text-xl font-bold opacity-70 text-(--lithos-text) font-body">
          A hard-bordered container with hard-shadow lift physics on hover, built from composable image, content,
          and footer parts.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-6 mb-6" />
      </header>

      <section className="mb-6">
        <p className="text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Card is a foundational container composed of <code>CardImage</code>, <code>CardContent</code> (with{' '}
          <code>CardTitle</code> and <code>CardDescription</code>), <code>CardFooter</code>, and an optional{' '}
          <code>CardClose</code>. Every part is optional — compose only what the content needs.
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
          <CardClose onClick={() => {}} />
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
    </div>
  )
}
