import { createRef } from 'react'
import { act, render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it, vi, afterEach } from 'vitest'
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
import { IndividualActionsTable } from '../../../docs/examples/table/IndividualActions'
import { DropdownActionsTable } from '../../../docs/examples/table/DropdownActions'
import { ResponsiveTable } from '../../../docs/examples/table/Responsive'
afterEach(() => vi.unstubAllGlobals())
afterEach(() => vi.restoreAllMocks())

describe('Table primitives', () => {
  it('moves overflow columns into accessible details and restores them when space returns', async () => {
    const user = userEvent.setup()
    let onResize: ResizeObserverCallback | undefined
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: ResizeObserverCallback) {
          onResize = callback
        }
        observe() {}
        unobserve() {}
        disconnect() {}
      }
    )
    const resize = (width: number) =>
      act(() => onResize?.([{ contentRect: { width } } as ResizeObserverEntry], {} as ResizeObserver))
    const { container } = render(<ResponsiveTable />)
    resize(300)
    expect(screen.getAllByRole('columnheader')).toHaveLength(3)
    const toggle = screen.getByRole('button', { name: 'Show details for INV-001' })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const detailsTable = screen.getByRole('table', { name: 'Details for INV-001' })
    const paymentMethodLabel = within(detailsTable).getByRole('rowheader', { name: 'Payment method' })
    expect(paymentMethodLabel.closest('tr')?.nextElementSibling).toHaveTextContent('Credit card')
    expect(document.getElementById(toggle.getAttribute('aria-controls')!)).toHaveAttribute('id')
    resize(500)
    expect(screen.getAllByRole('columnheader')).toHaveLength(4)
    expect(
      within(screen.getByRole('table', { name: 'Details for INV-001' })).queryByRole('rowheader', { name: 'Amount' })
    ).toBeNull()
    resize(800)
    expect(screen.getAllByRole('columnheader')).toHaveLength(5)
    expect(screen.queryByRole('button', { name: /details for/ })).toBeNull()
    resize(300)
    expect(screen.getByRole('button', { name: 'Hide details for INV-001' })).toHaveAttribute('aria-expanded', 'true')
    expect(await axe(container)).toHaveNoViolations()
  })
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
    expect(screen.getByText('Preview state')).toHaveClass('mr-2')
    const inventoryTable = screen.getByRole('table', {
      name: 'Inventory preview with a sticky header and compact rows.',
    })
    expect(inventoryTable.querySelector('caption')).toHaveClass('caption-top')
    await user.click(screen.getByLabelText('Preview state'))
    await user.click(screen.getByRole('option', { name: 'Loading' }))
    expect(screen.getByRole('status', { name: 'Loading inventory' })).toBeInTheDocument()
    expect(inventoryTable).toHaveAttribute('aria-busy', 'true')
    expect(screen.getAllByRole('table')).toHaveLength(1)
    expect(within(inventoryTable).getAllByRole('row')).toHaveLength(2)
    await user.click(screen.getByLabelText('Preview state'))
    await user.click(screen.getByRole('option', { name: 'Empty' }))
    expect(within(inventoryTable).getByRole('cell')).toHaveTextContent('No products yet')
    expect(within(inventoryTable).getByRole('cell')).toHaveAttribute('colspan', '3')
    await user.click(screen.getByRole('button', { name: 'Add product' }))
    expect(within(inventoryTable).getAllByRole('row')).toHaveLength(13)
    await user.click(screen.getByLabelText('Preview state'))
    await user.click(screen.getByRole('option', { name: 'Error' }))
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
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await user.type(screen.getByLabelText('Filter invoices'), 'Alex')
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument()
    expect(within(bulkTable).getByRole('rowheader', { name: 'INV-001' })).toBeInTheDocument()
    await user.type(screen.getByLabelText('Filter invoices'), 'not-found')
    expect(within(bulkTable).getByRole('cell')).toHaveAttribute('colspan', '5')
    await user.click(screen.getByLabelText('Show status'))
    expect(within(bulkTable).getByRole('cell')).toHaveAttribute('colspan', '4')
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

  it('supports page-size changes without submitting a surrounding form', async () => {
    const user = userEvent.setup()
    render(
      <form>
        <AdvancedTable />
      </form>
    )
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await user.selectOptions(screen.getByLabelText('Rows per page'), '20')
    expect(screen.getAllByRole('row')).toHaveLength(13)
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy selected' })).toHaveAttribute('type', 'button')
  })

  it('edits locally, rejects blank names, copies, and deletes selected records', async () => {
    const user = userEvent.setup()
    render(<AdvancedTable />)
    await user.click(screen.getByLabelText('Select INV-001'))
    await user.click(screen.getByRole('button', { name: 'Edit selected' }))
    const input = screen.getByRole('textbox', { name: 'Customer for INV-001' })
    expect(input).toHaveFocus()
    await user.clear(input)
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
    expect(screen.getByRole('alert')).toHaveTextContent('required')
    await user.type(input, 'Alex Cooper')
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(screen.getByText('Alex Cooper')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Updated INV-001.')
    await user.click(screen.getByLabelText('Select INV-002'))
    await user.click(screen.getByRole('button', { name: 'Copy selected' }))
    expect(screen.getByRole('rowheader', { name: 'INV-013' })).toBeInTheDocument()
    expect(screen.getByRole('rowheader', { name: 'INV-014' })).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Copied selected' })).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Added invoice copies: INV-001 as INV-013, INV-002 as INV-014.')
    await user.click(screen.getByRole('button', { name: 'Delete selected' }))
    expect(screen.queryByRole('rowheader', { name: 'INV-001' })).not.toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Deleted invoices: INV-001, INV-002.')
    expect(screen.getByText(/0 selected across all pages/)).toBeInTheDocument()
  })

  it('clamps the last page after deletion and disables bulk edit for multiple selections', async () => {
    const user = userEvent.setup()
    render(<AdvancedTable />)
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await user.click(screen.getByLabelText('Select all rows on this page'))
    expect(screen.getByRole('button', { name: 'Edit selected' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Delete selected' }))
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(11)
  })
})

describe('Independent action previews', () => {
  it('opens a detail dialog, restores focus, and leaves other previews unchanged after deletion', async () => {
    const user = userEvent.setup()
    render(
      <>
        <AdvancedTable />
        <IndividualActionsTable />
        <DropdownActionsTable />
      </>
    )
    const trigger = screen.getByRole('button', { name: 'View INV-001' })
    await user.click(trigger)
    const dialog = screen.getByRole('dialog', { name: 'Invoice INV-001' })
    const detailsTable = within(dialog).getByRole('table', { name: 'Details for invoice INV-001' })
    expect(within(detailsTable).getByRole('rowheader', { name: 'Customer' })).toBeInTheDocument()
    expect(within(detailsTable).getByText('Alex Morgan')).toBeInTheDocument()
    expect(within(detailsTable).getByRole('rowheader', { name: 'Payment method' })).toBeInTheDocument()
    expect(within(detailsTable).getByText('Credit card')).toBeInTheDocument()
    expect(await axe(dialog)).toHaveNoViolations()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'Delete INV-001' }))
    expect(within(screen.getByRole('region', { name: 'Individual invoice actions' })).queryByText('INV-001')).toBeNull()
    expect(
      within(screen.getByRole('region', { name: 'Bulk invoice selection' })).getByText('INV-001')
    ).toBeInTheDocument()
    expect(
      within(screen.getByRole('region', { name: 'Dropdown invoice actions' })).getByText('INV-001')
    ).toBeInTheDocument()
  })

  it('copies an invoice into a new row and resets the copied indicator', async () => {
    const user = userEvent.setup()
    render(<IndividualActionsTable />)
    await user.click(screen.getByRole('button', { name: 'Copy INV-001' }))
    expect(screen.getByRole('rowheader', { name: 'INV-004' })).toBeInTheDocument()
    expect(screen.getByRole('row', { name: /INV-004 Alex Morgan Paid \$250\.00/ })).toBeInTheDocument()
    expect(
      within(screen.getByRole('region', { name: 'Individual invoice actions' }))
        .getAllByRole('rowheader')
        .at(-1)
    ).toHaveTextContent('INV-004')
    expect(
      within(screen.getByRole('region', { name: 'Individual invoice actions' }))
        .getAllByRole('rowheader')
        .map((header) => header.textContent)
    ).toEqual(['INV-001', 'INV-002', 'INV-003', 'INV-004'])
    expect(await screen.findByRole('button', { name: 'Copied INV-001' })).toBeInTheDocument()
    expect(await screen.findByRole('alert')).toHaveTextContent('Added copy of INV-001 as INV-004.')
    expect(screen.getByRole('button', { name: 'Copy INV-002' })).toBeInTheDocument()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Copy INV-001' })).toBeInTheDocument(), {
      timeout: 3000,
    })
  })

  it('cancels edits without changing data and saves to the stable record ID', async () => {
    const user = userEvent.setup()
    render(<IndividualActionsTable />)
    await user.click(screen.getByRole('button', { name: 'Edit INV-002' }))
    await user.clear(screen.getByRole('textbox'))
    await user.type(screen.getByRole('textbox'), 'Changed')
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.getByText('Sam Rivera')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Edit INV-002' }))
    await user.clear(screen.getByRole('textbox'))
    await user.type(screen.getByRole('textbox'), 'Changed')
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(screen.getByRole('rowheader', { name: 'INV-002' }).closest('tr')).toHaveTextContent('Changed')
  })

  it('portals dropdown menus, supports keyboard actions, and restores focus after View', async () => {
    const user = userEvent.setup()
    render(<DropdownActionsTable />)
    const trigger = screen.getByRole('button', { name: 'Actions for INV-001' })
    await user.click(trigger)
    const menu = await screen.findByRole('menu')
    expect(menu.closest('table')).toBeNull()
    const view = within(menu).getByRole('menuitem', { name: 'View' })
    await waitFor(() => expect(view).toHaveFocus())
    await user.keyboard('{Enter}')
    expect(await screen.findByRole('dialog', { name: 'Invoice INV-001' })).toBeInTheDocument()
    await user.keyboard('{Escape}')
    await waitFor(() => expect(trigger).toHaveFocus())
    await user.click(trigger)
    await user.click(await screen.findByRole('menuitem', { name: 'Copy' }))
    expect(screen.getByRole('rowheader', { name: 'INV-004' })).toBeInTheDocument()
    expect(await screen.findByRole('alert')).toHaveTextContent('Added copy of INV-001 as INV-004.')
    await user.click(trigger)
    expect(await screen.findByRole('menuitem', { name: 'Copied' })).toBeInTheDocument()
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }))
    expect(await screen.findByRole('textbox', { name: 'Customer for INV-001' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    await user.click(trigger)
    await user.click(await screen.findByRole('menuitem', { name: 'Delete' }))
    expect(screen.queryByRole('rowheader', { name: 'INV-001' })).toBeNull()
    expect(await screen.findByRole('alert')).toHaveTextContent('Deleted invoice INV-001.')
  })

  it('adds a row and announces the action with an alert', async () => {
    const user = userEvent.setup()
    render(<IndividualActionsTable />)
    await user.click(screen.getByRole('button', { name: 'New row' }))
    expect(screen.getByRole('rowheader', { name: 'INV-004' })).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Added INV-004.')
  })
})
