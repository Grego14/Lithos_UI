import { useState } from 'react'
import { Link } from 'react-router-dom'

const mainLinks = [
  { label: 'Components', to: '/components' },
  { label: 'Blocks', to: '/blocks' },
  { label: 'Templates', to: '/templates' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Docs', to: '/docs' },
]

const groupedLinks = [
  {
    category: 'Getting Started',
    links: [
      { label: 'Introduction', href: '/docs' },
      { label: 'Installation', href: '/docs/installation' },
    ],
  },
  {
    category: 'Components',
    links: [
      { label: 'Accordion', href: '/docs/accordion' },
      { label: 'Avatar', href: '/docs/avatar' },
      { label: 'Button', href: '/docs/button' },
      { label: 'Card', href: '/docs/card' },
      { label: 'Code Viewer', href: '/docs/code-viewer' },
      { label: 'Preview Block', href: '/docs/preview-block' },
      { label: 'Toast', href: '/docs/toast' },
      { label: 'Toggle', href: '/docs/toggle' },
      { label: 'Badge', href: '/docs/badge' },
    ],
  },
]

export const DocsNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Getting Started')

  return (
    <header className="fixed top-0 z-50 w-full border-b-2 border-(--lithos-border) bg-(--lithos-surface)">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center justify-start lg:w-1/3">
          <Link to="/" className="bg-(--lithos-accent) text-(--lithos-accent-text) lithos-click">
            Lithos UI
          </Link>
        </div>

        {/* - Center lane for main wayfinding */}
        <nav className="hidden items-center justify-center lg:flex lg:w-1/3">
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="mx-4 font-black uppercase tracking-tighter leading-none text-(--lithos-text) transition-all duration-150 ease-out hover:text-(--lithos-accent) cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* - Desktop GitHub CTA (Hidden on mobile) */}
        <div className="hidden lg:flex items-center justify-end lg:w-1/3">
          <a
            href="https://github.com/lithosui/Lithos_UI"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-(--lithos-accent) text-(--lithos-accent-text) lithos-click"
          >
            GitHub
          </a>
        </div>

        {/* - Mobile Action Toggle (Hamburger / X) */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-(--lithos-accent) text-(--lithos-accent-text) lithos-click"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-6 h-6"
              stroke="currentColor"
              fill="none"
              strokeWidth="3"
              strokeLinecap="square"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* - Full-Screen Scrollable Mobile Accordion Overlay */}
      {isMenuOpen && (
        <nav className="fixed inset-0 z-[-1] pt-32 pb-12 px-6 bg-(--lithos-surface) overflow-y-auto flex flex-col justify-start lg:hidden">
          {/* Main Top-level Links */}
          <div className="mb-8 border-b-2 border-(--lithos-border) pb-4">
            {mainLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-left text-4xl sm:text-5xl font-black uppercase tracking-tighter text-(--lithos-text) opacity-80 hover:opacity-100 hover:text-(--lithos-text) hover:translate-x-2 mb-6 cursor-pointer transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Grouped Accordion Links */}
          <div className="flex-1">
            {groupedLinks.map((group) => (
              <div key={group.category} className="mb-8">
                <button
                  onClick={() => setExpandedCategory(expandedCategory === group.category ? null : group.category)}
                  className="flex w-full items-center justify-between border-b-2 border-(--lithos-border) pb-2 mb-4 text-left text-3xl sm:text-4xl font-black uppercase tracking-tighter text-(--lithos-text) cursor-pointer"
                >
                  {group.category}
                  <span className="text-3xl text-(--lithos-accent)">
                    {expandedCategory === group.category ? '-' : '+'}
                  </span>
                </button>

                {/* Accordion Content */}
                {expandedCategory === group.category && (
                  <div className="pl-2 flex flex-col mt-4">
                    {group.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full text-left text-xl sm:text-2xl font-bold uppercase tracking-tight text-(--lithos-text) opacity-80 hover:opacity-100 hover:text-(--lithos-text) hover:translate-x-2 mb-4 cursor-pointer transition-all duration-150"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu GitHub CTA */}
          <a
            href="https://github.com/lithosui/Lithos_UI"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="mt-8 self-start bg-(--lithos-accent) text-(--lithos-accent-text) lithos-click"
          >
            GitHub
          </a>
        </nav>
      )}
    </header>
  )
};
