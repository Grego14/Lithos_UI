/**
 * @fileoverview Lithos UI KineticGrid interactive background component.
 * - Interactive dual-layer SVG grid structure featuring a static base wireframe and a dynamic accent overlay.
 * - Dynamic shadow offset shifts from 2px to 4px on open state to retain hard geometry.
 * - Performance-optimized mouse tracking via Direct DOM mutation update of --mouse-x and --mouse-y CSS custom properties, bypassing React state re-renders.
 * - Highlighting effect powered by CSS radial-gradient masking scoped to cursor coordinates.
 */
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { cn } from '../../utils/cn'

export interface KineticGridProps {
  children: ReactNode
  baseOpacity?: string
  className?: string
}

export const KineticGrid = ({ children, baseOpacity = 'opacity-10', className = '' }: KineticGridProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    containerRef.current.style.setProperty('--mouse-x', `${x}px`)
    containerRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  const classes = cn('relative overflow-hidden flex items-center justify-center rounded-(--lithos-radius)', className)

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className={classes}>
      {/* Base Structural Grid (Static) */}
      <div className={`absolute inset-0 pointer-events-none ${baseOpacity}`}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="base-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#base-grid)" />
        </svg>
      </div>

      {/* Kinetic Accent Grid (Masked by Cursor) */}
      <div
        className="absolute inset-0 pointer-events-none text-(--lithos-accent) opacity-80"
        style={{
          maskImage:
            'radial-gradient(circle 200px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black, transparent)',
          WebkitMaskImage:
            'radial-gradient(circle 200px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black, transparent)',
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="accent-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#accent-grid)" />
        </svg>
      </div>

      {/* Content Injection */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}
