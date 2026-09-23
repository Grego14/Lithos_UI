import { Skeleton, SkeletonText } from '../../../components/ui/Skeleton'
import { Card, CardContent } from '../../../components/ui/Card'

export const SkeletonCardBlock = () => (
  <section aria-label="Loading latest articles" aria-busy="true" className="w-full p-1">
    <h3 className="mb-2 text-lg font-black uppercase">Latest articles</h3>
    <p className="mb-6 text-sm font-body opacity-70">Ideas and updates from the team.</p>
    <div className="flex flex-wrap -m-3">
      {[0, 1, 2].map((item) => (
        <Card key={item} className="m-3 w-[calc(100%-1.5rem)] sm:w-[calc(50%-1.5rem)] xl:w-[calc(33.333%-1.5rem)]">
          <Skeleton
            variant="rectangular"
            tone="accent"
            className="aspect-[16/9] h-auto border-0 border-b-2 shadow-none"
          />
          <CardContent>
            <div className="flex items-center mb-6">
              <Skeleton variant="circular" width={32} className="me-3" />
              <SkeletonText lines={2} className="flex-1 text-xs [&>span]:shadow-none" />
            </div>
            <Skeleton width="85%" height={24} className="mb-4 shadow-none" />
            <SkeletonText lines={3} className="text-sm [&>span]:shadow-none" />
            <Skeleton width={96} height={16} className="mt-6 shadow-none" />
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
)
