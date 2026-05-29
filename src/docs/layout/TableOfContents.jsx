export default function TableOfContents({ links = [] }) {
  if (links.length === 0) return null

  return (
    <aside className="border-2 border-(--lithos-border) bg-(--lithos-bg) py-4">
      <h3 className="px-4 pb-3 text-xs font-black uppercase tracking-widest text-(--lithos-text) border-b-2 border-(--lithos-border)">
        On This Page
      </h3>

      <nav className="pt-3">
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
