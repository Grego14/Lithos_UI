import { useParams } from 'react-router-dom'
import { Testimonials1 } from '../components/blocks/Testimonials/1'
import { Navbar1 as NavbarBlock } from '../components/blocks/Navbar/1'
import { Pricing1 } from '../components/blocks/Pricing/1'
import { ComingSoon } from '../showroom/sections/ComingSoon'

import { FAQ1 } from '../components/blocks/FAQ/1'
import { FeatureGrid1 } from '../components/blocks/FeatureGrid/1'

const blockRegistry: Record<string, React.ComponentType> = {
  testimonials: Testimonials1,
  navbar: NavbarBlock,
  pricing: Pricing1,
  faq: FAQ1,
  'feature-grids': FeatureGrid1,
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
