import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { SetupGuide } from '../layout/SetupGuide'
import { tableContainerPropsData, tablePartsPropsData, tablePropsData } from '../propsData/table'
import { BasicTable } from '../examples/table/Basic'
import { IntermediateTable } from '../examples/table/Intermediate'
import { AdvancedTable } from '../examples/table/Advanced'
import { IndividualActionsTable } from '../examples/table/IndividualActions'
import { DropdownActionsTable } from '../examples/table/DropdownActions'
import hookSource from '../examples/table/useInvoiceActions.ts?raw'
import actionsSource from '../examples/table/InvoiceActions.tsx?raw'
import individualSource from '../examples/table/IndividualActions.tsx?raw'
import dropdownSource from '../examples/table/DropdownActions.tsx?raw'
import type { UsageCodeConfig } from '../utils/deriveUsageCode'
import { ResponsiveTable } from '../examples/table/Responsive'
import responsiveSource from '../examples/table/Responsive.tsx?raw'
import basicSource from '../examples/table/Basic.tsx?raw'
import intermediateSource from '../examples/table/Intermediate.tsx?raw'
import advancedSource from '../examples/table/Advanced.tsx?raw'

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
        Clear structure. Bold borders. From a simple invoice list to an interactive data table.
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
      described in Installation. The Basic example uses the non-sticky default; the Intermediate example demonstrates a
      sticky header and a separate state-driven preview table. The Advanced example uses Badge, Button, Checkbox, Input,
      Spinner, Dialog, Dropdown, Select, and icons from <code>react-icons/fi</code>.
    </p>
    <section aria-labelledby="examples" className="mb-12">
      <h2 id="examples" className={heading}>
        Examples
      </h2>
      <h3 id="basic" className={subheading}>
        Basic
      </h3>
      <p className={paragraph}>
        A non-sticky semantic table with a caption and totals footer. The container scrolls horizontally when content
        needs more space; normal text can wrap.
      </p>
      <PreviewBlock code={tableExampleCode(basicSource)}>
        <BasicTable />
      </PreviewBlock>
      <h3 id="intermediate" className={subheading}>
        Intermediate
      </h3>
      <p className={paragraph}>
        Compact rows, stripes, hover feedback, and a sticky header. The Preview state control changes this table between
        ready, loading, empty, and error. Loading uses a centered Spinner with its label below; Add product and Retry
        return the table to ready.
      </p>
      <PreviewBlock code={tableExampleCode(intermediateSource)}>
        <IntermediateTable />
      </PreviewBlock>
      <h3 id="responsive" className={subheading}>
        Responsive
      </h3>
      <p className={paragraph}>
        When space runs out, lower-priority columns move into expandable row details. Use the chevron to reveal them.
        This responds to the table container, including narrow panels on a desktop.
      </p>
      <PreviewBlock code={tableExampleCode(responsiveSource)}>
        <ResponsiveTable />
      </PreviewBlock>
      <h3 id="advanced" className={subheading}>
        Advanced
      </h3>
      <p className={paragraph}>
        Explore bulk selection, individual icon actions, and dropdown actions in independent previews. All changes stay
        in the local demo. Copy actions add duplicate rows, and action results appear as alerts. Records use persistent
        IDs for keys and action targets.
      </p>
      <h4 id="bulk-actions" className={subheading}>
        Bulk Actions
      </h4>
      <p className={paragraph}>
        Sort, filter, paginate, and select invoices. Edit is enabled for exactly one selected record. Copy shows a check
        after success; Delete removes the selected records across all pages.
      </p>
      <PreviewBlock code={tableExampleCode(hookSource, actionsSource, advancedSource)}>
        <AdvancedTable />
      </PreviewBlock>
      <h4 id="individual-actions" className={subheading}>
        Individual Actions
      </h4>
      <p className={paragraph}>
        Add a new invoice row, view invoice details in a table, or edit and delete an invoice. Copy adds a duplicate row
        with a new invoice ID and changes to a check for two seconds.
      </p>
      <PreviewBlock code={tableExampleCode(hookSource, actionsSource, individualSource)}>
        <IndividualActionsTable />
      </PreviewBlock>
      <h4 id="dropdown-actions" className={subheading}>
        Dropdown Actions
      </h4>
      <p className={paragraph}>
        The same row actions inside a portaled Lithos Dropdown. The trigger briefly shows a check after copying, and the
        menu shows the corresponding Copied state. Copy adds a duplicate invoice row with a new ID.
      </p>
      <PreviewBlock code={tableExampleCode(hookSource, actionsSource, dropdownSource)}>
        <DropdownActionsTable />
      </PreviewBlock>
    </section>
    <h2 id="anatomy" className={heading}>
      Anatomy
    </h2>
    <div className="mb-12">
      <p className={paragraph}>Compose the table with native header, body, footer, row, and cell primitives:</p>
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
  </Table>
</TableContainer>`}
      />
      <p className={paragraph}>
        TableContainer owns the frame and scroll behavior; Table forwards its props and ref directly to the native
        table. TableHead is a header cell, while TableHeader groups header rows. Use native colgroup, col, colSpan, and
        rowSpan for column sizing and grouped headers.
      </p>
      <p className={paragraph}>
        The advanced example expects a complete dataset with unique, persistent IDs; it is not a server-data adapter.
        For server pagination, send sorting, filtering, and page parameters to your API together, and use the server's
        total count. Do not sort or filter only one downloaded page. Cancel superseded requests with AbortController or
        ignore stale responses, and define whether selection covers loaded rows or all matching records. For larger
        datasets, compose these primitives with a headless table library such as TanStack Table; virtualization,
        editable cells, and column resizing are application-level concerns.
      </p>
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
