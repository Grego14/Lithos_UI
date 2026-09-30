import { FiCheck, FiCopy, FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi'
import { Button } from '../../../components/ui/Button'
import { Alert } from '../../../components/ui/Alert'
import { Badge } from '../../../components/ui/Badge'
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
import { InvoiceEditor, InvoiceDetails } from './InvoiceActions'

const individualInvoices = demoInvoices.slice(0, 3)
export const IndividualActionsTable = ({ data = individualInvoices }: { data?: Invoice[] }) => {
  const actions = useInvoiceActions(data)
  return (
    <div className="w-full min-w-0">
      <Button className="mb-3" onClick={actions.addRow}>
        New row
      </Button>
      <TableContainer aria-label="Individual invoice actions">
        <Table>
          <TableCaption className="caption-top">View, edit, delete, or copy an individual invoice.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Invoice</TableHead>
              <TableHead scope="col">Customer</TableHead>
              <TableHead scope="col">Status</TableHead>
              <TableHead scope="col" className="text-end">
                Amount
              </TableHead>
              <TableHead scope="col">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actions.rows.length ? (
              actions.rows.map((row) => (
                <TableRow key={row.id}>
                  <TableHead scope="row" className="whitespace-nowrap">
                    {row.id}
                  </TableHead>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>
                    <Badge intent={row.status === 'Paid' ? 'success' : 'warning'}>{row.status}</Badge>
                  </TableCell>
                  <TableCell className="text-end tabular-nums">{currency.format(row.amount)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Button
                        variant="text"
                        className="mr-1 p-2"
                        aria-label={`View ${row.id}`}
                        title="View invoice"
                        onClick={() => actions.view(row.id)}
                      >
                        <FiEye aria-hidden="true" />
                      </Button>
                      <Button
                        variant="text"
                        className="mr-1 p-2"
                        aria-label={`Edit ${row.id}`}
                        title="Edit invoice"
                        onClick={() => actions.startEdit(row)}
                      >
                        <FiEdit2 aria-hidden="true" />
                      </Button>
                      <Button
                        variant="text"
                        className="mr-1 p-2"
                        aria-label={`Delete ${row.id}`}
                        title="Delete invoice"
                        onClick={() => actions.deleteRows(new Set([row.id]))}
                      >
                        <FiTrash2 aria-hidden="true" />
                      </Button>
                      <Button
                        variant="text"
                        className="p-2"
                        aria-label={`${actions.copied.has(row.id) ? 'Copied' : 'Copy'} ${row.id}`}
                        title={actions.copied.has(row.id) ? 'Copied' : 'Copy invoice row'}
                        onClick={() => void actions.copyRows([row], row.id)}
                      >
                        {actions.copied.has(row.id) ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No invoices remaining.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <InvoiceEditor actions={actions} />
      {actions.notice && (
        <Alert intent={actions.notice.intent} size="sm" variant="outlined" className="mt-3 max-w-none">
          {actions.notice.message}
        </Alert>
      )}
      <InvoiceDetails actions={actions} />
    </div>
  )
}
