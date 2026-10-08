/**
 * @fileoverview Lithos UI SidebarItem interactive primitive.
 * - Polymorphic architecture: seamlessly renders as a default Lithos `Button` or delegates to custom links (`<a />`, `Link`) via `asChild`.
 * - Merges nested event handlers (combines parent and child `onClick`), auto-injects `aria-current="page"`, and conditionally hides label text in collapsed mini mode.
 */
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ElementType,
  type MouseEvent,
  type ComponentPropsWithRef,
} from 'react'
import type { SidebarItemProps } from './sidebar.types'
import { useSidebar } from './useSidebar'
import { cn } from '../../../utils/cn'
import { Button } from '../Button'

export const SidebarItem = <T extends ElementType = 'button'>({
  icon,
  children,
  active = false,
  onClick,
  className,
  asChild = false,
  ...rest
}: SidebarItemProps<T>) => {
  const { mode, open } = useSidebar()
  const isCollapsed = mode === 'mini' && !open

  const itemContent = (
    <>
      {icon && <span className="text-xl shrink-0 flex items-center justify-center w-6">{icon}</span>}
      {!isCollapsed && <span className="truncate text-left flex-1 leading-snug">{children}</span>}
    </>
  )

  const computedClassName = cn(
    'flex items-center w-full space-x-3 active:translate-none shadow-none justify-start transition-colors duration-150',
    active ? 'bg-(--lithos-accent) text-(--lithos-accent-text)' : 'hover:bg-(--lithos-surface-hover)',
    className
  )

  const computedTitle = isCollapsed && typeof children === 'string' ? children : undefined

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<ComponentPropsWithRef<T>>

    const childOnClick = child.props.onClick as ((e: MouseEvent<HTMLElement>) => void) | undefined
    const parentOnClick = onClick as ((e: MouseEvent<HTMLElement>) => void) | undefined

    const handleCombinedClick = (e: MouseEvent<HTMLElement>) => {
      childOnClick?.(e)
      parentOnClick?.(e)
    }

    const combinedProps = {
      ...rest,
      onClick: handleCombinedClick,
      title: child.props.title ?? computedTitle,
      'aria-current': active ? 'page' : undefined,
      className: cn(computedClassName, child.props.className),
      children: itemContent,
    }

    return cloneElement(child, combinedProps as unknown as ComponentPropsWithRef<T>)
  }

  return (
    <Button
      onClick={onClick}
      variant={active ? 'primary' : 'text'}
      title={computedTitle}
      className={computedClassName}
      {...rest}
    >
      {itemContent}
    </Button>
  )
}
