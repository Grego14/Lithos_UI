/**
 * @fileoverview Lithos UI SidebarContent structural primitive.
 * - Dynamic semantic landmark container: maps `role` prop to accessible HTML elements (`nav`, `section`, `div`, `aside`).
 * - Smooth width transitions (`duration-150 ease-out`) adjusting between breakpoints or layout modes.
 * - Integrated resizer gesture control using the dedicated `useResizer` hook.
 */
import { useMemo, useEffect, type ElementType } from 'react'
import type { SidebarContentProps } from './sidebar.types'
import { useSidebar } from './useSidebar'
import { cn } from '../../../utils/cn'
import { useResizer } from '../../../core/hooks/useResizer'

const containersMap = {
  complementary: 'div',
  region: 'section',
  navigation: 'nav',
} as const

export const SidebarContent = <T extends ElementType = 'aside'>({
  collapsedWidth = 'w-16',
  expandedWidth = 'w-56',
  allowSwipeOnContent = true,
  resizerAriaLabel = 'Resize sidebar',
  resizerClass,
  resizerIndicatorClass,
  resizer,
  className,
  children,
  style,
  ...rest
}: SidebarContentProps<T>) => {
  const { role, mode, open, setOpen, placement, breakpoints, activeWidth, setActiveWidth, setIsDragging } = useSidebar()

  // Minimum and maximum thresholds dynamically derived from sorted breakpoints
  const minWidthPx = breakpoints[0] ?? 64
  const maxWidthPx = breakpoints[breakpoints.length - 1] ?? 224

  // Keep activeWidth in sync when controlled `open` state changes externally
  useEffect(() => {
    setActiveWidth(open ? maxWidthPx : minWidthPx)
  }, [open, maxWidthPx, minWidthPx, setActiveWidth])

  const isPermanent = mode === 'permanent'
  const isResizable = !isPermanent

  const {
    handlers,
    style: resizerStyle,
    isDragging,
  } = useResizer({
    placement,
    baseWidthPx: activeWidth,
    minWidthPx,
    maxWidthPx,
    snapPoints: breakpoints,
    allowGestureOnContent: allowSwipeOnContent,
    onSnap: (snappedWidth) => {
      setActiveWidth(snappedWidth)

      // The first breakpoint (index 0) or minWidth represents the closed/collapsed boundary
      const closedBoundary = breakpoints[0] ?? minWidthPx

      if (snappedWidth > closedBoundary) {
        setOpen(true)
      } else {
        setOpen(false)
      }
    },
    onDismiss: () => setOpen(false),
  })

  // Sync internal dragging state with context
  useEffect(() => {
    setIsDragging(isDragging)
  }, [isDragging, setIsDragging])

  const resolvedFallbackClass = isPermanent ? expandedWidth : open ? expandedWidth : collapsedWidth

  const ResolvedContainer = (containersMap[role] ?? 'aside') as ElementType
  const activeHandlers = isResizable ? handlers : {}

  // Priority: active drag style > inline width from snap state > external style prop
  const dynamicStyle = useMemo(() => {
    if (isDragging) return { ...style, ...resizerStyle }
    return { ...style, width: `${activeWidth}px` }
  }, [isDragging, style, resizerStyle, activeWidth])

  const isLeft = placement === 'left'

  return (
    <ResolvedContainer
      className={cn(
        'relative flex flex-col h-full shrink-0 bg-(--lithos-surface) overflow-y-auto overflow-x-hidden',
        !isDragging && 'transition-[width] duration-150 ease-out',
        !activeWidth && resolvedFallbackClass,
        className
      )}
      style={dynamicStyle}
      {...activeHandlers}
      {...rest}
    >
      {children}

      {isResizable &&
        (resizer ?? (
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label={resizerAriaLabel}
            className={cn(
              'absolute top-0 bottom-0 z-10 w-3 cursor-col-resize touch-none select-none group',
              'flex items-center justify-center transition-colors',
              isLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2',
              resizerClass
            )}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                'h-full w-0.5 bg-transparent transition-colors group-hover:bg-(--lithos-border)',
                isDragging && 'bg-(--lithos-accent) w-1',
                resizerIndicatorClass
              )}
            />
          </div>
        ))}
    </ResolvedContainer>
  )
}
