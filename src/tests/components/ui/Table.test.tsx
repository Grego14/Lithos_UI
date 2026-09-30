import { createRef } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
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
import { BasicTable } from '../../../docs/examples/table/Basic'
import { IntermediateTable } from '../../../docs/examples/table/Intermediate'
import { AdvancedTable } from '../../../docs/examples/table/Advanced'

describe('Table primitives', () => {
  it('preserves table semantics, header associations, spans, native props and refs', () => {
    const tableRef = createRef<HTMLTableElement>()
    const containerRef = createRef<HTMLDivElement>()
    const headRef = createRef<HTMLTableCellElement>()
    const cellRef = createRef<HTMLTableCellElement>()
    render(
      <TableContainer aria-label="Orders region" ref={containerRef}>
        <Table ref={tableRef} id="orders">
          <TableCaption>Orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead ref={headRef} scope="col" colSpan={2} aria-sort="ascending">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableHead scope="row">Order 1</TableHead>
              <TableCell ref={cellRef} rowSpan={2}>
                Paid
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead scope="row">Order 2</TableHead>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    )
    expect(tableRef.current).toBe(screen.getByRole('table', { name: 'Orders' }))
    expect(tableRef.current).toHaveAttribute('id', 'orders')
    expect(containerRef.current).toBe(screen.getByRole('region', { name: 'Orders region' }))
    expect(headRef.current).toHaveAttribute('scope', 'col')
    expect(headRef.current).toHaveAttribute('colspan', '2')
    expect(headRef.current).toHaveAttribute('aria-sort', 'ascending')
    expect(cellRef.current).toHaveAttribute('rowspan', '2')
    expect(screen.getByText('Total').closest('tfoot')).not.toBeNull()
  })

  it('allows keyboard focus on the scrolling region and consumer class overrides', async () => {
    const user = userEvent.setup()
    render(
      <TableContainer aria-label="Wide table" className="shadow-none">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="px-8">Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
    await user.tab()
    expect(screen.getByRole('region')).toHaveFocus()
    expect(screen.getByRole('region')).toHaveClass('shadow-none')
    expect(screen.getByRole('region').className).not.toContain('shadow-[4px')
    expect(screen.getByRole('cell')).toHaveClass('px-8')
    expect(screen.getByRole('cell').className).not.toContain('px-(--table-cell-x)')
  })

  it('changes visual selection without adding incorrect interactive row semantics', () => {
    const { rerender } = render(
      <Table>
        <TableBody>
          <TableRow selected>
            <TableCell>Selected</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByRole('row')).toHaveAttribute('data-state', 'selected')
    expect(screen.getByRole('row')).not.toHaveAttribute('tabindex')
    expect(screen.getByRole('row')).not.toHaveAttribute('aria-selected')
    rerender(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Selected</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByRole('row')).not.toHaveAttribute('data-state')
  })

  it('has no automated accessibility violations in the basic example', async () => {
    const { container } = render(<BasicTable />)
    expect(screen.getByRole('table', { name: 'Three recent invoices, in USD.' }).querySelector('caption')).toHaveClass(
      'caption-top'
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('Intermediate table states', () => {
  it('updates one table for loading, empty, and error states', async () => {
    const user = userEvent.setup()
    render(<IntermediateTable />)
    const inventoryTable = screen.getByRole('table', {
      name: 'Inventory preview with a sticky header and compact rows.',
    })
    expect(inventoryTable.querySelector('caption')).toHaveClass('caption-top')
    await user.selectOptions(screen.getByLabelText('Preview state'), 'loading')
    expect(screen.getByRole('status', { name: 'Loading inventory' })).toBeInTheDocument()
    expect(inventoryTable).toHaveAttribute('aria-busy', 'true')
    expect(screen.getAllByRole('table')).toHaveLength(1)
    expect(within(inventoryTable).getAllByRole('row')).toHaveLength(2)
    await user.selectOptions(screen.getByLabelText('Preview state'), 'empty')
    expect(within(inventoryTable).getByRole('cell')).toHaveTextContent('No products yet')
    expect(within(inventoryTable).getByRole('cell')).toHaveAttribute('colspan', '3')
    await user.click(screen.getByRole('button', { name: 'Add product' }))
    expect(within(inventoryTable).getAllByRole('row')).toHaveLength(13)
    await user.selectOptions(screen.getByLabelText('Preview state'), 'error')
    expect(within(inventoryTable).getByRole('alert')).toHaveTextContent('Inventory could not be loaded')
    await user.click(screen.getByRole('button', { name: 'Retry' }))
    expect(within(inventoryTable).getAllByRole('row')).toHaveLength(13)
    expect(within(inventoryTable).getAllByRole('rowheader')[0]).toHaveTextContent('Studio monitor')
  })
})

describe('Advanced table recipe', () => {
  it('sorts amounts numerically and keeps selection attached to the record', async () => {
    const user = userEvent.setup()
    render(<AdvancedTable />)
    const bulkTable = screen.getByRole('table', { name: /Bulk selection table/ })
    await user.click(screen.getByLabelText('Select INV-002'))
    await user.click(screen.getByRole('button', { name: 'Amount' }))
    expect(within(bulkTable).getAllByRole('row')[1]).toHaveTextContent('INV-006')
    expect(within(bulkTable).getByRole('columnheader', { name: 'Amount' })).toHaveAttribute('aria-sort', 'ascending')
    expect(screen.getByLabelText('Select INV-002')).toBeChecked()
    await user.click(screen.getByRole('button', { name: 'Amount' }))
    expect(within(bulkTable).getAllByRole('row')[1]).toHaveTextContent('INV-003')
    expect(within(bulkTable).getByRole('columnheader', { name: 'Amount' })).toHaveAttribute('aria-sort', 'descending')
    await user.click(screen.getByRole('button', { name: 'Customer' }))
    expect(within(bulkTable).getByRole('columnheader', { name: 'Amount' })).not.toHaveAttribute('aria-sort')
  })

  it('resets pagination when filtering, and calculates empty-state spans from visible columns', async () => {
    const user = userEvent.setup()
    const { container } = render(<AdvancedTable />)
    const bulkTable = screen.getByRole('table', { name: /Bulk selection table/ })
    const individualTable = screen.getByRole('table', { name: /Individual actions table/ })
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await user.type(screen.getByLabelText('Filter invoices'), 'Alex')
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument()
    expect(within(bulkTable).getByRole('rowheader', { name: 'INV-001' })).toBeInTheDocument()
    await user.type(screen.getByLabelText('Filter invoices'), 'not-found')
    expect(within(bulkTable).getByRole('cell')).toHaveAttribute('colspan', '5')
    expect(within(individualTable).getByRole('cell')).toHaveAttribute('colspan', '5')
    await user.click(screen.getByLabelText('Show status'))
    expect(within(bulkTable).getByRole('cell')).toHaveAttribute('colspan', '4')
    expect(within(individualTable).getByRole('cell')).toHaveAttribute('colspan', '4')
    expect(screen.getByLabelText('Select all rows on this page')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('selects only the current page, exposes mixed selection, and clears hidden selections', async () => {
    const user = userEvent.setup()
    render(<AdvancedTable />)
    const bulkTable = screen.getByRole('table', { name: /Bulk selection table/ })
    expect(within(bulkTable).getAllByRole('row')).toHaveLength(11)
    await user.click(screen.getByLabelText('Select INV-001'))
    expect(screen.getByLabelText('Select all rows on this page')).toBePartiallyChecked()
    await user.click(screen.getByLabelText('Select all rows on this page'))
    expect(screen.getByText(/10 selected across all pages/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByLabelText('Select all rows on this page')).not.toBeChecked()
    expect(screen.getByLabelText('Select INV-011')).not.toBeChecked()
    await user.type(screen.getByLabelText('Filter invoices'), 'Robin')
    expect(screen.getByText(/10 selected across all pages/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Clear selection' }))
    expect(screen.getByText(/0 selected across all pages/)).toBeInTheDocument()
  })

  it('clamps pages and prunes selection when records disappear', async () => {
    const user = userEvent.setup()
    const data = Array.from({ length: 12 }, (_, index) => ({
      id: `row-${index}`,
      customer: `Customer ${index}`,
      status: 'Paid' as const,
      amount: index,
    }))
    const { rerender } = render(<AdvancedTable data={data} />)
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await user.click(screen.getByLabelText('Select row-11'))
    rerender(<AdvancedTable data={data.slice(0, 2)} />)
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument()
    expect(screen.getByText(/0 selected across all pages/)).toBeInTheDocument()
    rerender(<AdvancedTable data={data} />)
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
    expect(screen.getByText(/0 selected across all pages/)).toBeInTheDocument()
  })

  it('supports page-size changes and row actions without submitting a surrounding form', async () => {
    const user = userEvent.setup()
    render(
      <form>
        <AdvancedTable />
      </form>
    )
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await user.selectOptions(screen.getByLabelText('Rows per page'), '20')
    expect(screen.getAllByRole('row')).toHaveLength(26)
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit INV-001' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete INV-001' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy INV-001' })).toBeInTheDocument()
    const action = screen.getByRole('button', { name: 'View INV-001' })
    expect(action).toHaveAttribute('type', 'button')
    await user.click(action)
    expect(screen.getByText('INV-001: Alex Morgan, paid, $250.00.')).toBeInTheDocument()
    const bulkTable = screen.getByRole('table', { name: /Bulk selection table/ })
    const header = within(bulkTable).getAllByRole('row')[0]!
    expect(within(header).getAllByRole('columnheader')).toHaveLength(5)
    expect(bulkTable.querySelector('caption')).toHaveClass('caption-top')
    expect(screen.getByRole('table', { name: /Individual actions table/ }).querySelector('caption')).toHaveClass(
      'caption-top'
    )
  })

  it('edits, copies, and deletes selected records with bulk actions', async () => {
    const user = userEvent.setup()
    render(<AdvancedTable />)
    const bulkTable = screen.getByRole('table', { name: /Bulk selection table/ })
    const individualTable = screen.getByRole('table', { name: /Individual actions table/ })
    await user.click(screen.getByLabelText('Select INV-001'))
    await user.click(screen.getByRole('button', { name: 'Edit selected' }))
    await user.clear(screen.getByRole('textbox', { name: 'Edit customer INV-001' }))
    await user.type(screen.getByRole('textbox', { name: 'Edit customer INV-001' }), 'Alex Cooper')
    await user.click(screen.getByRole('button', { name: 'Save INV-001' }))
    expect(within(individualTable).getByText('Alex Cooper')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Copy selected' }))
    expect(screen.getByText(/invoice IDs: INV-001/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Delete selected' }))
    expect(within(bulkTable).queryByRole('rowheader', { name: 'INV-001' })).not.toBeInTheDocument()
    expect(within(individualTable).queryByRole('rowheader', { name: 'INV-001' })).not.toBeInTheDocument()
    expect(screen.getByText(/0 selected across all pages/)).toBeInTheDocument()
  })
})
