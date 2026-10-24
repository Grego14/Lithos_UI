import { Breadcrumb } from '../../../components/ui/Breadcrumb'

const items = [
  { label: 'Lithos UI', href: '#' },
  { label: 'Components', href: '#' },
  { label: 'Breadcrumb', href: '#' },
  { label: 'Collapsible Breadcrumb', active: true },
]

export const CollapsibleBreadcrumbExample = () => (
  <Breadcrumb
    mode="collapsible"
    maxItems={3}
    itemsBeforeCollapse={1}
    itemsAfterCollapse={1}
    items={items.map((item) => ({ ...item, onClick: (event) => event.preventDefault() }))}
  />
)
