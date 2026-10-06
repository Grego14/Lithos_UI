import { useState } from 'react'
import { Pagination } from '../../../components/ui/Pagination'

const entries = Array.from({ length: 36 }, (_, index) => ({
  id: index + 1,
  title: `Project ${String(index + 1).padStart(2, '0')}`,
}))

export const BasicPagination = () => {
  const [page, setPage] = useState(1)
  const pageSize = 3

  return (
    <div className="w-full">
      <ul
        id="pagination-projects"
        className="mb-6 border-2 border-(--lithos-border) rounded-(--lithos-radius) divide-y-2 divide-(--lithos-border)"
      >
        {entries.slice((page - 1) * pageSize, page * pageSize).map((entry) => (
          <li key={entry.id} className="flex items-center justify-between bg-(--lithos-surface) p-4 font-bold">
            {entry.title}
            <span className="ms-4 font-mono text-xs opacity-60">#{String(entry.id).padStart(3, '0')}</span>
          </li>
        ))}
      </ul>
      <Pagination
        count={12}
        page={page}
        onPageChange={setPage}
        aria-label="Project pages"
        aria-controls="pagination-projects"
      />
    </div>
  )
}
