import { useParams } from 'react-router-dom'
import { ComingSoon } from '../showroom/sections/ComingSoon'
import { blockCategories } from '../components/blocks/registry'

export const BlockPreviewPage = () => {
  const { slug } = useParams<{ slug: string }>()

  // Flatten the registry to find the specific variant by slug
  const allVariants = blockCategories.flatMap(c => c.variants)
  const variant = allVariants.find(v => v.slug === slug)

  if (!slug || !variant) {
    return (
      <ComingSoon
        eyebrow="404 NOT FOUND"
        title="Unknown Block"
        description="The block preview you're looking for doesn't exist in the registry or hasn't been built yet."
        primaryAction={{ label: 'Back to Blocks', to: '/blocks' }}
      />
    )
  }

  const Block = variant.component

  return (
    <div className="min-h-screen bg-(--lithos-bg) text-(--lithos-text)">
      <Block />
    </div>
  )
}
