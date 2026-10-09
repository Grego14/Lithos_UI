import type { ReactNode } from 'react'
import { type LithosClass, cn } from '../../utils/cn'

interface DocListProps {
  items?: ReactNode[]
  children?: ReactNode
  className?: LithosClass
}

export const DocList = ({ items, children, className }: DocListProps) => {
  return (
    <ul className={cn('list-disc pl-6 text-lg font-body text-(--lithos-text) space-y-2 mb-12', className)}>
      {items ? items.map((item, index) => <li key={index}>{item}</li>) : children}
    </ul>
  )
}
