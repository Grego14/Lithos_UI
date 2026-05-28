/**
 * @fileoverview The Blueprint Coordinate - Coming Soon Page
 * 
 * Neo-Brutalist construction page component themed as "Active Engineering".
 * Renders a viewport-locked layout with massive engineered typography,
 * architectural grid elements, and a hard-shadowed return button.
 * 
 * ARCHITECTURAL NOTES:
 * - NO gap utilities (ZERO-GAP LAW)
 * - Spacing via explicit margins (mt-*, mb-*, mr-*)
 * - Button shadow fixed (no translate on interaction)
 */

import { Link } from 'react-router-dom'
import KineticGrid from '../ui/KineticGrid'

export default function ComingSoon() {
  return (
    <KineticGrid baseOpacity="opacity-10" className="min-h-screen bg-(--lithos-bg) text-(--lithos-text) px-4">
      <div className="text-center max-w-5xl mx-auto w-full">
        {/* WIP code - Recalibrated for responsive wrapping without horizontal overflow */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-black leading-none tracking-tighter mb-10 select-none text-(--lithos-accent) uppercase">
          Work In Progress
        </h1>

        {/* Primary construction title */}
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-widest mb-6">
          Active Engineering Zone
        </h2>

        {/* Secondary description - Rewritten for open source contribution */}
        <p className="text-base md:text-lg font-bold opacity-80 mb-12 leading-relaxed max-w-2xl mx-auto">
          Lithos UI is an open-source architecture, and developers are actively encouraged to contribute code to engineer this structural block.
        </p>

        {/* Vertical spacer for button positioning */}
        {/* Zero-Gap enforcement: stacking behavior controlled by explicit margins */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center">
          {/* Return button */}
          <Link
            to="/docs"
            className="inline-block border-2 border-(--lithos-border) bg-(--lithos-accent) px-6 py-4 font-black uppercase tracking-tighter leading-none text-(--lithos-accent-text) lithos-click mb-4 sm:mb-0 sm:mr-4"
          >
            Back to Docs
          </Link>

          {/* Contribute button */}
          <a
            href="https://github.com/IncredibleStand/Lithos_UI/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-(--lithos-border) bg-(--lithos-surface) px-6 py-4 font-black uppercase tracking-tighter leading-none text-(--lithos-text) lithos-click"
          >
            Contribute Code
          </a>
        </div>
      </div>
    </KineticGrid>
  )
}