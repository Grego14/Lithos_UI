/**
 * @fileoverview Lithos UI SidebarTrigger toggle primitive.
 * - Conditional visibility controller: automatically unmounts when layout mode is `'permanent'`.
 * - Polymorphic architecture: renders a default Lithos `Button` or delegates to a custom trigger element via `asChild`.
 * - Toggles open/collapsed state, merges nested `onClick` handlers, and configures fallback icon dimensions via `iconSize`.
 */
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ElementType,
  type MouseEvent,
  type ComponentPropsWithRef,
  type MouseEventHandler,
} from 'react'
import type { SidebarTriggerProps } from './sidebar.types'
import { useSidebar } from './useSidebar'
import { Button } from '../Button'
import { IconChevronLeft } from '../icons/IconChevronLeft'
import { IconSidebar } from '../icons/IconSidebar'

export const SidebarTrigger = <T extends ElementType = 'button'>({
  children,
  className,
  label,
  asChild = false,
  onClick,
  iconSize = 18,
  ...rest
}: SidebarTriggerProps<T>) => {
  const { mode, open, setOpen } = useSidebar()

  if (mode === 'permanent') return null

  const defaultIcon = open ? <IconChevronLeft size={iconSize} /> : <IconSidebar size={iconSize} />
  const ariaLabel = label ?? (open ? 'Collapse sidebar' : 'Expand sidebar')

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<ComponentPropsWithRef<T>>
    const childOnClick = child.props.onClick as ((e: MouseEvent<HTMLElement>) => void) | undefined
    const parentOnClick = onClick as ((e: MouseEvent<HTMLElement>) => void) | undefined

    const handleCombinedClick = (e: MouseEvent<HTMLElement>) => {
      childOnClick?.(e)
      parentOnClick?.(e)

      setOpen(!open)
    }

    return cloneElement(child, {
      ...rest,
      onClick: handleCombinedClick,
      'aria-label': child.props['aria-label'] ?? ariaLabel,
    } as unknown as ComponentPropsWithRef<T>)
  }

  return (
    <Button
      variant="text"
      onClick={(e) => {
        ;(onClick as MouseEventHandler<HTMLButtonElement>)?.(e)
        setOpen(!open)
      }}
      className={className}
      aria-label={ariaLabel}
      {...rest}
    >
      {children ?? defaultIcon}
    </Button>
  )
}
