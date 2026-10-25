import { Breadcrumb } from '../../../components/ui/Breadcrumb'

export const CustomSeparatorBreadcrumbExample = () => (
  <Breadcrumb
    items={[
      { label: 'Lithos UI', href: '#', onClick: (event) => event.preventDefault() },
      { label: 'Components', href: '#', onClick: (event) => event.preventDefault() },
      { label: 'Breadcrumb', active: true },
    ]}
    separator={<span className="text-(--lithos-accent)">/</span>}
  />
)
