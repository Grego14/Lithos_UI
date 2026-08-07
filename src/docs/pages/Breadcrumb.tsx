import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Breadcrumb } from '../../components/ui/Breadcrumb'

const FolderIcon = () => (
  <svg className="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
)

const DocumentIcon = () => (
  <svg className="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
)

const SettingsIcon = () => (
  <svg className="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

export const BreadcrumbDoc = () => {
  const collapsibleCode = `import { Breadcrumb } from '../../components/ui/Breadcrumb'

export const CollapsibleBreadcrumb = () => {
  const items = [
    { label: 'Lithos UI', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Breadcrumb', href: '#' },
    { label: 'Collapsible Breadcrumb', active: true },
  ]

  return (
    <Breadcrumb
      variant="collapsible"
      maxItems={3}
      itemsBeforeCollapse={1}
      itemsAfterCollapse={1}
      items={items}
    />
  )
}`

  const iconNameCode = `import { Breadcrumb } from '../../components/ui/Breadcrumb'

export const IconNameBreadcrumb = () => {
  const items = [
    { label: 'Lithos UI', href: '#' },
    { label: 'Components', href: '#', icon: <FolderIcon /> },
    { label: 'Breadcrumb', href: '#', icon: <SettingsIcon /> },
    { label: 'Icon', active: true, icon: <DocumentIcon /> },
  ]

  return <Breadcrumb variant="icon" items={items} />
}`

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Breadcrumb
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          Navigate with clean, accessible breadcrumbs featuring collapsible paths and icon-supported items.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Breadcrumbs show users where they are and help them navigate back to previous pages without getting lost. Lithos UI offers two simple styles: <strong>Collapsible</strong> to keep long paths tidy, and <strong>Icon</strong> for a visual touch.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Screen readers automatically recognize the breadcrumb landmark (<code>&lt;nav aria-label="Breadcrumb"&gt;</code>) and identify the active page (<code>aria-current="page"</code>) for easy keyboard navigation.
        </p>
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      {/* Type 1: Collapsible */}
      <h3 id="collapsible" className="mb-2 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Collapsible
      </h3>
      <p className="mb-4 text-sm font-body opacity-70 text-(--lithos-text)">
        Automatically truncates middle items when paths get too long. Click the <code>•••</code> ellipsis button to expand hidden items.
      </p>

      <div className="mt-4 mb-16">
        <PreviewBlock
          code={collapsibleCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Breadcrumb.tsx"
        >
          <div className="flex flex-col items-center justify-center p-4">
            <Breadcrumb
              variant="collapsible"
              maxItems={3}
              itemsBeforeCollapse={1}
              itemsAfterCollapse={1}
              items={[
                { label: 'Lithos UI', href: '#' },
                { label: 'Components', href: '#' },
                { label: 'Breadcrumb', href: '#' },
                { label: 'Collapsible Breadcrumb', active: true },
              ]}
            />
          </div>
        </PreviewBlock>
      </div>

      {/* Type 2: Icon */}
      <h3 id="icon" className="mb-2 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Icon
      </h3>
      <p className="mb-4 text-sm font-body opacity-70 text-(--lithos-text)">
        Pairs descriptive icons alongside segment names for enhanced visual clarity and quick hierarchy scanning.
      </p>

      <div className="mt-4 mb-16">
        <PreviewBlock
          code={iconNameCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Breadcrumb.tsx"
        >
          <div className="flex flex-col items-center justify-center p-4">
            <Breadcrumb
              variant="icon"
              items={[
                { label: 'Lithos UI', href: '#' },
                { label: 'Components', href: '#', icon: <FolderIcon /> },
                { label: 'Breadcrumb', href: '#', icon: <SettingsIcon /> },
                { label: 'Icon', active: true, icon: <DocumentIcon /> },
              ]}
            />
          </div>
        </PreviewBlock>
      </div>
    </div>
  )
}

