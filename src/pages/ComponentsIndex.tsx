import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../showroom/sections/Navbar'
import { Footer } from '../showroom/sections/Footer'
import { Toggle } from '../components/ui/Toggle'
import { ToastItem } from '../components/ui/Toast'
import { Button } from '../components/ui/Button'
import { Card, CardImage, CardContent } from '../components/ui/Card'
import { useTheme } from '../core/useTheme'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { Alert } from '../components/ui/Alert'
import { Accordion } from '../components/ui/Accordion'
import { Calendar } from '../components/ui/Calendar'

interface ComponentsIndexProps {
  isDarkMode: boolean
  toggleObsidian: () => void
}

const TogglePreview = () => {
  const [on, setOn] = useState(true)
  return <Toggle checked={on} onToggle={() => setOn(!on)} />
};

const ToastPreview = () => {
  const { accentColor } = useTheme()
  return (
    <div className="w-[120%] scale-[0.7] origin-center pointer-events-none mt-6">
      <ToastItem toast={{ id: 'prev-toast', message: 'Yummy toast', type: 'success', color: accentColor, title: 'SUCCESS' }} onRemove={() => { }} />
    </div>
  )
};

const AlertPreview = () => {
  const { accentColor } = useTheme()
  return (
    <div className="w-[140%] scale-[0.55] origin-center pointer-events-none">
      <Alert color={accentColor} title="Notice">Structural review pending.</Alert>
    </div>
  )
};

const componentsList = [
  {
    name: 'Alert',
    to: '/docs/alert',
    preview: <AlertPreview />
  },
  {
    name: 'Avatar',
    to: '/docs/avatar',
    preview: <Avatar variant='solid' alt="Jane Doe" />
  },
  {
    name: 'Accordion',
    to: '/docs/accordion',
    preview: (
      <Accordion title='Is this product free?' classes={{ container: 'min-w-20', header: 'text-sm', content: 'text-xs' }}>
        Yeah! This product is 100% free.
      </Accordion>
    )
  },
  {
    name: 'Badge',
    to: '/docs/badge',
    preview: <Badge variant='accent' size='medium'>Feature</Badge>
  },
  {
    name: 'Button',
    to: '/docs/button',
    preview: <Button className="cursor-pointer">Button</Button>
  },
  {
    name: 'Calendar',
    to: '/docs/calendar',
    preview: <Calendar className="pointer-events-none scale-[0.32] origin-center" />
  },
  {
    name: 'Card',
    to: '/docs/card',
    preview: (
      <Card variant="accent" className="pointer-events-none w-32 group-hover:bg-(--lithos-accent) group-hover:text-(--lithos-accent-text) transition-colors">
        <CardImage src="https://picsum.photos/600/400?1" alt="Preview" className="!h-16" />
        <CardContent className="p-2">
          <p className="font-black uppercase text-[10px] tracking-tight leading-none mb-1">Accent Card</p>
          <p className="font-body opacity-70 text-[8px] leading-tight">Hover to see fill.</p>
        </CardContent>
      </Card>
    )
  },
  {
    name: 'Toast',
    to: '/docs/toast',
    preview: <ToastPreview />
  },
  {
    name: 'Toggle',
    to: '/docs/toggle',
    preview: <TogglePreview />
  }
]

export const ComponentsIndex = ({ isDarkMode, toggleObsidian }: ComponentsIndexProps) => <>
  <Navbar />
  <main className="pt-24 min-h-screen bg-(--lithos-bg) text-(--lithos-text)">
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-12 text-(--lithos-text)">
          Components
        </h1>
        <p className="text-xl md:text-2xl font-normal max-w-3xl mb-16 font-body">
          The fundamental building blocks of Lithos UI. Every primitive is built with the Zero-Gap layout system and strict adherence to structural integrity.
        </p>

        <div className="flex flex-wrap -m-3">
          {componentsList.map((comp) => (
            <div key={comp.name} className="w-[50%] sm:w-[33.333%] lg:w-[25%] p-3">
              <Link
                to={comp.to}
                className="group block border-4 border-(--lithos-border) bg-(--lithos-surface) transition-transform lithos-click h-full"
              >
                {/* Top Zone: Live Preview */}
                <div className="h-40 flex items-center justify-center bg-(--lithos-bg) p-4 overflow-hidden relative">
                  {comp.preview}
                </div>

                {/* Bottom Zone: Thin Label Strip */}
                <div className="border-t-4 border-(--lithos-border) bg-(--lithos-surface) px-4 py-3 text-center">
                  <h2 className="text-xl font-black uppercase tracking-tighter text-(--lithos-text) transition-colors">
                    {comp.name}
                  </h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
  <div className="mt-24">
    <Footer isDarkMode={isDarkMode} onToggleObsidian={toggleObsidian} />
  </div>
</>;
