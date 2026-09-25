import { Skeleton, SkeletonText } from '../../../components/ui/Skeleton'
import { Card, CardContent } from '../../../components/ui/Card'

export const SkeletonCardExample = () => (
  <Card aria-label="Loading card" aria-busy="true" className="w-full max-w-sm">
    <Skeleton variant="rectangular" className="aspect-[16/9] h-auto border-0 border-b-2 shadow-none" />
    <CardContent>
      <Skeleton width="75%" height={24} className="mb-5 shadow-none" />
      <SkeletonText lines={3} className="text-sm [&>span]:shadow-none" />
    </CardContent>
  </Card>
)
