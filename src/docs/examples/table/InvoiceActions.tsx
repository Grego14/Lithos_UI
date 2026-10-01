import { useEffect, useId, useRef } from 'react'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Dialog, DialogHeader, DialogTitle, DialogBody } from '../../../components/ui/Dialog'
import { Table, TableBody, TableCell, TableHead, TableRow } from '../../../components/ui/Table'
import { currency, type useInvoiceActions } from './useInvoiceActions'

export const InvoiceEditor = ({ actions }: { actions: ReturnType<typeof useInvoiceActions> }) => {
  const errorId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (actions.editingId) inputRef.current?.focus()
  }, [actions.editingId])
  if (!actions.editingId) return null
  return (
    <div className="my-4 border-2 border-(--lithos-border) p-4" role="group" aria-label={`Edit ${actions.editingId}`}>
      <label className="block font-bold">
        Customer for {actions.editingId}
        <Input
          ref={inputRef}
          className="mt-2"
          value={actions.editedCustomer}
          aria-invalid={!actions.editedCustomer.trim()}
          aria-describedby={!actions.editedCustomer.trim() ? errorId : undefined}
          onChange={(event) => actions.setEditedCustomer(event.target.value)}
        />
      </label>
      {!actions.editedCustomer.trim() && (
        <p id={errorId} className="mt-2 text-sm font-bold">
          Customer name is required for {actions.editingId}.
        </p>
      )}
      <div className="mt-3 flex">
        <Button className="mr-3" disabled={!actions.editedCustomer.trim()} onClick={actions.saveEdit}>
          Save
        </Button>
        <Button variant="secondary" onClick={actions.cancelEdit}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export const InvoiceDetails = ({ actions }: { actions: ReturnType<typeof useInvoiceActions> }) => (
  <Dialog open={Boolean(actions.viewing)} onClose={actions.closeView} size="sm">
    <DialogHeader>
      <DialogTitle>Invoice {actions.viewing?.id}</DialogTitle>
    </DialogHeader>
    <DialogBody>
      <Table size="sm" aria-label={`Details for invoice ${actions.viewing?.id}`}>
        <TableBody>
          <TableRow>
            <TableHead scope="row">Customer</TableHead>
            <TableCell>{actions.viewing?.customer}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead scope="row">Status</TableHead>
            <TableCell>{actions.viewing?.status}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead scope="row">Amount</TableHead>
            <TableCell>{currency.format(actions.viewing?.amount ?? 0)}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead scope="row">Payment method</TableHead>
            <TableCell>{actions.viewing?.method ?? 'Not specified'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </DialogBody>
  </Dialog>
)
