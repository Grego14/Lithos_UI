import { Skeleton } from '../../../components/ui/Skeleton'

export const SkeletonAvatarExample = () => (
  <div className="flex flex-wrap items-center -m-3">
    <Skeleton variant="circular" width={32} className="m-3" />
    <Skeleton variant="circular" width={48} className="m-3" />
    <Skeleton variant="circular" width={64} className="m-3" />
  </div>
)
