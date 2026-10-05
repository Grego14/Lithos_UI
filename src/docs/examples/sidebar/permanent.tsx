import { Sidebar, SidebarContent, SidebarItem } from '../../../components/ui/Sidebar'
import { Typography } from '../../../components/ui/Typography'
import { useState } from 'react'
import { IconHome } from '../../../components/ui/icons/IconHome'
import { IconFolder } from '../../../components/ui/icons/IconFolder'
import { IconSettings } from '../../../components/ui/icons/IconSettings'

const items = [
  { icon: <IconHome strokeWidth={3} />, label: 'Dashboard', id: 'item-0' },
  { icon: <IconFolder strokeWidth={3} />, label: 'Projects', id: 'item-1' },
  { icon: <IconSettings strokeWidth={3} />, label: 'Settings', id: 'item-2' },
]

const cards = [
  { title: 'Total Users', text: '1,240' },
  { title: 'Conversion Rate', text: '85%' },
  { title: 'Server Latency', text: '12 ms' },
]

export const ExamplePermanent = () => {
  const [active, setActive] = useState('item-0')

  return (
    <div className="flex h-screen w-full bg-(--lithos-surface)">
      <Sidebar role="navigation">
        <SidebarContent className="border-r-2 border-(--lithos-border) p-2 space-y-2">
          <Typography variant="h4" className="p-3 border-b-2 border-(--lithos-border) -mx-2 -mt-2 mb-2 uppercase mb-4">
            Lithos UI
          </Typography>

          {items.map((item) => (
            <SidebarItem key={item.id} icon={item.icon} active={active === item.id} onClick={() => setActive(item.id)}>
              <Typography variant="label">{item.label}</Typography>
            </SidebarItem>
          ))}
        </SidebarContent>
      </Sidebar>

      <main className="flex-1 flex flex-col min-w-[320px] overflow-y-auto p-6 space-y-6">
        <header className="border-b-2 border-(--lithos-border) pb-4">
          <Typography variant="h2" className="font-black uppercase">
            Main Dashboard
          </Typography>
          <Typography className="opacity-80">Overview of the layout integration with Permanent Sidebar.</Typography>
        </header>

        <section className="flex flex-wrap -m-2">
          {cards.map((card) => (
            <div className="w-full md:w-1/3 p-2">
              <div className="p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]">
                <Typography variant="h6" className="font-bold mb-1 truncate">
                  {card.title}
                </Typography>
                <Typography variant="h3" as="p" className="font-bold mb-1 truncate">
                  {card.text}
                </Typography>
              </div>
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
    </div>
  )
}
