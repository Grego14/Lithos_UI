import { forwardRef, useState } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

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

export const BreadcrumbSeparator = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
  ({ children, className, ...rest }, ref) => {
    const classes = ['inline-flex items-center text-sm font-bold opacity-40 mx-2 select-none', className ?? '']
      .filter(Boolean)
      .join(' ')

    return (
      <li ref={ref} role="presentation" aria-hidden="true" className={classes} {...rest}>
        {children ?? '/'}
      </li>
    )
  }
)

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

export const BreadcrumbItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['inline-flex items-center text-sm font-bold', className ?? ''].filter(Boolean).join(' ')

    return (
      <li ref={ref} className={classes} {...rest}>
        {children}
      </li>
    )
  }
)

BreadcrumbItem.displayName = 'BreadcrumbItem'

export interface BreadcrumbLinkProps extends ComponentPropsWithoutRef<'a'> {
  href?: string | undefined
  onClick?: (() => void) | undefined
  children: ReactNode
}

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ href, onClick, className, children, ...rest }, ref) => {
    const classes = [
      'inline-flex items-center px-2 py-1 border-2 border-transparent hover:border-(--lithos-border) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) transition-all duration-150 rounded-none lithos-click cursor-pointer font-bold',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <a ref={ref} href={href ?? '#'} onClick={onClick} className={classes} {...rest}>
        {children}
      </a>
    )
  }
)

BreadcrumbLink.displayName = 'BreadcrumbLink'

export interface BreadcrumbPageProps extends ComponentPropsWithoutRef<'span'> {
  children: ReactNode
}

export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = [
      'inline-flex items-center px-2.5 py-1 border-2 border-(--lithos-border) bg-(--lithos-accent) text-(--lithos-accent-text) font-black tracking-tight shadow-[2px_2px_0px_0px_var(--lithos-border)]',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <span ref={ref} role="link" aria-disabled="true" aria-current="page" className={classes} {...rest}>
        {children}
      </span>
    )
  }
)

BreadcrumbPage.displayName = 'BreadcrumbPage'

export interface BreadcrumbEllipsisProps extends ComponentPropsWithoutRef<'button'> {
  onClick?: (() => void) | undefined
  isExpanded?: boolean | undefined
}

export const BreadcrumbEllipsis = forwardRef<HTMLButtonElement, BreadcrumbEllipsisProps>(
  ({ onClick, isExpanded, className, children, ...rest }, ref) => {
    const classes = [
      'inline-flex items-center justify-center px-2 py-0.5 border-2 border-(--lithos-border) bg-(--lithos-surface) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) text-xs font-black transition-all cursor-pointer lithos-click select-none',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

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
)

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis'

export const BreadcrumbList = forwardRef<HTMLOListElement, ComponentPropsWithoutRef<'ol'>>(
  ({ className, children, ...rest }, ref) => {
    const classes = ['inline-flex flex-wrap items-center font-sans text-sm tracking-tight', className ?? '']
      .filter(Boolean)
      .join(' ')

    return (
      <ol ref={ref} className={classes} {...rest}>
        {children}
      </ol>
    )
  }
)

BreadcrumbList.displayName = 'BreadcrumbList'

const HomeIcon = () => (
  <svg
    className="w-4 h-4 mr-1.5 inline-block"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    />
  </svg>
)

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      variant = 'default',
      separator = '/',
      showHomeIcon = true,
      humanPrefix,
      maxItems = 4,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const classes = ['relative inline-flex items-center flex-wrap', className ?? ''].filter(Boolean).join(' ')

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
      | { type: 'item'; data: BreadcrumbItemData; originalIndex: number }
      | { type: 'ellipsis'; count: number }

    let renderedEntries: RenderedEntry[] = []

    if (isCollapsible && hasEnoughToCollapse) {
      const before = items.slice(0, itemsBeforeCollapse)
      const after = items.slice(items.length - itemsAfterCollapse)
      const middle = items.slice(itemsBeforeCollapse, items.length - itemsAfterCollapse)

      if (!isExpanded) {
        renderedEntries = [
          ...before.map((data, i) => ({ type: 'item' as const, data, originalIndex: i })),
          { type: 'ellipsis' as const, count: middle.length },
          ...after.map((data, i) => ({ type: 'item' as const, data, originalIndex: items.length - itemsAfterCollapse + i })),
        ]
      } else {
        renderedEntries = [
          ...before.map((data, i) => ({ type: 'item' as const, data, originalIndex: i })),
          { type: 'ellipsis' as const, count: middle.length },
          ...middle.map((data, i) => ({ type: 'item' as const, data, originalIndex: itemsBeforeCollapse + i })),
          ...after.map((data, i) => ({ type: 'item' as const, data, originalIndex: items.length - itemsAfterCollapse + i })),
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
                <span key={`ellipsis-${index}`} className="inline-flex items-center">
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis
                      isExpanded={isExpanded}
                      onClick={() => setIsExpanded(!isExpanded)}
                      title={isExpanded ? 'Collapse breadcrumb steps' : `Show ${entry.count} hidden steps`}
                    />
                  </BreadcrumbItem>
                  {!isLastEntry && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
                </span>
              )
            }

            const item = entry.data
            const originalIndex = entry.originalIndex
            const isItemLast = originalIndex === items.length - 1
            const isActive = item.active ?? isItemLast
            const showDefaultHome = showHomeIcon && originalIndex === 0 && !item.icon

            return (
              <span key={`${item.label}-${originalIndex}`} className="inline-flex items-center">
                <BreadcrumbItem>
                  {isActive ? (
                    <BreadcrumbPage>
                      {showDefaultHome && <HomeIcon />}
                      {item.icon && <span className="mr-1.5 inline-flex items-center">{item.icon}</span>}
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href} onClick={item.onClick}>
                      {showDefaultHome && <HomeIcon />}
                      {item.icon && <span className="mr-1.5 inline-flex items-center">{item.icon}</span>}
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {!isLastEntry && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
              </span>
            )
          })}
        </BreadcrumbList>
      </nav>
    )
  }
)

Breadcrumb.displayName = 'Breadcrumb'

