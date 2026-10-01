import { useEffect, useRef, useState } from 'react'
import { useToast } from '../../../core/hooks/useToast'
import { colors } from '../../../utils/colors'

export interface Invoice {
  id: string
  customer: string
  status: 'Paid' | 'Pending'
  amount: number
  method?: string
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

const createInvoiceIdAllocator = (rows: Invoice[]) => {
  const highestNumber = rows.reduce((highest, row) => {
    const suffix = Number(row.id.match(/(\d+)$/)?.[1])
    return Number.isNaN(suffix) ? highest : Math.max(highest, suffix)
  }, 0)
  let nextNumber = highestNumber + 1
  return () => `INV-${String(nextNumber++).padStart(3, '0')}`
}

// Each mounted example has its own records, editor, and action feedback.
export const useInvoiceActions = (data: Invoice[]) => {
  const { addToast } = useToast()
  const [rows, setRows] = useState(data)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedCustomer, setEditedCustomer] = useState('')
  const [viewingId, setViewingId] = useState<string | null>(null)
  const [duplicated, setDuplicated] = useState<Set<string>>(new Set())
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>())
  const tableRef = useRef<HTMLDivElement>(null)
  const editTrigger = useRef<HTMLElement | null>(null)
  const [previousData, setPreviousData] = useState(data)
  if (previousData !== data) {
    setPreviousData(data)
    setRows(data)
    setEditingId(null)
    setViewingId(null)
    setDuplicated(new Set())
  }
  useEffect(() => {
    const activeTimers = timers.current
    return () => {
      activeTimers.forEach(clearTimeout)
      activeTimers.clear()
    }
  }, [data])

  // Restore focus after React has removed the editor and updated the visible rows.
  useEffect(() => {
    if (editingId || !editTrigger.current) return
    const trigger = editTrigger.current
    const target = trigger.isConnected && !trigger.matches(':disabled') ? trigger : tableRef.current
    target?.focus()
    editTrigger.current = null
  }, [editingId])

  const startEdit = (row: Invoice, trigger: HTMLElement) => {
    editTrigger.current = trigger
    setEditingId(row.id)
    setEditedCustomer(row.customer)
  }
  const saveEdit = () => {
    const customer = editedCustomer.trim()
    if (!editingId || !customer) return
    setRows((previous) => previous.map((row) => (row.id === editingId ? { ...row, customer } : row)))
    addToast({ message: `Updated ${editingId}.`, intent: 'success' })
    setEditingId(null)
  }
  const deleteRows = (ids: Set<string>) => {
    if (!ids.size) return
    setRows((previous) => previous.filter((row) => !ids.has(row.id)))
    if (editingId && ids.has(editingId)) setEditingId(null)
    if (viewingId && ids.has(viewingId)) setViewingId(null)
    const deletedIds = [...ids].join(', ')
    addToast({
      message: ids.size === 1 ? `Deleted invoice ${deletedIds}.` : `Deleted invoices: ${deletedIds}.`,
      intent: 'success',
      color: colors.error,
    })
  }
  const addRow = () => {
    const row: Invoice = {
      id: createInvoiceIdAllocator(rows)(),
      customer: 'New customer',
      status: 'Pending',
      amount: 0,
      method: 'Credit card',
    }
    setRows((previous) => [row, ...previous])
    addToast({ message: `Added ${row.id}.`, intent: 'success' })
  }
  const duplicateRows = (targetRows: Invoice[], key: string) => {
    if (!targetRows.length) return
    clearTimeout(timers.current.get(key))
    // Scan existing IDs once for the entire batch, rather than once per duplicate.
    const nextId = createInvoiceIdAllocator(rows)
    const copies = targetRows.map((row) => ({ ...row, id: nextId() }))
    setRows((previous) => [...previous, ...copies])
    setDuplicated((previous) => new Set(previous).add(key))
    const copyIds = copies.map((copy, index) => `${targetRows[index]!.id} as ${copy.id}`).join(', ')
    addToast({
      message: copies.length === 1 ? `Duplicated invoice ${copyIds}.` : `Duplicated invoices: ${copyIds}.`,
      intent: 'success',
    })
    timers.current.set(
      key,
      setTimeout(() => {
        setDuplicated((previous) => {
          const next = new Set(previous)
          next.delete(key)
          return next
        })
        timers.current.delete(key)
      }, 2000)
    )
  }
  return {
    tableRef,
    rows,
    editingId,
    editedCustomer,
    setEditedCustomer,
    startEdit,
    saveEdit,
    cancelEdit: () => setEditingId(null),
    deleteRows,
    addRow,
    duplicateRows,
    duplicated,
    viewing: rows.find((row) => row.id === viewingId),
    view: setViewingId,
    closeView: () => setViewingId(null),
  }
}
