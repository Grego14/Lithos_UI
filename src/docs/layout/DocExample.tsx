import type { ReactNode } from 'react'
import { type LithosClass, cn } from '../../utils/cn'
import { DocHeading } from './DocHeading'

interface DocExampleProps {
  id: string
  title: string
  description: ReactNode
  children: ReactNode
  className?: LithosClass
}

export const DocExample = ({ id, title, description, children, className }: DocExampleProps) => {
  return (
    <section className={cn('mb-16', className)}>
      <DocHeading id={id} level="h3">
        {title}
      </DocHeading>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">{description}</p>
      <div className="mt-8">{children}</div>
    </section>
  )
}
