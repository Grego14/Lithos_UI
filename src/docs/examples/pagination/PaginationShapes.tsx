import { Pagination } from '../../../components/ui/Pagination'

export const PaginationShapes = () => (
  <div className="w-full space-y-6">
    <div>
      <p className="mb-3 text-xs font-mono font-bold uppercase tracking-widest">Square</p>
      <Pagination count={6} defaultPage={2} shape="square" position="center" aria-label="Square pages" />
    </div>
    <div>
      <p className="mb-3 text-xs font-mono font-bold uppercase tracking-widest">Pill</p>
      <Pagination count={6} defaultPage={2} shape="pill" position="center" aria-label="Pill pages" />
    </div>
  </div>
)
