import { useRef } from 'react'
import { FiCheck, FiCopy, FiEdit2, FiEye, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi'
import { Button } from '../../../components/ui/Button'
import { Alert } from '../../../components/ui/Alert'
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from '../../../components/ui/Dropdown'
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

const dropdownInvoices = demoInvoices.slice(0, 3)
export const DropdownActionsTable = ({ data = dropdownInvoices }: { data?: Invoice[] }) => {
  const actions = useInvoiceActions(data)
  const triggers = useRef(new Map<string, HTMLButtonElement>())
  return (
    <div className="w-full min-w-0">
      <TableContainer aria-label="Dropdown invoice actions">
        <Table>
          <TableCaption className="caption-top">Open a row menu for invoice actions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Invoice</TableHead>
              <TableHead scope="col">Customer</TableHead>
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
                  <TableCell className="text-end tabular-nums">{currency.format(row.amount)}</TableCell>
                  <TableCell>
                    <Dropdown matchTriggerWidth={false}>
                      <DropdownTrigger
                        asChild
                        ref={(node) => {
                          if (node) triggers.current.set(row.id, node)
                          else triggers.current.delete(row.id)
                        }}
                      >
                        <Button variant="secondary" aria-label={`Actions for ${row.id}`}>
                          {actions.copied.has(row.id) ? (
                            <FiCheck aria-hidden="true" />
                          ) : (
                            <FiMoreHorizontal aria-hidden="true" />
                          )}
                        </Button>
                      </DropdownTrigger>
                      <DropdownContent portaled>
                        <DropdownItem
                          onClick={() => {
                            // Restore a persistent trigger before Dialog captures its return-focus target.
                            triggers.current.get(row.id)?.focus()
                            actions.view(row.id)
                          }}
                        >
                          <FiEye className="mr-2" aria-hidden="true" />
                          View
                        </DropdownItem>
                        <DropdownItem onClick={() => actions.startEdit(row)}>
                          <FiEdit2 className="mr-2" aria-hidden="true" />
                          Edit
                        </DropdownItem>
                        <DropdownItem onClick={() => void actions.copyRows([row], row.id)}>
                          {actions.copied.has(row.id) ? (
                            <FiCheck className="mr-2" aria-hidden="true" />
                          ) : (
                            <FiCopy className="mr-2" aria-hidden="true" />
                          )}
                          {actions.copied.has(row.id) ? 'Copied' : 'Copy'}
                        </DropdownItem>
                        <DropdownSeparator />
                        <DropdownItem onClick={() => actions.deleteRows(new Set([row.id]))}>
                          <FiTrash2 className="mr-2" aria-hidden="true" />
                          Delete
                        </DropdownItem>
                      </DropdownContent>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No invoices remaining.</TableCell>
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
