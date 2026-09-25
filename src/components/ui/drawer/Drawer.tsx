/**
 * @fileoverview Lithos UI Drawer primitive.
 * - Renders temporary overlay drawers as well as permanent and mini layout sidebars.
 * - Integrates accessibility features, popovers, portals, and gesture swipe interactions.
 */
import { useEffect, useRef } from 'react'
import { cn } from '../../../utils/cn'
import { Popover, PopoverTrigger, PopoverContent } from '../Popover'
import { FloatingPortal } from '@floating-ui/react'

import { DrawerContext } from './useDrawer'
import { getTransitionClasses, getDuration } from './drawer.utils'
import type { DrawerProps, DrawerRole } from './drawer.types'
import { useDrawerSwipe } from './useDrawerSwipe'
import { DrawerIndicator } from './DrawerIndicator'

const elementMap: Record<DrawerRole, 'aside' | 'nav' | 'section' | 'div'> = {
  complementary: 'aside',
  navigation: 'nav',
  region: 'section',
  dialog: 'div',
}

export const Drawer = ({
  open,
  onOpenChange,
  placement = 'right',
  transition = 'slide',
  transformOrigin,
  children,
  onEnter,
  onExit,
  className,
  backdropClass = 'bg-black/50',
  trigger,
  mode = 'temporary',
  collapsedWidth = 'w-0',
  expandedWidth = 'w-64',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  role,
  transitionDuration = 150,
  swipeOnlyOnIndicator = false,

  // defaults to true on bottom/top placements
  indicator = placement === 'bottom' || placement === 'top',
  indicatorLabel,
  threshold = 100,
}: DrawerProps) => {
  const isFirstRender = useRef(true)

  const defaultRole: DrawerRole = mode === 'temporary' ? 'dialog' : 'complementary'
  const resolvedRole = role ?? defaultRole

  const activeDuration = getDuration(transitionDuration, open)
  const activeDurationMS = `${activeDuration}ms`
  const isHorizontal = placement === 'left' || placement === 'right'

  const isModal = mode === 'temporary'

  const a11y = {
    role: isModal ? 'dialog' : resolvedRole,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy ?? undefined,
  }

  const { handlers: swipeHandlers, style: swipeStyle } = useDrawerSwipe({
    // we pass 'top' to avoid passing undefined, but the
    // handlers aren't going to be used as the placement is still horizontal
    placement: isHorizontal ? 'top' : placement,
    open,
    onClose: () => onOpenChange(false),
    threshold,
  })

  const handleTarget = swipeOnlyOnIndicator || isHorizontal ? undefined : swipeHandlers

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (open) {
      onEnter?.()
    } else {
      onExit?.()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow

    if (mode === 'temporary' && open) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [open, mode])

  if (mode === 'permanent' || mode === 'mini') {
    const isPermanent = mode === 'permanent'
    const defaultMiniCollapsed = collapsedWidth === 'w-0' ? 'w-16' : collapsedWidth

    const Component = elementMap[resolvedRole] || 'aside'

    const drawerClasses = cn(
      'relative shrink-0 overflow-hidden bg-(--lithos-surface) transition-[opacity,width,height] ease-out',
      isHorizontal
        ? open
          ? expandedWidth
          : isPermanent
            ? collapsedWidth
            : defaultMiniCollapsed
        : open // vertical and open
          ? 'h-auto max-h-[80vh]'
          : isPermanent
            ? 'h-0'
            : 'h-16',
      isPermanent && !open && 'opacity-0 pointer-events-none',
      className
    )

    return (
      <DrawerContext.Provider value={{ open, onOpenChange }}>
        <Component
          {...a11y}
          aria-hidden={isPermanent ? !open : undefined}
          className={drawerClasses}
          style={{ transitionDuration: activeDurationMS }}
        >
          {children}
        </Component>
      </DrawerContext.Provider>
    )
  }

  const contentClasses = cn(
    'fixed bg-(--lithos-surface) min-w-[unset] border-0 shadow-none rounded-none p-0 z-(--lithos-z-drawer)',
    'transition-[translate,scale,opacity,transform] ease-out',
    getTransitionClasses(transition, placement, transformOrigin),
    className
  )

  const LandmarkTag = elementMap[resolvedRole]

  const drawerBody = LandmarkTag ? <LandmarkTag className="h-full w-full">{children}</LandmarkTag> : children

  return (
    <Popover matchTriggerWidth={false} open={open} onOpenChange={onOpenChange}>
      {trigger && <PopoverTrigger asChild>{trigger}</PopoverTrigger>}

      <DrawerContext.Provider value={{ open, onOpenChange }}>
        <FloatingPortal>
          <div
            aria-hidden={!open}
            className={cn('fixed inset-0 z-(--lithos-z-drawer)', open ? 'pointer-events-auto' : 'pointer-events-none')}
          >
            <div
              aria-hidden="true"
              onClick={() => onOpenChange(false)}
              className={cn(
                'absolute inset-0 transition-opacity ease-out z-(--lithos-z-overlay)',
                backdropClass,
                open ? 'opacity-100' : 'opacity-0'
              )}
              style={{ transitionDuration: activeDurationMS }}
            />

            <PopoverContent
              portaled={false}
              aria-modal="true"
              {...a11y}
              {...handleTarget}
              style={{
                position: 'fixed',
                top: 'auto',
                transform: swipeStyle.transform ?? undefined,
                left: 'auto',
                transitionDuration: activeDurationMS,
                ...swipeStyle,
              }}
              className={contentClasses}
              transitionDuration={activeDuration}
            >
              {indicator && (
                <DrawerIndicator
                  aria-label={indicatorLabel}
                  placement={placement}
                  swipeHandlers={swipeOnlyOnIndicator ? swipeHandlers : undefined}
                />
              )}
              {drawerBody}
            </PopoverContent>
          </div>
        </FloatingPortal>
      </DrawerContext.Provider>
    </Popover>
  )
}
