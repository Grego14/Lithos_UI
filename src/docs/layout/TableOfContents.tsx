import type { TOCItem } from '../types'

export const TableOfContents = ({ links = [] }: { links: TOCItem[] }) => {
  if (links.length === 0) return null

  return (
    <aside className="py-8 pl-6">
      <h3 className="text-xs font-black opacity-50 uppercase px-4">On This Page</h3>

      <nav className="pt-3">
        {/* Overview - Scroll to top */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="block py-1.5 px-4 text-xs font-bold transition-colors duration-150 ease-out hover:text-(--lithos-accent) mb-2"
        >
          Overview
        </a>

        {links.map((link) => (
          <a
            key={link.id}
            href={link.id}
            className={`block py-1.5 px-4 text-xs font-bold transition-colors duration-150 ease-out hover:text-(--lithos-accent) ${link.level === 2 ? 'ml-4' : ''}`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}
