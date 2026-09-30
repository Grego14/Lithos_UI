import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { SetupGuide } from '../layout/SetupGuide'
import { tableContainerPropsData, tablePartsPropsData, tablePropsData } from '../propsData/table'
import { BasicTable } from '../examples/table/Basic'
import { IntermediateTable } from '../examples/table/Intermediate'
import { AdvancedTable } from '../examples/table/Advanced'
import basicSource from '../examples/table/Basic.tsx?raw'
import intermediateSource from '../examples/table/Intermediate.tsx?raw'
import advancedSource from '../examples/table/Advanced.tsx?raw'

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
// Read imports from the real example so formatted multi-line imports and copied code stay in sync.
const sourceExample = (source: string) => {
  const names = [...source.matchAll(/^import\s*\{([^}]+)\}\s*from\s*['"][^'"]+['"]/gm)].flatMap((match) =>
    (match[1] ?? '')
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean)
  )
  return {
    body: source.replace(/^import\s*\{[^}]+\}\s*from\s*['"][^'"]+['"]\s*\r?\n/gm, '').trim(),
    componentNames: names,
    manualPath: {
      others: '../../components/ui/Table',
      react: ['useEffect', 'useId', 'useState'],
      'react-icons/fi': ['FiCopy', 'FiEdit2', 'FiEye', 'FiSave', 'FiTrash2', 'FiX'],
      Badge: '../../components/ui/Badge',
      Button: '../../components/ui/Button',
      Checkbox: '../../components/ui/Checkbox',
      Input: '../../components/ui/Input',
      Spinner: '../../components/ui/Spinner',
    },
  }
}
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
      Spinner, and icons from <code>react-icons/fi</code>.
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
      <PreviewBlock code={sourceExample(basicSource)}>
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
      <PreviewBlock code={sourceExample(intermediateSource)}>
        <IntermediateTable />
      </PreviewBlock>
      <h3 id="advanced" className={subheading}>
        Advanced
      </h3>
      <p className={paragraph}>
        Two separate tables demonstrate selection and actions. The first provides numeric and text sorting, filtering,
        10 rows per page, stable-ID selection, and icon-only bulk actions in its caption beside the results and
        selection summary. The second provides icon-only View/Edit/Delete/Copy actions for individual rows. Custom
        pagination and page-size controls remain part of the example.
      </p>
      <PreviewBlock code={sourceExample(advancedSource)}>
        <AdvancedTable />
      </PreviewBlock>
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
    </section>
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
