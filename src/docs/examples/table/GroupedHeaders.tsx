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

const sales = [
  { product: 'Studio monitor', online: 24, retail: 16 },
  { product: 'Audio interface', online: 18, retail: 12 },
  { product: 'Microphone', online: 32, retail: 21 },
  { product: 'Headphones', online: 45, retail: 28 },
  { product: 'Desk stand', online: 19, retail: 14 },
  { product: 'Pop filter', online: 38, retail: 25 },
  { product: 'Speaker cable', online: 54, retail: 37 },
  { product: 'Acoustic panel', online: 22, retail: 10 },
]

export const GroupedHeadersTable = () => (
  <TableContainer aria-label="Sales by channel" className="max-h-64">
    <Table size="sm" stickyHeader>
      <TableCaption className="caption-top">
        Units sold by channel. Scroll to keep both header rows in view.
      </TableCaption>
      <colgroup span={1} />
      <colgroup span={2} />
      <TableHeader>
        <TableRow>
          <TableHead scope="col" rowSpan={2}>
            Product
          </TableHead>
          <TableHead scope="colgroup" colSpan={2} className="border-current text-center">
            Units sold
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead scope="col" className="text-end">
            Online
          </TableHead>
          <TableHead scope="col" className="text-end">
            Retail
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.map((row) => (
          <TableRow key={row.product}>
            <TableHead scope="row">{row.product}</TableHead>
            <TableCell className="text-end tabular-nums">{row.online}</TableCell>
            <TableCell className="text-end tabular-nums">{row.retail}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)
