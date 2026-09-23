import { Skeleton, SkeletonText } from '../../../components/ui/Skeleton'

export const SkeletonMemberList = () => (
  <section
    aria-label="Loading team members"
    aria-busy="true"
    className="w-full max-w-lg border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0_var(--lithos-shadow)]"
  >
    <div className="px-5 py-4 border-b-2 border-(--lithos-border)">
      <h3 className="text-sm font-black uppercase">Team members</h3>
      <p className="mt-1 text-xs font-body opacity-60">People with access to this workspace</p>
    </div>
    <div aria-hidden="true" className="divide-y-2 divide-(--lithos-border)">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex items-center p-5">
          <Skeleton variant="circular" width={40} className="me-4" />
          <SkeletonText lines={2} lastLineWidth="55%" className="min-w-0 flex-1 text-xs [&>span]:shadow-none" />
          <Skeleton width={56} height={24} className="ms-5 hidden sm:block shrink-0 shadow-none" />
        </div>
      ))}
    </div>
  </section>
)
