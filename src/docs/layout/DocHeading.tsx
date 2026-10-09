import type { ReactNode } from 'react'
import { type LithosClass, cn } from '../../utils/cn'

interface DocHeadingProps {
  id?: string
  level?: 'h2' | 'h3'
  children: ReactNode
  className?: LithosClass
}

export const DocHeading = ({ id, level = 'h2', children, className }: DocHeadingProps) => {
  if (level === 'h3') {
    return (
      <h3 id={id} className={cn('mb-4 text-xl font-black tracking-tight text-(--lithos-text)', className)}>
        {children}
      </h3>
    )
  }

  return (
    <h2 id={id} className={cn('mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)', className)}>
      {children}
    </h2>
  )
}
