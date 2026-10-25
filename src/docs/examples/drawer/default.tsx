import { useState } from 'react'
import { Drawer } from '../../../components/ui/Drawer'
import { Button } from '../../../components/ui/Button'
import { IconClose } from '../../../components/ui/icons/IconClose'

export const DefaultDrawerExample = () => {
  const [open, onOpenChange] = useState(false)
  const sections = [
    { title: 'Main', links: ['Overview', 'Dashboard', 'Analytics', 'Reports'] },
    { title: 'Management', links: ['Users', 'Roles', 'Permissions', 'Integrations'] },
  ]

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      trigger={<Button onClick={() => onOpenChange(true)}>Open Drawer</Button>}
      aria-label="Navigation drawer"
    >
      <div className="flex h-full w-80 flex-col bg-(--lithos-surface) p-6">
        <div className="flex items-center justify-between border-b border-(--lithos-border) pb-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="text" onClick={() => onOpenChange(false)} aria-label="Close menu">
            <IconClose aria-hidden="true" />
          </Button>
        </div>
        <nav className="flex-1 space-y-6 overflow-y-auto py-4">
          {sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-(--lithos-text)/60">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.links.map((link) => (
                  <a key={link} href="#" className="block rounded-lg px-3 py-2 text-sm font-medium">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <Button className="w-full" onClick={() => onOpenChange(false)}>
          Logout
        </Button>
      </div>
    </Drawer>
  )
}
