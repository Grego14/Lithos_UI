import { useState, useEffect, useSyncExternalStore } from 'react'
import type { TOCItem } from '../types'

let cachedLinks: TOCItem[] = []

const getHeadingsFromDOM = (): TOCItem[] => {
  const elements = Array.from(document.querySelectorAll<HTMLElement>('main h2[id], main h3[id], main h4[id]'))

  const newLinks: TOCItem[] = elements.map((element) => {
    const tagName = element.tagName

    const level = tagName === 'H2' ? 1 : tagName === 'H3' ? 2 : 3

    return {
      id: `#${element.id}`,
      label: element.textContent?.trim() || '',
      level,
    }
  })

  // check if the items are the same
  const isUnchanged =
    cachedLinks.length === newLinks.length &&
    cachedLinks.every(
      (item, index) =>
        item.id === newLinks[index]?.id &&
        item.label === newLinks[index]?.label &&
        item.level === newLinks[index]?.level
    )

  if (isUnchanged) {
    return cachedLinks
  }

  cachedLinks = newLinks
  return cachedLinks
}

const subscribeToDOMMutations = (callback: () => void) => {
  const main = document.querySelector('main')
  if (!main) return () => {}

  const observer = new MutationObserver(callback)
  observer.observe(main, { childList: true, subtree: true })

  return () => observer.disconnect()
}

export const TableOfContents = () => {
  const [activeId, setActiveId] = useState<string | null>(null)

  const links = useSyncExternalStore(subscribeToDOMMutations, getHeadingsFromDOM, () => [])

  useEffect(() => {
    if (links.length === 0) return

    const headingIds = links.map((link) => link.id.substring(1))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-100px 0px -60% 0px' }
    )

    // A small delay ensures the DOM is fully rendered after navigation
    const timeoutId = setTimeout(() => {
      headingIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) observer.observe(element)
      })
    }, 100)

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveId(null)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [links])

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
          className={`block py-1.5 px-4 text-xs font-bold transition-colors duration-150 ease-out hover:text-(--lithos-accent) mb-2 ${
            !activeId ? 'text-(--lithos-accent)' : 'opacity-70 hover:opacity-100'
          }`}
        >
          Overview
        </a>

        {links.map((link) => {
          const levelStyle = link.level === 2 ? 'ml-4' : link.level === 3 ? 'ml-8' : ''

          return (
            <a
              key={link.id}
              href={link.id}
              className={`block py-1.5 px-4 text-xs font-bold transition-colors duration-150 ease-out hover:text-(--lithos-accent) ${levelStyle} ${activeId === link.id ? 'text-(--lithos-accent)' : 'opacity-70 hover:opacity-100'}`}
            >
              {link.label}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}
