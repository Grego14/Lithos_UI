import { Skeleton, SkeletonText } from '../../../components/ui/Skeleton'

export const SkeletonListExample = () => (
  <div aria-label="Loading list" aria-busy="true" className="w-full max-w-sm">
    {[0, 1, 2].map((row) => (
      <div key={row} className={row > 0 ? 'flex items-center mt-6' : 'flex items-center'}>
        <Skeleton width={40} height={40} className="me-4 shrink-0" />
        <SkeletonText lines={2} lastLineWidth="55%" className="min-w-0 flex-1 text-xs [&>span]:shadow-none" />
      </div>
    ))}
  </div>
)
