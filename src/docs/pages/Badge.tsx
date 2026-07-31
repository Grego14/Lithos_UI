import PreviewBlock from '../../components/ui/PreviewBlock'
import { Badge } from '../../components/ui/Badge'

export const BadgeDoc = () => {
  const variantsCode = `import { Badge } from '../../components/ui/Badge'

export default function BadgeVariants() {
  return (
    <div className='flex flex-col items-center text-center flex-wrap'>
      <Badge className='mb-4'>Default</Badge>
      <Badge className='mb-4' variant='accent'>Accent</Badge>
      <Badge className='mb-4' variant='success'>Success</Badge>
      <Badge className='mb-4' variant='warning'>Warning</Badge>
      <Badge className='mb-4' variant='error'>Error</Badge>
      <Badge variant='info'>Info</Badge>
    </div>
  )
}`

  const sizesCode = `import { Badge } from '../../components/ui/Badge'

export default function BadgeVariants() {
  return (
    <div className='flex flex-col items-center text-center'>
      <Badge>Default</Badge>
      <Badge className='mt-4' size='small'>Small</Badge>
      <Badge className='mt-4' size='medium'>Medium</Badge>
      <Badge className='mt-4' size='large'>Large</Badge>
    </div>
  )
}`

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Badge
        </h1>
        <p className="mt-2 text-lg md:text-xl font-bold opacity-70 text-(--lithos-text) font-body">
          A high-contrast metadata indicator that supports differents sizes and color variants.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Badge is an atomic primitive designed to display metadata. It contains a faint shadow that differentiates it from the Button component.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Although this component looks like the Button component, it shouldn't be interactive.
        </p>
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="variants" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Variants
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={variantsCode}
          githubUrl="https://github.com/IncredibleStand/Lithos_UI/blob/main/src/components/ui/CodeViewer.jsx"
        >
          <div className='flex flex-col items-center text-center flex-wrap'>
            <Badge className='mb-4'>Default</Badge>
            <Badge className='mb-4' variant='accent'>Accent</Badge>
            <Badge className='mb-4' variant='success'>Success</Badge>
            <Badge className='mb-4' variant='warning'>Warning</Badge>
            <Badge className='mb-4' variant='error'>Error</Badge>
            <Badge variant='info'>Info</Badge>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="sizes" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Sizes
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={sizesCode}
          githubUrl="https://github.com/IncredibleStand/Lithos_UI/blob/main/src/components/ui/CodeViewer.jsx"
        >
          <div className='flex flex-col items-center text-center'>
            <Badge>Default</Badge>
            <Badge className='mt-4' size='small'>Small</Badge>
            <Badge className='mt-4' size='medium'>Medium</Badge>
            <Badge className='mt-4' size='large'>Large</Badge>
          </div>
        </PreviewBlock>
      </div>
    </div>
  )
}
