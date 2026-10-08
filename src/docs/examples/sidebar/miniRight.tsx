import {
  Sidebar,
  SidebarContent,
  SidebarItem,
  SidebarTrigger,
  SidebarHeader,
  SidebarTitle,
} from '../../../components/ui/Sidebar'
import { Typography } from '../../../components/ui/Typography'
import { useState } from 'react'
import { IconHome } from '../../../components/ui/icons/IconHome'
import { IconFolder } from '../../../components/ui/icons/IconFolder'
import { IconSettings } from '../../../components/ui/icons/IconSettings'

const items = [
  { icon: <IconHome size={22} strokeWidth={2} />, label: 'Dashboard', id: 'item-0' },
  { icon: <IconFolder size={22} strokeWidth={2} />, label: 'Projects', id: 'item-1' },
  { icon: <IconSettings size={22} strokeWidth={2} />, label: 'Settings', id: 'item-2' },
]

const cards = [
  { title: 'Total Users', text: '1,240' },
  { title: 'Conversion Rate', text: '85%' },
  { title: 'Server Latency', text: '12 ms' },
]

export const ExampleRightMini = () => {
  const [active, setActive] = useState('item-0')

  return (
    <div className="flex h-screen w-full bg-(--lithos-surface) overflow-hidden">
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 space-y-6">
        <header className="border-b-2 border-(--lithos-border) pb-4">
          <Typography variant="h2" className="font-black uppercase">
            Main Dashboard
          </Typography>
          <Typography className="opacity-80">
            Overview of the layout integration with Sidebar on the right side.
          </Typography>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              className="p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]"
              key={card.title}
            >
              <Typography variant="h6" className="font-bold mb-1">
                {card.title}
              </Typography>
              <Typography variant="h3" as="p" className="font-black">
                {card.text}
              </Typography>
            </div>
          ))}
        </section>

        <section className="p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-border)] flex-1 min-h-[200px]">
          <Typography variant="h5" as="h2" className="mb-2">
            Active View: <Typography variant="mark">{active}</Typography>
          </Typography>
          <Typography className="mb-2">Content related to the selected item goes here.</Typography>
        </section>
      </main>

      <Sidebar mode="mini" placement="right" role="navigation">
        <SidebarContent className="p-2 space-y-2">
          <SidebarHeader>
            <SidebarTrigger />
            <SidebarTitle>Lithos</SidebarTitle>
          </SidebarHeader>

          {items.map((item) => (
            <SidebarItem key={item.id} icon={item.icon} active={active === item.id} onClick={() => setActive(item.id)}>
              {item.label}
            </SidebarItem>
          ))}
        </SidebarContent>
      </Sidebar>
    </div>
  )
}
