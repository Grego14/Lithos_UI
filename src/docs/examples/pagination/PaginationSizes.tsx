import { Pagination } from '../../../components/ui/Pagination'

export const PaginationSizes = () => (
  <div className="w-full space-y-8">
    <div>
      <p className="mb-3 text-xs font-mono font-bold uppercase tracking-widest">sm</p>
      <Pagination count={5} defaultPage={2} size="sm" aria-label="Small pages" />
    </div>

    <div>
      <p className="mb-3 text-xs font-mono font-bold uppercase tracking-widest">md</p>
      <Pagination count={5} defaultPage={2} size="md" aria-label="Medium pages" />
    </div>

    <div>
      <p className="mb-3 text-xs font-mono font-bold uppercase tracking-widest">lg</p>
      <Pagination count={5} defaultPage={2} size="lg" aria-label="Large pages" />
    </div>
  </div>
)
