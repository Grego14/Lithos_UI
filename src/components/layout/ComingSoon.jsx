/**
 * @fileoverview The Blueprint Coordinate - Coming Soon Page
 * 
 * Neo-Brutalist construction page component themed as "Active Engineering".
 * Renders a viewport-locked layout with massive engineered typography,
 * architectural grid elements, and a hard-shadowed return button.
 * 
 * ARCHITECTURAL NOTES:
 * - NO gap utilities (ZERO-GAP LAW)
 * - Spacing via explicit margins (mt-*, mb-*)
 * - Button shadow fixed (no translate on interaction)
 */

import { Link } from 'react-router-dom'

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen bg-(--lithos-bg) text-(--lithos-text) flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Structural blueprint grid background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main content container */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* WIP code - massive and brutalist */}
        <h1 className="text-8xl md:text-[12rem] font-black leading-none tracking-tighter mb-10 select-none text-(--lithos-accent)">
          W I P
        </h1>

        {/* Primary construction title */}
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-widest mb-4">
          Active Engineering Zone
        </h2>

        {/* Secondary description */}
        <p className="text-base md:text-lg font-medium opacity-70 mb-12 leading-relaxed">
          This structural block is currently undergoing mathematical calibration and stress testing. Deployment is pending.
        </p>

        {/* Vertical spacer for button positioning */}
        <div className="mt-8">
          {/* Return button - hard brutalist styling */}
          <Link
            to="/docs"
            className="inline-block border-2 border-(--lithos-border) bg-(--lithos-accent) px-5 py-3 font-black tracking-tighter leading-none text-(--lithos-accent-text) lithos-click"
          >
            Back to Docs
          </Link>
        </div>
      </div>
    </div>
  )
}