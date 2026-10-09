import type { ReactNode } from 'react'
import { type LithosClass, cn } from '../../utils/cn'

interface DocLeadTextProps {
  children: ReactNode
  className?: LithosClass
}

export const DocLeadText = ({ children, className }: DocLeadTextProps) => {
  return <p className={cn('mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body', className)}>{children}</p>
}
