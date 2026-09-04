/**
 * @fileoverview
 * Breadcrumb navigation primitive with support for:
 * - Default, collapsible, and icon variants
 * - Custom separators and home icons
 * - Expandable collapsed breadcrumb items
 * - Accessible breadcrumb semantics
 */

import { Fragment, useState } from 'react'
import type { ComponentPropsWithRef, MouseEventHandler, ReactNode } from 'react'
import { IconHome } from './icons/IconHome'
import { IconBreadcrumbSeparator } from './icons/IconBreadcrumbSeparator'
import { cn, type LithosClass } from '../../utils/cn'
import { Button } from './Button'

export interface BreadcrumbItemData {
  label: string
  href?: string | undefined
  icon?: ReactNode | undefined
  active?: boolean | undefined
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
}

// removed unused prop showIcons from BreadcrumbProps

export interface BreadcrumbProps extends Omit<ComponentPropsWithRef<'nav'>, 'className'> {
  items?: BreadcrumbItemData[] | undefined
  mode?: 'collapsible'
  separator?: ReactNode
  showHomeIcon?: boolean
  humanPrefix?: ReactNode
  maxItems?: number
  itemsBeforeCollapse?: number
  itemsAfterCollapse?: number
  className?: LithosClass
}

export const BreadcrumbSeparator = ({ children, className, ...rest }: ComponentPropsWithRef<'li'>) => {
  const classes = cn('inline-flex items-center text-sm font-bold opacity-40 mx-2 select-none', className)

  return (
    <li role="presentation" aria-hidden="true" className={classes} {...rest}>
      {children ?? <IconBreadcrumbSeparator />}
    </li>
  )
}

export interface BreadcrumbItemProps extends Omit<ComponentPropsWithRef<'li'>, 'className'> {
  className?: LithosClass
}

export const BreadcrumbItem = ({ className, children, ...rest }: BreadcrumbItemProps) => {
  const classes = cn('inline-flex items-center text-sm font-bold', className)

  return (
    <li className={classes} {...rest}>
      {children}
    </li>
  )
}

export interface BreadcrumbLinkProps extends Omit<ComponentPropsWithRef<'a'>, 'className'> {
  href?: string | undefined
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
  className?: LithosClass
}

export const BreadcrumbLink = ({ href, onClick, className, children, ...rest }: BreadcrumbLinkProps) => {
  const classes = cn(
    'lithos-click py-1 border-2 border-transparent hover:border-(--lithos-border) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) duration-150 rounded-(--lithos-radius) font-bold',
    className
  )

  return (
    <a
      href={href ?? '#'}
      onClick={(event) => {
        if (onClick) {
          event.preventDefault()
          onClick(event)
        }
      }}
      className={classes}
      {...rest}
    >
      {children}
    </a>
  )
}

export interface BreadcrumbPageProps extends Omit<ComponentPropsWithRef<'span'>, 'className'> {
  className?: LithosClass
}

export const BreadcrumbPage = ({ className, children, ...rest }: BreadcrumbPageProps) => {
  const classes = cn(
    'inline-flex items-center px-2.5 py-1 border-2 border-(--lithos-border) bg-(--lithos-accent) text-(--lithos-accent-text) font-black tracking-tight shadow-[2px_2px_0px_0px_var(--lithos-border)] rounded-(--lithos-radius)',
    className
  )

  return (
    <span role="link" aria-disabled="true" aria-current="page" className={classes} {...rest}>
      {children}
    </span>
  )
}

export interface BreadcrumbEllipsisProps extends Omit<ComponentPropsWithRef<'button'>, 'className'> {
  onClick?: () => void
  isExpanded?: boolean
  className?: LithosClass
}

export const BreadcrumbEllipsis = ({ onClick, isExpanded, className, children, ...rest }: BreadcrumbEllipsisProps) => {
  const classes = cn('py-0.5 text-xs font-black select-none', className)

  return (
    <Button
      variant="accent"
      onClick={onClick}
      aria-label={isExpanded ? 'Collapse breadcrumb steps' : 'Expand breadcrumb steps'}
      className={classes}
      {...rest}
    >
      {children ?? (isExpanded ? '‹‹' : '•••')}
    </Button>
  )
}

export interface BreadcrumbListProps extends Omit<ComponentPropsWithRef<'ol'>, 'className'> {
  className?: LithosClass
}

export const BreadcrumbList = ({ className, children, ...rest }: BreadcrumbListProps) => {
  const classes = cn('inline-flex flex-wrap items-center font-mono text-sm tracking-tight', className)

  return (
    <ol className={classes} {...rest}>
      {children}
    </ol>
  )
}

export const Breadcrumb = ({
  items,
  mode,
  separator = <IconBreadcrumbSeparator />,
  showHomeIcon = true,
  humanPrefix,
  maxItems = 4,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  className,
  children,
  ...rest
}: BreadcrumbProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const classes = cn('relative inline-flex items-center flex-wrap', className)

  if (!items || items.length === 0) {
    return (
      <nav aria-label="Breadcrumb" className={classes} {...rest}>
        {humanPrefix}
        <BreadcrumbList>{children}</BreadcrumbList>
      </nav>
    )
  }

  const isCollapsible = mode === 'collapsible' || items.length > maxItems
  const hasEnoughToCollapse = items.length > itemsBeforeCollapse + itemsAfterCollapse

  type RenderedEntry =
    { type: 'item'; data: BreadcrumbItemData; originalIndex: number } | { type: 'ellipsis'; count: number }

  let renderedEntries: RenderedEntry[] = []

  if (isCollapsible && hasEnoughToCollapse) {
    const before = items
      .slice(0, itemsBeforeCollapse)
      .map((data, i) => ({ type: 'item' as const, data, originalIndex: i }))

    const after = items.slice(items.length - itemsAfterCollapse).map((data, i) => ({
      type: 'item' as const,
      data,
      originalIndex: items.length - itemsAfterCollapse + i,
    }))

    const middle = items.slice(itemsBeforeCollapse, items.length - itemsAfterCollapse)

    const ellipsis = { type: 'ellipsis' as const, count: middle.length }

    if (!isExpanded) {
      renderedEntries = [...before, ellipsis, ...after]
    } else {
      renderedEntries = [
        ...before,
        ellipsis,
        ...middle.map((data, i) => ({ type: 'item' as const, data, originalIndex: itemsBeforeCollapse + i })),
        ...after,
      ]
    }
  } else {
    renderedEntries = items.map((data, i) => ({ type: 'item' as const, data, originalIndex: i }))
  }

  return (
    <nav aria-label="Breadcrumb" className={classes} {...rest}>
      {humanPrefix}
      <BreadcrumbList>
        {renderedEntries.map((entry, index) => {
          const isLastEntry = index === renderedEntries.length - 1

          if (entry.type === 'ellipsis') {
            return (
              <Fragment key={`ellipsis-${index}`}>
                <BreadcrumbItem key={`ellipsis-${index}`}>
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
              <BreadcrumbItem>
                {isActive ? (
                  <BreadcrumbPage>
                    {showDefaultHome && <IconHome data-testid="home-icon" className="w-4 h-4 mr-1.5 inline-block" />}
                    {item.icon && <span className="mr-1.5 inline-flex items-center">{item.icon}</span>}
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href} onClick={item.onClick}>
                    {showDefaultHome && <IconHome data-testid="home-icon" className="w-4 h-4 mr-1.5 inline-block" />}
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
