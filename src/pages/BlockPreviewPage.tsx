import { useParams } from 'react-router-dom'
import { Testimonials } from '../components/blocks/Testimonials'
import { Navbar as NavbarBlock } from '../components/blocks/Navbar'
import { Pricing } from '../components/blocks/Pricing'
import { ComingSoon } from '../showroom/sections/ComingSoon'

const blockRegistry: Record<string, React.ComponentType> = {
  testimonials: Testimonials,
  navbar: NavbarBlock,
  pricing: Pricing,
}

export const BlockPreviewPage = () => {
  const { slug } = useParams<{ slug: string }>()

  if (!slug || !blockRegistry[slug]) {
    return (
      <ComingSoon
        eyebrow="404 NOT FOUND"
        title="Unknown Block"
        description="The block preview you're looking for doesn't exist in the registry or hasn't been built yet."
        primaryAction={{ label: 'Back to Blocks', to: '/blocks' }}
      />
    )
  }

  const Block = blockRegistry[slug]

  return (
    <div className="min-h-screen bg-(--lithos-bg) text-(--lithos-text)">
      <Block />
    </div>
  )
}
