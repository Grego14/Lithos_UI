import type { ReactNode } from 'react'
import { type LithosClass, cn } from '../../utils/cn'

interface DocHeadingProps {
  id?: string
  level?: 'h2' | 'h3' | 'h4'
  children: ReactNode
  className?: LithosClass
}

export const DocHeading = ({ id, level = 'h2', children, className }: DocHeadingProps) => {
  const sharedClasses = 'font-black tracking-tight text-(--lithos-text)'

  if (level === 'h4')
    return (
      <h4 id={id} className={cn('mt-8 mb-4 text-lg ', sharedClasses, className)}>
        {children}
      </h4>
    )

  if (level === 'h3')
    return (
      <h3 id={id} className={cn('mb-4 text-xl', sharedClasses, className)}>
        {children}
      </h3>
    )

  return (
    <h2 id={id} className={cn('mt-12 mb-4 text-2xl', sharedClasses, className)}>
      {children}
    </h2>
  )
}
