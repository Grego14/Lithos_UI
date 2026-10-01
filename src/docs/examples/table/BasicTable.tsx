import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/Table'

export const BasicTable = () => (
  <TableContainer aria-label="Recent invoices" className="w-full">
    <Table>
      <TableCaption className="caption-top">Three recent invoices, in USD.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Invoice</TableHead>
          <TableHead scope="col">Status</TableHead>
          <TableHead scope="col" className="text-end">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHead scope="row">INV-001</TableHead>
          <TableCell>Paid</TableCell>
          <TableCell className="text-end tabular-nums">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableHead scope="row">INV-002</TableHead>
          <TableCell>Pending</TableCell>
          <TableCell className="text-end tabular-nums">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableHead scope="row">INV-003</TableHead>
          <TableCell>Paid</TableCell>
          <TableCell className="text-end tabular-nums">$350.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableHead scope="row" colSpan={2}>
            Total
          </TableHead>
          <TableCell className="text-end tabular-nums">$750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </TableContainer>
)
