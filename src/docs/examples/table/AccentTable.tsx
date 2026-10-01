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

export const AccentTable = () => (
  <TableContainer aria-label="Invoices with an accent header">
    <Table>
      <TableCaption className="caption-top">The header follows your selected accent color.</TableCaption>
      <TableHeader variant="accent">
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
      </TableBody>
    </Table>
  </TableContainer>
)
