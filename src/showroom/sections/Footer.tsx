/**
 * @fileoverview Lithos UI footer slab.
 * - Closes the page with a hard top border, a three-column balance, and a utility toggle.
 * - Uses explicit spacing to keep the exit block aligned with the zero-gap page rhythm.
 * - Couples the theme toggle with toast feedback so state changes are visible and immediate.
 */

import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <footer className="relative overflow-hidden border-t-2 border-(--lithos-border) bg-(--lithos-accent) px-6 py-20 text-(--lithos-accent-text)">
      {/* - 8px top border makes the footer read as a closing slab, not a soft appendix. */}
      {/* - Three columns are balanced with width fractions, not gap, to preserve structural rhythm. */}
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row lg:items-start lg:justify-between">
        {/* - Brand block carries the visual weight of the footer’s left side. */}
        <div className="mb-16 flex w-full flex-col justify-between lg:mb-0 lg:w-1/2">
          <div>
            <p className="text-4xl font-black tracking-tighter leading-none md:text-6xl text-(--lithos-accent-text)">
              Lithos UI
            </p>
            <p className="mt-4 mb-4 max-w-md text-lg font-bold uppercase tracking-tighter leading-none text-(--lithos-accent-text)">
              Stop wrestling with fragile layouts. Drop in production-ready, zero-gap React blocks and ship your next
              product today.
            </p>
          </div>
          <p className="mt-12 lg:mt-0 text-sm font-bold tracking-tighter leading-none text-(--lithos-accent-text)">
            Copyright {new Date().getFullYear()} Lithos UI. All rights reserved.
          </p>
        </div>

        {/* - Navigation stays vertical so the exit path reads as a stack, not a menu bar. */}
        <div className="mt-12 flex w-full flex-col lg:mt-0 lg:w-1/4">
          <Link
            to="/components"
            className="text-2xl font-black uppercase tracking-tighter leading-none md:text-4xl cursor-pointer text-(--lithos-accent-text)"
          >
            Components
          </Link>
          <Link
            to="/blocks"
            className="mt-4 text-2xl font-black uppercase tracking-tighter leading-none md:text-4xl cursor-pointer text-(--lithos-accent-text)"
          >
            Blocks
          </Link>
          <Link
            to="/templates"
            className="mt-4 text-2xl font-black uppercase tracking-tighter leading-none md:text-4xl cursor-pointer text-(--lithos-accent-text)"
          >
            Templates
          </Link>
          <Link
            to="/faq"
            className="mt-4 text-2xl font-black uppercase tracking-tighter leading-none md:text-4xl cursor-pointer text-(--lithos-accent-text)"
          >
            FAQ
          </Link>
          <Link
            to="/docs"
            className="mt-4 text-2xl font-black uppercase tracking-tighter leading-none md:text-4xl cursor-pointer text-(--lithos-accent-text)"
          >
            Docs
          </Link>
        </div>

        {/* - Sponsor CTA uses the same hard-surface language so the support action matches the system physics. */}
        <div className="mt-12 flex w-full flex-col lg:mt-0 lg:w-1/4 lg:items-end">
          <a
            href="https://incrediblestand.gumroad.com/l/lithos-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="group border-2 border-(--lithos-border) bg-(--lithos-surface) text-2xl text-(--lithos-text) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) lithos-click md:text-3xl"
          >
            <span>Show Love</span>
            <svg
              className="ml-3 h-8 w-8 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
};

export { Footer }
