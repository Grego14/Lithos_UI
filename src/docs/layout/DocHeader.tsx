import type { ReactNode } from 'react'
import { type LithosClass, cn } from '../../utils/cn'

interface DocHeaderProps {
  title: string
  description: ReactNode
  className?: LithosClass
}

export const DocHeader = ({ title, description, className }: DocHeaderProps) => {
  return (
    <header className={cn('mt-0', className)}>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">{title}</h1>
      <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">{description}</p>
      <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
    </header>
  )
}
