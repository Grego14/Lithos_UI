import { useState, Fragment } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { IconHome } from './icons/IconHome'
import { IconBreadcrumbSeparator } from './icons/IconBreadcrumbSeparator'
import { cn } from '../../utils/cn'

export interface BreadcrumbItemData {
  label: string
  href?: string | undefined
  icon?: ReactNode | undefined
  active?: boolean | undefined
  onClick?: (() => void) | undefined
}

export interface BreadcrumbProps extends ComponentPropsWithoutRef<'nav'> {
  items?: BreadcrumbItemData[] | undefined
  variant?: 'default' | 'collapsible' | 'icon' | undefined
  separator?: ReactNode | undefined
  showHomeIcon?: boolean | undefined
  humanPrefix?: ReactNode | undefined
  maxItems?: number | undefined
  itemsBeforeCollapse?: number | undefined
  itemsAfterCollapse?: number | undefined
  className?: string | undefined
  children?: ReactNode | undefined
}

export const BreadcrumbSeparator = ({
  children,
  className,
  ref,
  ...rest
}: ComponentPropsWithoutRef<'li'> & { ref?: React.Ref<HTMLLIElement> }) => {
  const classes = cn('inline-flex items-center text-sm font-bold opacity-40 mx-2 select-none', className)

  return (
    <li ref={ref} role="presentation" aria-hidden="true" className={classes} {...rest}>
      {children ?? <IconBreadcrumbSeparator />}
    </li>
  )
}

export const BreadcrumbItem = ({
  className,
  children,
  ref,
  ...rest
}: ComponentPropsWithoutRef<'li'> & { ref?: React.Ref<HTMLLIElement> }) => {
  const classes = cn('inline-flex items-center text-sm font-bold', className)

  return (
    <li ref={ref} className={classes} {...rest}>
      {children}
    </li>
  )
}

export interface BreadcrumbLinkProps extends ComponentPropsWithoutRef<'a'> {
  href?: string | undefined
  onClick?: (() => void) | undefined
  children: ReactNode
}

export const BreadcrumbLink = ({
  href,
  onClick,
  className,
  children,
  ref,
  ...rest
}: BreadcrumbLinkProps & { ref?: React.Ref<HTMLAnchorElement> }) => {
  const classes = cn(
    'inline-flex items-center px-2 py-1 border-2 border-transparent hover:border-(--lithos-border) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) transition-all duration-150 rounded-none lithos-click cursor-pointer font-bold',
    className
  )

  return (
    <a ref={ref} href={href ?? '#'} onClick={onClick} className={classes} {...rest}>
      {children}
    </a>
  )
}

export interface BreadcrumbPageProps extends ComponentPropsWithoutRef<'span'> {
  children: ReactNode
}

export const BreadcrumbPage = ({
  className,
  children,
  ref,
  ...rest
}: BreadcrumbPageProps & { ref?: React.Ref<HTMLSpanElement> }) => {
  const classes = cn(
    'inline-flex items-center px-2.5 py-1 border-2 border-(--lithos-border) bg-(--lithos-accent) text-(--lithos-accent-text) font-black tracking-tight shadow-[2px_2px_0px_0px_var(--lithos-border)]',
    className
  )

  return (
    <span ref={ref} role="link" aria-disabled="true" aria-current="page" className={classes} {...rest}>
      {children}
    </span>
  )
}

export interface BreadcrumbEllipsisProps extends ComponentPropsWithoutRef<'button'> {
  onClick?: (() => void) | undefined
  isExpanded?: boolean | undefined
}

export const BreadcrumbEllipsis = ({
  onClick,
  isExpanded,
  className,
  children,
  ref,
  ...rest
}: BreadcrumbEllipsisProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  const classes = cn(
    'inline-flex items-center justify-center px-2 py-0.5 border-2 border-(--lithos-border) bg-(--lithos-surface) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) text-xs font-black transition-all cursor-pointer lithos-click select-none',
    className
  )

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={isExpanded ? 'Collapse breadcrumb steps' : 'Expand breadcrumb steps'}
      className={classes}
      {...rest}
    >
      {children ?? (isExpanded ? '‹‹' : '•••')}
    </button>
  )
}

