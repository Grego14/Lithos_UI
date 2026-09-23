import { Skeleton } from '../../../components/ui/Skeleton'

export const SkeletonAnimations = () => (
  <div className="w-full max-w-sm">
    <p className="mb-3 text-xs font-bold uppercase">Pulse</p>
    <Skeleton animation="pulse" height={32} className="mb-6" />
    <p className="mb-3 text-xs font-bold uppercase">Shimmer</p>
    <Skeleton animation="shimmer" height={32} className="mb-6" />
    <p className="mb-3 text-xs font-bold uppercase">No animation</p>
    <Skeleton animation={false} height={32} />
  </div>
)
