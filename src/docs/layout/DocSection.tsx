import type { ReactNode } from 'react'
import { cn, type LithosClass } from '../../utils/cn'

interface DocSectionProps {
  children: ReactNode
  className?: LithosClass
}

export const DocSection = ({ children, className }: DocSectionProps) => {
  return <section className={cn('mb-12', className)}>{children}</section>
}
