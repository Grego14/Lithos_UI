import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { CodeViewer } from '../components/ui/CodeViewer'
import { PreviewBlock } from '../components/ui/PreviewBlock'
import { Toggle } from '../components/ui/Toggle'
import { ToastItem } from '../components/ui/Toast'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { useTheme } from '../core/useTheme'
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

const componentsList = [
  {
    name: 'Button',
    to: '/docs/button',
    preview: <Button className="cursor-pointer">Button</Button>
  },
  {
    name: 'Card',
    to: '/docs/card',
    preview: (
      <Card className="pointer-events-none w-32">
        <CardContent className="p-3">
          <p className="font-black uppercase text-xs tracking-tight">Card</p>
        </CardContent>
      </Card>
    )
  },
  {
    name: 'Code Viewer',
    to: '/docs/code-viewer',
    preview: (
      <div className="w-[150%] scale-[0.65] origin-center">
        <CodeViewer code={`<Button />`} embedded />
      </div>
    )
  },
  {
    name: 'Preview Block',
    to: '/docs/preview-block',
    preview: (
      <div className="w-[150%] scale-[0.5] origin-center pointer-events-none">
        <PreviewBlock code="">
          <div className="bg-(--lithos-accent) text-(--lithos-accent-text) p-2 font-bold uppercase tracking-widest text-xs border-2 border-(--lithos-border)">Button</div>
        </PreviewBlock>
      </div>
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

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {componentsList.map((comp) => (
                <Link
                  key={comp.name}
                  to={comp.to}
                  className="group block border-4 border-(--lithos-border) bg-(--lithos-surface) transition-transform hover:-translate-y-1 shadow-[4px_4px_0px_0px_var(--lithos-shadow)]"
                >
                  {/* Top Zone: Live Preview */}
                  <div className="h-40 flex items-center justify-center bg-(--lithos-bg) p-4 overflow-hidden relative">
                    {comp.preview}
                  </div>

                  {/* Bottom Zone: Thin Label Strip */}
                  <div className="border-t-4 border-(--lithos-border) bg-(--lithos-surface) px-4 py-3 text-center">
                    <h2 className="text-xl font-black uppercase tracking-tighter text-(--lithos-text) group-hover:text-(--lithos-accent) transition-colors">
                      {comp.name}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <div className="mt-24">
        <Footer isDarkMode={isDarkMode} onToggleObsidian={toggleObsidian} />
      </div>
    </>;
