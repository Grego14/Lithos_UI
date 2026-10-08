import type { SurfacePlacement } from '../types'

interface CalculateDeltaOptions {
  pointerStart: { x: number; y: number }
  currentPointer: { x: number; y: number }
  placement: SurfacePlacement
  mode: 'bidirectional' | 'unidirectional'
}

interface DeltaResult {
  offset: number
  isOrthogonalScroll: boolean
}

/**
 * Calculates gesture displacement along the primary axis according to surface placement,
 * filtering out orthogonal scrolling actions.
 */
export const calculateGestureDelta = ({
  pointerStart,
  currentPointer,
  placement,
  mode,
}: CalculateDeltaOptions): DeltaResult => {
  const deltaX = currentPointer.x - pointerStart.x
  const deltaY = currentPointer.y - pointerStart.y

  const absX = Math.abs(deltaX)
  const absY = Math.abs(deltaY)

  // Detect user scrolling orthogonally against the placement axis
  const isHorizontalPlacement = placement === 'left' || placement === 'right'
  const isVerticalPlacement = placement === 'top' || placement === 'bottom'

  if ((isHorizontalPlacement && absY > absX) || (isVerticalPlacement && absX > absY)) {
    return { offset: 0, isOrthogonalScroll: true }
  }

  let offset = 0

  if (mode === 'bidirectional') {
    // Width mode: supports both expanding (+delta) and shrinking (-delta)
    if (placement === 'left') offset = -deltaX
    else if (placement === 'right') offset = deltaX
  } else {
    // Transform mode: strictly unidirectional swipe-to-dismiss towards edge
    if (placement === 'left' && deltaX < 0) offset = absX
    else if (placement === 'right' && deltaX > 0) offset = deltaX
    else if (placement === 'bottom' && deltaY > 0) offset = deltaY
    else if (placement === 'top' && deltaY < 0) offset = absY
  }

  return { offset, isOrthogonalScroll: false }
}
