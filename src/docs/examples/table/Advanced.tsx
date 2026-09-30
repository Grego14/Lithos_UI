import { useEffect, useId, useState } from 'react'
import { FiCheck, FiCopy, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { Alert } from '../../../components/ui/Alert'
import { Checkbox } from '../../../components/ui/Checkbox'
import { Input } from '../../../components/ui/Input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/Table'

import { demoInvoices, currency, useInvoiceActions, type Invoice } from './useInvoiceActions'
import { InvoiceEditor } from './InvoiceActions'

/** Client-side recipe. Pass a complete dataset with unique, persistent IDs. */
export const AdvancedTable = ({ data = demoInvoices }: { data?: Invoice[] }) => {
  const id = useId()
  const actions = useInvoiceActions(data)
  const { rows, startEdit, deleteRows, copyRows, copied, notice } = actions
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<{ key: 'customer' | 'amount'; descending: boolean } | null>(null)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [showStatus, setShowStatus] = useState(true)
  const filtered = rows.filter((row) =>
    `${row.id} ${row.customer} ${row.status}`.toLowerCase().includes(query.trim().toLowerCase())
  )
  const sorted = [...filtered].sort((a, b) => {
    if (!sort) return 0
    const comparison =
      sort.key === 'amount' ? a.amount - b.amount : a.customer.localeCompare(b.customer, 'en', { numeric: true })
    return (sort.descending ? -comparison : comparison) || a.id.localeCompare(b.id)
  })
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const currentPage = Math.min(page, pageCount - 1)
  const visible = sorted.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  const existingIds = new Set(rows.map((row) => row.id))
  const validSelection = new Set([...selected].filter((rowId) => existingIds.has(rowId)))
  const allPageSelected = visible.length > 0 && visible.every((row) => validSelection.has(row.id))
  const somePageSelected = visible.some((row) => validSelection.has(row.id))
  const selectedRows = rows.filter((row) => validSelection.has(row.id))

  useEffect(() => {
    const currentIds = new Set(rows.map((row) => row.id))
    setSelected((previous) => {
      const next = new Set([...previous].filter((rowId) => currentIds.has(rowId)))
      return next.size === previous.size ? previous : next
    })
  }, [rows])

  useEffect(() => {
    if (currentPage !== page) setPage(currentPage)
  }, [currentPage, page])

  const toggleRow = (rowId: string, checked: boolean) => {
    setSelected((previous) => {
      const next = new Set(previous)
      if (checked) next.add(rowId)
      else next.delete(rowId)
      return next
    })
  }
  const togglePage = (checked: boolean) => {
    setSelected((previous) => {
      const next = new Set(previous)
      visible.forEach((row) => {
        if (checked) next.add(row.id)
        else next.delete(row.id)
      })
      return next
    })
  }
  const changeSort = (key: 'customer' | 'amount') => {
    setSort((previous) => ({ key, descending: previous?.key === key ? !previous.descending : false }))
    setPage(0)
  }
  return (
    <div className="w-full min-w-0">
      <div className="mb-4 flex flex-wrap items-end">
        <div className="mr-5 mb-3 min-w-0 flex-1 basis-56">
          <label htmlFor={`${id}-filter`} className="mb-2 block text-sm font-bold">
            Filter invoices
          </label>
          <Input
            id={`${id}-filter`}
            placeholder="Customer, invoice, or status…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(0)
            }}
          />
        </div>
        <Checkbox
          className="mb-3"
          label="Show status"
          checked={showStatus}
          onChange={(event) => setShowStatus(event.target.checked)}
        />
      </div>
      <TableContainer aria-label="Bulk invoice selection">
        <Table hoverable>
          <TableCaption className="caption-top">
            <span className="sr-only">Bulk selection table</span>
            <div className="flex flex-wrap items-center">
              <div role="group" aria-label="Bulk actions" className="mr-4 flex items-center">
                <Button
                  variant="text"
                  className="mr-1 p-2"
                  aria-label="Edit selected"
                  title="Edit one selected invoice"
                  disabled={selectedRows.length !== 1}
                  onClick={() => startEdit(selectedRows[0]!)}
                >
                  <FiEdit2 aria-hidden="true" size={16} />
                </Button>
                <Button
                  variant="text"
                  className="mr-1 p-2"
                  aria-label="Delete selected"
                  title="Delete selected invoices"
                  disabled={validSelection.size === 0}
                  onClick={() => deleteRows(new Set(validSelection))}
                >
                  <FiTrash2 aria-hidden="true" size={16} />
                </Button>
                <Button
                  variant="text"
                  className="mr-1 p-2"
                  aria-label={copied.has('bulk') ? 'Copied selected' : 'Copy selected'}
                  title="Copy selected invoice rows"
                  disabled={validSelection.size === 0}
                  onClick={() => {
                    void copyRows(selectedRows, 'bulk')
                    setPage(Math.max(0, Math.ceil((rows.length + selectedRows.length) / pageSize) - 1))
                  }}
                >
                  {copied.has('bulk') ? (
                    <FiCheck aria-hidden="true" size={16} />
                  ) : (
                    <FiCopy aria-hidden="true" size={16} />
                  )}
                </Button>
                <Button
                  variant="text"
                  className="p-2"
                  aria-label="Clear selection"
                  title="Clear selection"
                  disabled={validSelection.size === 0}
                  onClick={() => setSelected(new Set())}
                >
                  <FiX aria-hidden="true" size={16} />
                </Button>
              </div>
              <span role="status" className="text-sm">
                {filtered.length} results · {validSelection.size} selected across all pages
              </span>
            </div>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">
                <Checkbox
                  aria-label="Select all rows on this page"
                  checked={allPageSelected}
                  indeterminate={somePageSelected && !allPageSelected}
                  disabled={visible.length === 0}
                  onChange={(event) => togglePage(event.target.checked)}
                />
              </TableHead>
              <TableHead scope="col">Invoice</TableHead>
              <TableHead
                scope="col"
                aria-sort={sort?.key === 'customer' ? (sort.descending ? 'descending' : 'ascending') : undefined}
              >
                <Button variant="text" onClick={() => changeSort('customer')}>
                  Customer
                  <span aria-hidden="true" className="ms-2">
                    {sort?.key === 'customer' ? (sort.descending ? '↓' : '↑') : '↕'}
                  </span>
                </Button>
              </TableHead>
              {showStatus && <TableHead scope="col">Status</TableHead>}
              <TableHead
                scope="col"
                className="text-end"
                aria-sort={sort?.key === 'amount' ? (sort.descending ? 'descending' : 'ascending') : undefined}
              >
                <Button variant="text" onClick={() => changeSort('amount')}>
                  Amount
                  <span aria-hidden="true" className="ms-2">
                    {sort?.key === 'amount' ? (sort.descending ? '↓' : '↑') : '↕'}
                  </span>
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length ? (
              visible.map((row) => (
                <TableRow key={row.id} selected={validSelection.has(row.id)}>
                  <TableCell>
                    <Checkbox
                      aria-label={`Select ${row.id}`}
                      checked={validSelection.has(row.id)}
                      onChange={(event) => toggleRow(row.id, event.target.checked)}
                    />
                  </TableCell>
                  <TableHead scope="row" className="whitespace-nowrap">
                    {row.id}
                  </TableHead>
                  <TableCell className="min-w-40">{row.customer}</TableCell>
                  {showStatus && (
                    <TableCell>
                      <Badge intent={row.status === 'Paid' ? 'success' : 'warning'}>{row.status}</Badge>
                    </TableCell>
                  )}
                  <TableCell className="text-end tabular-nums whitespace-nowrap">
                    {currency.format(row.amount)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={showStatus ? 5 : 4} className="h-28 text-center">
                  No invoices found. Try a different filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <InvoiceEditor actions={actions} />
      <div className="mt-5 flex flex-wrap items-center justify-between">
        <div className="mb-3 mr-4">
          <label htmlFor={`${id}-size`} className="mr-2 text-sm font-bold">
            Rows per page
          </label>
          <select
            id={`${id}-size`}
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value))
              setPage(0)
            }}
            className="border-2 border-(--lithos-border) bg-(--lithos-surface) p-2"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <nav aria-label="Invoice pages" className="mb-3 flex items-center">
          <Button variant="secondary" disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>
            Previous
          </Button>
          <span className="mx-4 text-sm whitespace-nowrap" role="status">
            Page {currentPage + 1} of {pageCount}
          </span>
          <Button variant="secondary" disabled={currentPage >= pageCount - 1} onClick={() => setPage(currentPage + 1)}>
            Next
          </Button>
        </nav>
      </div>
      {notice && (
        <Alert intent={notice.intent} size="sm" variant="outlined" className="mt-3 max-w-none">
          {notice.message}
        </Alert>
      )}
    </div>
  )
}
