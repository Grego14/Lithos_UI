import { Pagination } from '../../../components/ui/Pagination'

export const PaginationSizes = () => (
  <div className="w-full space-y-8">
    {(['sm', 'md', 'lg'] as const).map((size) => (
      <div key={size}>
        <p className="mb-3 text-xs font-mono font-bold uppercase tracking-widest">{size}</p>
        <Pagination count={5} defaultPage={2} size={size} aria-label={`${size} pages`} />
      </div>
    ))}
  </div>
)