export const BreadcrumbList = ({
  className,
  children,
  ref,
  ...rest
}: ComponentPropsWithoutRef<'ol'> & { ref?: React.Ref<HTMLOListElement> }) => {
  const classes = cn('inline-flex flex-wrap items-center font-sans text-sm tracking-tight', className)

  return (
    <ol ref={ref} className={classes} {...rest}>
      {children}
    </ol>
  )
}

export const Breadcrumb = ({
  items,
  variant = 'default',
  separator = <IconBreadcrumbSeparator />,
  showHomeIcon = true,
  humanPrefix,
  maxItems = 4,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  className,
  children,
  ref,
  ...rest
}: BreadcrumbProps & { ref?: React.Ref<HTMLElement> }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const classes = cn('relative inline-flex items-center flex-wrap', className)

  if (!items || items.length === 0) {
    return (
      <nav ref={ref} aria-label="Breadcrumb" className={classes} {...rest}>
        {humanPrefix}
        <BreadcrumbList>{children}</BreadcrumbList>
      </nav>
    )
  }

  const isCollapsible = variant === 'collapsible' || items.length > maxItems
  const hasEnoughToCollapse = items.length > itemsBeforeCollapse + itemsAfterCollapse

  type RenderedEntry =
    { type: 'item'; data: BreadcrumbItemData; originalIndex: number } | { type: 'ellipsis'; count: number }

  let renderedEntries: RenderedEntry[] = []

  if (isCollapsible && hasEnoughToCollapse) {
    const before = items.slice(0, itemsBeforeCollapse)
    const after = items.slice(items.length - itemsAfterCollapse)
    const middle = items.slice(itemsBeforeCollapse, items.length - itemsAfterCollapse)

    if (!isExpanded) {
      renderedEntries = [
        ...before.map((data, i) => ({ type: 'item' as const, data, originalIndex: i })),
        { type: 'ellipsis' as const, count: middle.length },
        ...after.map((data, i) => ({
          type: 'item' as const,
          data,
          originalIndex: items.length - itemsAfterCollapse + i,
        })),
      ]
    } else {
      renderedEntries = [
        ...before.map((data, i) => ({ type: 'item' as const, data, originalIndex: i })),
        { type: 'ellipsis' as const, count: middle.length },
        ...middle.map((data, i) => ({ type: 'item' as const, data, originalIndex: itemsBeforeCollapse + i })),
        ...after.map((data, i) => ({
          type: 'item' as const,
          data,
          originalIndex: items.length - itemsAfterCollapse + i,
        })),
      ]
    }
  } else {
    renderedEntries = items.map((data, i) => ({ type: 'item' as const, data, originalIndex: i }))
  }

  return (
    <nav ref={ref} aria-label="Breadcrumb" className={classes} {...rest}>
      {humanPrefix}
      <BreadcrumbList>
        {renderedEntries.map((entry, index) => {
          const isLastEntry = index === renderedEntries.length - 1

          if (entry.type === 'ellipsis') {
            return (
              <Fragment key={`ellipsis-${index}`}>
                <BreadcrumbItem className="inline-flex items-center">
                  <BreadcrumbEllipsis
                    isExpanded={isExpanded}
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={isExpanded ? 'Collapse breadcrumb steps' : `Show ${entry.count} hidden steps`}
                  />
                </BreadcrumbItem>
                {!isLastEntry && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
              </Fragment>
            )
          }

          const item = entry.data
          const originalIndex = entry.originalIndex
          const isItemLast = originalIndex === items.length - 1
          const isActive = item.active ?? isItemLast
          const showDefaultHome = showHomeIcon && originalIndex === 0 && !item.icon

          return (
            <Fragment key={`${item.label}-${originalIndex}`}>
              <BreadcrumbItem className="inline-flex items-center">
                {isActive ? (
                  <BreadcrumbPage>
                    {showDefaultHome && <IconHome className="w-4 h-4 mr-1.5 inline-block" />}
                    {item.icon && <span className="mr-1.5 inline-flex items-center">{item.icon}</span>}
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href} onClick={item.onClick}>
                    {showDefaultHome && <IconHome className="w-4 h-4 mr-1.5 inline-block" />}
                    {item.icon && <span className="mr-1.5 inline-flex items-center">{item.icon}</span>}
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLastEntry && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </nav>
  )
}
