import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { IconFolder } from '../../../components/ui/icons/IconFolder'
import { IconSettings } from '../../../components/ui/icons/IconSettings'
import { IconFileText } from '../../../components/ui/icons/IconFileText'

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
