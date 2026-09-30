import { useEffect, useRef, useState } from 'react'

export interface Invoice {
  id: string
  customer: string
  status: 'Paid' | 'Pending'
  amount: number
  method?: string
}

export interface InvoiceNotice {
  message: string
  intent: 'success' | 'error'
}

export const demoInvoices: Invoice[] = [
  { id: 'INV-001', customer: 'Alex Morgan', status: 'Paid', amount: 250, method: 'Credit card' },
  { id: 'INV-002', customer: 'Sam Rivera', status: 'Pending', amount: 90, method: 'Bank transfer' },
  { id: 'INV-003', customer: 'Jordan Lee', status: 'Paid', amount: 1200, method: 'Credit card' },
  { id: 'INV-004', customer: 'Taylor Chen', status: 'Pending', amount: 150, method: 'Bank transfer' },
  { id: 'INV-005', customer: 'Casey Patel', status: 'Paid', amount: 450, method: 'Credit card' },
  { id: 'INV-006', customer: 'Robin Singh', status: 'Paid', amount: 75, method: 'Credit card' },
  { id: 'INV-007', customer: 'Drew Garcia', status: 'Pending', amount: 320, method: 'Bank transfer' },
  { id: 'INV-008', customer: 'Jamie Park', status: 'Paid', amount: 600, method: 'Credit card' },
  { id: 'INV-009', customer: 'Morgan Blake', status: 'Pending', amount: 180, method: 'Bank transfer' },
  { id: 'INV-010', customer: 'Avery Brooks', status: 'Paid', amount: 980, method: 'Credit card' },
  { id: 'INV-011', customer: 'Quinn Foster', status: 'Pending', amount: 410, method: 'Bank transfer' },
  { id: 'INV-012', customer: 'Riley James', status: 'Paid', amount: 135, method: 'Credit card' },
]
export const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const nextInvoiceId = (rows: Invoice[]) => {
  const highestNumber = rows.reduce((highest, row) => {
    const suffix = Number(row.id.match(/(\d+)$/)?.[1])
    return Number.isNaN(suffix) ? highest : Math.max(highest, suffix)
  }, 0)
  let nextNumber = highestNumber + 1
  let nextId = `INV-${String(nextNumber).padStart(3, '0')}`
  while (rows.some((row) => row.id === nextId)) {
    nextNumber += 1
    nextId = `INV-${String(nextNumber).padStart(3, '0')}`
  }
  return nextId
}

// Each mounted example has its own records, editor, and action feedback.
export const useInvoiceActions = (data: Invoice[]) => {
  const [rows, setRows] = useState(data)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedCustomer, setEditedCustomer] = useState('')
  const [viewingId, setViewingId] = useState<string | null>(null)
  const [notice, setNotice] = useState<InvoiceNotice | null>(null)
  const [copied, setCopied] = useState<Set<string>>(new Set())
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>())
  const [previousData, setPreviousData] = useState(data)
  if (previousData !== data) {
    setPreviousData(data)
    setRows(data)
    setEditingId(null)
    setViewingId(null)
    setCopied(new Set())
    setNotice(null)
  }
  useEffect(() => {
    const activeTimers = timers.current
    return () => {
      activeTimers.forEach(clearTimeout)
      activeTimers.clear()
    }
  }, [data])

  const startEdit = (row: Invoice) => {
    setEditingId(row.id)
    setEditedCustomer(row.customer)
  }
  const saveEdit = () => {
    const customer = editedCustomer.trim()
    if (!editingId || !customer) return
    setRows((previous) => previous.map((row) => (row.id === editingId ? { ...row, customer } : row)))
    setNotice({ message: `Updated ${editingId}.`, intent: 'success' })
    setEditingId(null)
  }
  const deleteRows = (ids: Set<string>) => {
    if (!ids.size) return
    setRows((previous) => previous.filter((row) => !ids.has(row.id)))
    if (editingId && ids.has(editingId)) setEditingId(null)
    if (viewingId && ids.has(viewingId)) setViewingId(null)
    const deletedIds = [...ids].join(', ')
    setNotice({
      message: ids.size === 1 ? `Deleted invoice ${deletedIds}.` : `Deleted invoices: ${deletedIds}.`,
      intent: 'error',
    })
  }
  const addRow = () => {
    const row: Invoice = {
      id: nextInvoiceId(rows),
      customer: 'New customer',
      status: 'Pending',
      amount: 0,
      method: 'Credit card',
    }
    setRows((previous) => [row, ...previous])
    setNotice({ message: `Added ${row.id}.`, intent: 'success' })
  }
  const copyRows = (targetRows: Invoice[], key: string) => {
    if (!targetRows.length) return
    clearTimeout(timers.current.get(key))
    setCopied((previous) => {
      const next = new Set(previous)
      next.delete(key)
      return next
    })
    let currentRows = rows
    const copies = targetRows.map((row) => {
      const copy = { ...row, id: nextInvoiceId(currentRows) }
      currentRows = [copy, ...currentRows]
      return copy
    })
    setRows((previous) => [...previous, ...copies])
    setCopied((previous) => new Set(previous).add(key))
    const copyIds = copies.map((copy, index) => `${targetRows[index]!.id} as ${copy.id}`).join(', ')
    setNotice({
      message: copies.length === 1 ? `Added copy of ${copyIds}.` : `Added invoice copies: ${copyIds}.`,
      intent: 'success',
    })
    timers.current.set(
      key,
      setTimeout(() => {
        setCopied((previous) => {
          const next = new Set(previous)
          next.delete(key)
          return next
        })
        timers.current.delete(key)
      }, 2000)
    )
  }
  return {
    rows,
    editingId,
    editedCustomer,
    setEditedCustomer,
    startEdit,
    saveEdit,
    cancelEdit: () => setEditingId(null),
    deleteRows,
    addRow,
    copyRows,
    copied,
    notice,
    viewing: rows.find((row) => row.id === viewingId),
    view: setViewingId,
    closeView: () => setViewingId(null),
  }
}
