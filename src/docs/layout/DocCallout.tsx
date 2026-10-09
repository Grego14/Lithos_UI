import type { ReactNode } from 'react'
import { type LithosClass, cn } from '../../utils/cn'

interface DocCalloutProps {
  children: ReactNode
  className?: LithosClass
}

export const DocCallout = ({ children, className }: DocCalloutProps) => {
  return (
    <div className={cn('border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4', className)}>
      <div className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">{children}</div>
    </div>
  )
}
