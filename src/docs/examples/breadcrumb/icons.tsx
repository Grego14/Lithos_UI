import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { IconFolder, IconSettings, IconFileText } from '../../../components/ui/icons'

export const IconBreadcrumbExample = () => (
  <Breadcrumb
    items={[
      { label: 'Lithos UI', href: '#', onClick: (event) => event.preventDefault() },
      {
        label: 'Components',
        href: '#',
        icon: <IconFolder />,
        onClick: (event) => event.preventDefault(),
      },
      {
        label: 'Breadcrumb',
        href: '#',
        icon: <IconSettings />,
        onClick: (event) => event.preventDefault(),
      },
      { label: 'Icon', active: true, icon: <IconFileText /> },
    ]}
  />
)
