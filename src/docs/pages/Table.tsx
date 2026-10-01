import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { SetupGuide } from '../layout/SetupGuide'
import { tableContainerPropsData, tablePartsPropsData, tablePropsData } from '../propsData/table'
import { BasicTable } from '../examples/table/BasicTable'
import { TableStates } from '../examples/table/TableStates'
import { BulkActionsTable } from '../examples/table/BulkActions'
import { RowActionsTable } from '../examples/table/RowActions'
import { DropdownActionsTable } from '../examples/table/DropdownActions'
import hookSource from '../examples/table/useInvoiceActions.ts?raw'
import actionsSource from '../examples/table/InvoiceActions.tsx?raw'
import rowActionsSource from '../examples/table/RowActions.tsx?raw'
import dropdownSource from '../examples/table/DropdownActions.tsx?raw'
import type { UsageCodeConfig } from '../utils/deriveUsageCode'
import { ResponsiveTable } from '../examples/table/ResponsiveTable'
import responsiveSource from '../examples/table/ResponsiveTable.tsx?raw'
import basicSource from '../examples/table/BasicTable.tsx?raw'
import statesSource from '../examples/table/TableStates.tsx?raw'
import bulkActionsSource from '../examples/table/BulkActions.tsx?raw'
import { SortableTable } from '../examples/table/SortableTable'
import sortableSource from '../examples/table/SortableTable.tsx?raw'
import { GroupedHeadersTable } from '../examples/table/GroupedHeaders'
import groupedHeadersSource from '../examples/table/GroupedHeaders.tsx?raw'

/** Bundle local example helpers so each PreviewBlock is independently copyable. */
const tableExampleCode = (...sources: string[]): UsageCodeConfig => {
  const componentNames = new Set<string>()
  const manualPath: Record<string, string | string[]> = {}
  const body = sources
    .map((source) =>
      source
        .replace(/^import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]\s*\r?\n/gm, (_, imported: string, path: string) => {
          // These definitions are included in the bundled helper source.
          if (path === './InvoiceActions' || path === './useInvoiceActions') return ''
          const names = imported
            .split(',')
            .map((name) => name.trim())
            .filter(Boolean)
          names.forEach((name) => componentNames.add(name))
          if (path.startsWith('../../../components/')) {
            names.forEach((name) => {
              manualPath[name] = path.replace('../../../', '../../')
            })
          } else {
            manualPath[path] = [...new Set([...((manualPath[path] as string[]) ?? []), ...names])]
          }
          return ''
        })
        .trim()
    )
    .join('\n\n')
  return { body, componentNames: [...componentNames], manualPath }
}

const tableNames = [
  'Table',
  'TableBody',
  'TableCaption',
  'TableCell',
  'TableContainer',
  'TableFooter',
  'TableHead',
  'TableHeader',
  'TableRow',
]
const heading = 'mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)'
const subheading = 'mt-8 mb-4 text-xl font-black text-(--lithos-text)'
const paragraph = 'mb-6 font-body text-base leading-relaxed text-(--lithos-text) opacity-80'

