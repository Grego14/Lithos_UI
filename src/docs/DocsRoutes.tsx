import { Routes, Route } from 'react-router-dom'
import { DocsLayout } from './DocsLayout'

// Static imports group all these pages into a single shared chunk
import { Introduction } from './pages/Introduction'
import { Installation } from './pages/Installation'

import { AlertDoc } from './pages/Alert'
import { AvatarDoc } from './pages/Avatar'
import { AccordionDoc } from './pages/Accordion'
import { BadgeDoc } from './pages/Badge'
import { BreadcrumbDoc } from './pages/Breadcrumb'
import { ButtonDoc } from './pages/Button'
import { CalendarDoc } from './pages/Calendar'
import { CardDoc } from './pages/Card'
import { CarouselDoc } from './pages/Carousel'
import { IconsDoc } from './pages/Icons'
import { InputDoc } from './pages/Input'
import { CheckboxDoc } from './pages/Checkbox'
import { CommandDoc } from './pages/Command'
import { DialogDoc } from './pages/Dialog'
import { DropdownDoc } from './pages/Dropdown'
import { DrawerDoc } from './pages/Drawer'
import { KbdDoc } from './pages/Kbd'
import { PopoverPage } from './pages/Popover'
import { SelectDoc } from './pages/Select'
import { SidebarDoc } from './pages/Sidebar'
import { SkeletonDoc } from './pages/Skeleton'
import { SliderDoc } from './pages/Slider'
import { SpinnerDoc } from './pages/Spinner'
import { ToastDoc } from './pages/Toast'
import { ToggleDoc } from './pages/Toggle'
import { TabsDoc } from './pages/Tabs'
import { TableDoc } from './pages/Table'
import { PaginationDoc } from './pages/Pagination'
import { TypographyDoc } from './pages/Typography'
import { TooltipDoc } from './pages/Tooltip'
import { MarqueeDoc } from './pages/Marquee'

const docPages = [
  { path: '', component: Introduction },
  { path: 'installation', component: Installation },

  { path: 'alert', component: AlertDoc },
  { path: 'avatar', component: AvatarDoc },
  { path: 'accordion', component: AccordionDoc },
  { path: 'badge', component: BadgeDoc },
  { path: 'breadcrumb', component: BreadcrumbDoc },
  { path: 'button', component: ButtonDoc },
  { path: 'calendar', component: CalendarDoc },
  { path: 'card', component: CardDoc },
  { path: 'carousel', component: CarouselDoc },
  { path: 'icons', component: IconsDoc },
  { path: 'input', component: InputDoc },
  { path: 'checkbox', component: CheckboxDoc },
  { path: 'command', component: CommandDoc },
  { path: 'dialog', component: DialogDoc },
  { path: 'dropdown', component: DropdownDoc },
  { path: 'drawer', component: DrawerDoc },
  { path: 'kbd', component: KbdDoc },
  { path: 'marquee', component: MarqueeDoc },
  { path: 'popover', component: PopoverPage },
  { path: 'select', component: SelectDoc },
  { path: 'sidebar', component: SidebarDoc },
  { path: 'skeleton', component: SkeletonDoc },
  { path: 'slider', component: SliderDoc },
  { path: 'spinner', component: SpinnerDoc },
  { path: 'toast', component: ToastDoc },
  { path: 'toggle', component: ToggleDoc },
  { path: 'tabs', component: TabsDoc },
  { path: 'table', component: TableDoc },
  { path: 'pagination', component: PaginationDoc },
  { path: 'typography', component: TypographyDoc },
  { path: 'tooltip', component: TooltipDoc },
]

export const DocsRoutes = () => {
  return (
    <DocsLayout>
      <Routes>
        {docPages.map(({ path, component: Component }) => (
          <Route key={path || 'index'} path={`${path ? `/${path}` : ''}`} element={<Component />} />
        ))}
      </Routes>
    </DocsLayout>
  )
}
