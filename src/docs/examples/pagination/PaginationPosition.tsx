import { Pagination } from '../../../components/ui/Pagination'

export const PaginationPosition = () => (
  <div className="w-full space-y-6">
    {(['left', 'center', 'right'] as const).map((position) => (
      <div key={position} className="border-2 border-(--lithos-border) p-4">
        <p className="mb-3 text-xs font-mono font-bold uppercase tracking-widest">{position}</p>
        <Pagination count={3} defaultPage={2} position={position} size="sm" aria-label={`${position} aligned pages`} />
      </div>
    ))}
  </div>
)