export const TableDoc = () => (
  <div className="max-w-5xl mx-auto px-6 min-w-0">
    <header className="mt-0">
      <h1 className="mb-8 text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text)">Table</h1>
      <p className="mt-2 max-w-2xl text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
        Display structured data with contrasting headers, responsive layouts, sorting, and row actions.
      </p>
      <hr className="border-t-2 border-(--lithos-border) my-8" />
    </header>
    <h2 id="installation" className={heading}>
      Installation
    </h2>
    <SetupGuide
      componentNames={tableNames}
      manualPath="../../components/ui/Table"
      slug="table"
      requires={['utils/cn.ts']}
    />
    <p className={paragraph}>
      Import <code>lithos-ui/tokens.css</code> alongside your Tailwind stylesheet and configure the Lithos theme as
      described in Installation. Basic uses the non-sticky default; States demonstrates a sticky header with
      state-driven feedback. The examples also compose Badge, Button, Checkbox, Input, Spinner, Dialog, Dropdown,
      Select, and the shared Lithos icon components.
    </p>
    <section aria-labelledby="examples" className="mb-12">
      <h2 id="examples" className={heading}>
        Examples
      </h2>
      <h3 id="basic" className={subheading}>
        Basic
      </h3>
      <p className={paragraph}>
        Display invoices with a caption, row labels, and a totals footer. Text wraps naturally, and the container
        scrolls horizontally when the content needs more space.
      </p>
      <PreviewBlock code={tableExampleCode(basicSource)}>
        <BasicTable />
      </PreviewBlock>
      <h3 id="table-states" className={subheading}>
        States
      </h3>
      <p className={paragraph}>
        Use Preview state to switch between inventory, loading, empty, and error views. This demo combines compact,
        striped rows with a sticky header and loading feedback. Add product and Retry restore the sample inventory.
      </p>
      <PreviewBlock code={tableExampleCode(statesSource)}>
        <TableStates />
      </PreviewBlock>
      <h3 id="sortable-table" className={subheading}>
        Sorting
      </h3>
      <p className={paragraph}>
        Activate the Amount header to sort invoices from lowest to highest or highest to lowest. Amounts are sorted
        numerically, and the direction is shown by an arrow and announced to assistive technology.
      </p>
      <PreviewBlock code={tableExampleCode(sortableSource)}>
        <SortableTable />
      </PreviewBlock>
      <h3 id="grouped-headers" className={subheading}>
        Grouped Headers
      </h3>
      <p className={paragraph}>
        Group Online and Retail under Units sold while Product spans both header rows. Scroll the table to see both
        header rows stay visible together.
      </p>
      <PreviewBlock code={tableExampleCode(groupedHeadersSource)}>
        <GroupedHeadersTable />
      </PreviewBlock>
      <h3 id="responsive" className={subheading}>
        Responsive
      </h3>
      <p className={paragraph}>
        Adjust the width slider to move lower-priority columns into expandable row details. Use each row's chevron to
        reveal the hidden values. The layout responds to its container, including narrow panels on a desktop.
      </p>
      <PreviewBlock code={tableExampleCode(responsiveSource)}>
        <ResponsiveTable />
      </PreviewBlock>
      <h3 id="bulk-actions" className={subheading}>
        Bulk Actions
      </h3>
      <p className={paragraph}>
        Select invoices across pages, then duplicate or delete the selection. The header checkbox selects only the
        current page; selections remain when sorting or filtering. Edit is available when exactly one invoice is
        selected.
      </p>
      <p className={paragraph}>
        Changes stay in this demo. Duplicate preserves the current page, filter, and sort, so new rows may appear on
        another page or be hidden by the filter. Action messages identify the affected invoices, including selections
        outside the current view.
      </p>
      <PreviewBlock code={tableExampleCode(hookSource, actionsSource, bulkActionsSource)}>
        <BulkActionsTable />
      </PreviewBlock>
      <h3 id="row-actions" className={subheading}>
        Row Actions
      </h3>
      <p className={paragraph}>
        Add an invoice or use a row's icon buttons to view details, edit the customer name, duplicate, or delete it.
        View opens a dialog; Duplicate appends a row with a new ID and briefly shows a check. Changes stay in this demo.
      </p>
      <PreviewBlock code={tableExampleCode(hookSource, actionsSource, rowActionsSource)}>
        <RowActionsTable />
      </PreviewBlock>
      <h3 id="dropdown-actions" className={subheading}>
        Dropdown Actions
      </h3>
      <p className={paragraph}>
        Open a row's menu to view details, edit the customer name, duplicate, or delete that invoice. The menu opens
        outside the scroll container to avoid clipping and supports keyboard navigation. Changes stay in this demo.
      </p>
      <PreviewBlock code={tableExampleCode(hookSource, actionsSource, dropdownSource)}>
        <DropdownActionsTable />
      </PreviewBlock>
    </section>
    <h2 id="anatomy" className={heading}>
      Anatomy
    </h2>
    <div className="mb-12">
      <CodeViewer
        language="tsx"
        code={`<TableContainer aria-label="Orders">
  <Table>
    <TableCaption>Recent orders</TableCaption>
    <TableHeader>
      <TableRow><TableHead scope="col">Order</TableHead></TableRow>
    </TableHeader>
    <TableBody>
      <TableRow><TableCell>ORD-001</TableCell></TableRow>
    </TableBody>
    <TableFooter>
      <TableRow><TableCell>Total</TableCell></TableRow>
    </TableFooter>
  </Table>
</TableContainer>`}
      />
    </div>
    <h2 id="accessibility" className={heading}>
      Accessibility
    </h2>
    <ul className="mb-8 list-disc ps-6 space-y-3 font-body leading-relaxed">
      <li>
        Name the scroll region and give the table a caption or accessible label. Use scope on column and row headers.
      </li>
      <li>
        Keep native table semantics. Sorting buttons and selection checkboxes provide keyboard interaction; rows are not
        clickable controls.
      </li>
      <li>
        TableRow selection is visual. Use labeled checkboxes to expose selection, and aria-sort on the active sorted
        header.
      </li>
      <li>
        Loading uses aria-busy with a status message outside the busy table. Empty and error rows span the current
        number of visible columns.
      </li>
      <li>
        For sticky headers, set a max-height on TableContainer. The entire header group sticks together, including
        multi-row headers. Separate borders preserve the header divider while scrolling.
      </li>
      <li>
        Text alignment follows writing direction. Use text-end and tabular-nums for numeric columns. Apply
        whitespace-nowrap selectively, and break-all for unbroken identifiers where needed.
      </li>
      <li>
        Use a portal-based Dropdown or Popover for menus that must escape the scroll container. Keep adequate contrast
        when customizing cell or row colors.
      </li>
    </ul>
    <h2 id="api" className={heading}>
      API Reference
    </h2>
    <PropsAccordion title="Table Props" data={tablePropsData} />
    <PropsAccordion title="TableContainer Props" data={tableContainerPropsData} />
    <PropsAccordion title="Table Parts" data={tablePartsPropsData} />
  </div>
)
