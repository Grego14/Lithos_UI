import { useEffect, useId, useState } from 'react'
import { FiCopy, FiEdit2, FiEye, FiSave, FiTrash2, FiX } from 'react-icons/fi'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
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

interface Invoice {
  id: string
  customer: string
  status: 'Paid' | 'Pending'
  amount: number
}

const invoices: Invoice[] = [
  { id: 'INV-001', customer: 'Alex Morgan', status: 'Paid', amount: 250 },
  { id: 'INV-002', customer: 'Sam Rivera', status: 'Pending', amount: 90 },
  { id: 'INV-003', customer: 'Jordan Lee', status: 'Paid', amount: 1200 },
  { id: 'INV-004', customer: 'Taylor Chen', status: 'Pending', amount: 150 },
  { id: 'INV-005', customer: 'Casey Patel', status: 'Paid', amount: 450 },
  { id: 'INV-006', customer: 'Robin Singh', status: 'Paid', amount: 75 },
  { id: 'INV-007', customer: 'Drew Garcia', status: 'Pending', amount: 320 },
  { id: 'INV-008', customer: 'Jamie Park', status: 'Paid', amount: 600 },
  { id: 'INV-009', customer: 'Morgan Blake', status: 'Pending', amount: 180 },
  { id: 'INV-010', customer: 'Avery Brooks', status: 'Paid', amount: 980 },
  { id: 'INV-011', customer: 'Quinn Foster', status: 'Pending', amount: 410 },
  { id: 'INV-012', customer: 'Riley James', status: 'Paid', amount: 135 },
]
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

/** Client-side recipe. Pass a complete dataset with unique, persistent IDs. */
export const AdvancedTable = ({ data = invoices }: { data?: Invoice[] }) => {
  const id = useId()
  const [rows, setRows] = useState(data)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<{ key: 'customer' | 'amount'; descending: boolean } | null>(null)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [showStatus, setShowStatus] = useState(true)
  const [notice, setNotice] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedCustomer, setEditedCustomer] = useState('')

  useEffect(() => setRows(data), [data])

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
  const startEdit = (row: Invoice) => {
    setEditingId(row.id)
    setEditedCustomer(row.customer)
  }
  const saveEdit = () => {
    const customer = editedCustomer.trim()
    if (!editingId || !customer) return
    setRows((previous) => previous.map((row) => (row.id === editingId ? { ...row, customer } : row)))
    setNotice(`Updated ${editingId}.`)
    setEditingId(null)
  }
  const deleteRows = (rowIds: Set<string>) => {
    setRows((previous) => previous.filter((row) => !rowIds.has(row.id)))
    setSelected((previous) => new Set([...previous].filter((rowId) => !rowIds.has(rowId))))
    if (editingId && rowIds.has(editingId)) setEditingId(null)
    setNotice(`Deleted ${rowIds.size} invoice${rowIds.size === 1 ? '' : 's'}.`)
  }
  const copyRows = async (targetRows: Invoice[]) => {
    const invoiceIds = targetRows.map((row) => row.id).join(', ')
    if (!invoiceIds) return
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(invoiceIds)
      setNotice(`Copied invoice IDs: ${invoiceIds}`)
    } catch {
      setNotice(`Clipboard unavailable. Invoice IDs: ${invoiceIds}`)
    }
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
          <TableCaption id="bulk-actions" className="caption-top">
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
                  aria-label="Copy selected"
                  title="Copy selected invoice IDs"
                  disabled={validSelection.size === 0}
                  onClick={() => void copyRows(selectedRows)}
                >
                  <FiCopy aria-hidden="true" size={16} />
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
      <TableContainer aria-label="Individual invoice actions" className="mt-6">
        <Table hoverable>
          <TableCaption id="individual-actions" className="caption-top">
            Individual actions table. Each row has its own view, edit, delete, and copy controls.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Invoice</TableHead>
              <TableHead scope="col">Customer</TableHead>
              {showStatus && <TableHead scope="col">Status</TableHead>}
              <TableHead scope="col" className="text-end">
                Amount
              </TableHead>
              <TableHead scope="col">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length ? (
              visible.map((row) => (
                <TableRow key={row.id}>
                  <TableHead scope="row" className="whitespace-nowrap">
                    {row.id}
                  </TableHead>
                  <TableCell className="min-w-40">
                    {editingId === row.id ? (
                      <Input
                        aria-label={`Edit customer ${row.id}`}
                        value={editedCustomer}
                        onChange={(event) => setEditedCustomer(event.target.value)}
                      />
                    ) : (
                      row.customer
                    )}
                  </TableCell>
                  {showStatus && (
                    <TableCell>
                      <Badge intent={row.status === 'Paid' ? 'success' : 'warning'}>{row.status}</Badge>
                    </TableCell>
                  )}
                  <TableCell className="text-end tabular-nums whitespace-nowrap">
                    {currency.format(row.amount)}
                  </TableCell>
                  <TableCell>
                    {editingId === row.id ? (
                      <div className="flex items-center">
                        <Button
                          variant="text"
                          className="mr-1 p-2"
                          aria-label={`Save ${row.id}`}
                          title="Save changes"
                          onClick={saveEdit}
                        >
                          <FiSave aria-hidden="true" size={16} />
                        </Button>
                        <Button
                          variant="text"
                          className="p-2"
                          aria-label={`Cancel edit ${row.id}`}
                          title="Cancel edit"
                          onClick={() => setEditingId(null)}
                        >
                          <FiX aria-hidden="true" size={16} />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center whitespace-nowrap">
                        <Button
                          variant="text"
                          className="mr-1 p-2"
                          aria-label={`View ${row.id}`}
                          title="View invoice"
                          onClick={() =>
                            setNotice(
                              `${row.id}: ${row.customer}, ${row.status.toLowerCase()}, ${currency.format(row.amount)}.`
                            )
                          }
                        >
                          <FiEye aria-hidden="true" size={16} />
                        </Button>
                        <Button
                          variant="text"
                          className="mr-1 p-2"
                          aria-label={`Edit ${row.id}`}
                          title="Edit invoice"
                          onClick={() => startEdit(row)}
                        >
                          <FiEdit2 aria-hidden="true" size={16} />
                        </Button>
                        <Button
                          variant="text"
                          className="mr-1 p-2"
                          aria-label={`Delete ${row.id}`}
                          title="Delete invoice"
                          onClick={() => deleteRows(new Set([row.id]))}
                        >
                          <FiTrash2 aria-hidden="true" size={16} />
                        </Button>
                        <Button
                          variant="text"
                          className="p-2"
                          aria-label={`Copy ${row.id}`}
                          title="Copy invoice ID"
                          onClick={() => void copyRows([row])}
                        >
                          <FiCopy aria-hidden="true" size={16} />
                        </Button>
                      </div>
                    )}
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
      <p role="status" className="mt-2 text-sm">
        {notice}
      </p>
    </div>
  )
}
