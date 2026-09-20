import { Link, useLocation } from 'react-router-dom'

// The component name should match the route in App.tsx
const components = [
  'accordion',
  'alert',
  'avatar',
  'badge',
  'breadcrumb',
  'button',
  'calendar',
  'card',
  'carousel',
  'checkbox',
  'dialog',
  'dropdown',
  'input',
  'popover',
  'select',
  'tabs',
  'toast',
  'toggle',
  'tooltip',
]

export const Sidebar = () => {
  const location = useLocation()

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path
    const baseClass =
      'inline-block w-fit px-3 py-1.5 text-xs font-bold transition-all duration-150 ease-out border-2 rounded-(--lithos-radius)'

    return isActive
      ? `${baseClass} border-(--lithos-border) bg-(--lithos-accent) text-(--lithos-accent-text) shadow-[4px_4px_0_0_var(--lithos-border)]`
      : `${baseClass} border-transparent text-(--lithos-text) hover:bg-[color-mix(in_srgb,var(--lithos-text)_5%,transparent)] hover:text-(--lithos-text)`
  }

  return (
    <aside className="py-8 pr-6">
      {/* Getting Started Category */}
      <div className="mb-8">
        <h3 className="text-xs font-black opacity-50 mb-3 px-4 uppercase">Getting Started</h3>
        <nav className="flex flex-col items-start pl-4 space-y-1">
          <Link to="/docs" className={getLinkClass('/docs')}>
            Introduction
          </Link>
          <Link to="/docs/installation" className={getLinkClass('/docs/installation')}>
            Installation
          </Link>
        </nav>
      </div>

      {/* Atomic Components Category */}
      <div>
        <h3 className="text-xs font-black opacity-50 mb-3 px-4 uppercase">Components</h3>
        <nav className="flex flex-col items-start pl-4 space-y-1">
          {components.map((component) => {
            const chars = component.split('')
            const label = chars[0]?.toUpperCase() + chars.slice(1).join('')
            const link = `/docs/${component}`

            return (
              <Link key={link} to={link} className={getLinkClass(link)}>
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
