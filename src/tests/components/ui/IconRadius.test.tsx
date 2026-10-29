import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { IconRadius, IconRadiusLg, IconRadiusMd, IconRadiusNone, IconRadiusSm } from '../../../components/ui/icons'

describe('IconRadius', () => {
  it.each([
    ['none', '0', 'square', 'miter'],
    ['sm', '2.5', 'round', 'round'],
    ['md', '6', 'round', 'round'],
  ] as const)('preserves the %s corner geometry', (variant, radius, linecap, linejoin) => {
    const { container } = render(<IconRadius variant={variant} />)
    const rect = container.querySelector('rect')
    expect(rect).toHaveAttribute('rx', radius)
    expect(rect).toHaveAttribute('stroke-linecap', linecap)
    expect(rect).toHaveAttribute('stroke-linejoin', linejoin)
  })

  it('uses a circle for lg and updates when the variant changes', () => {
    const { container, rerender } = render(<IconRadius variant="lg" />)
    expect(container.querySelector('circle')).toHaveAttribute('r', '9')
    expect(container.querySelector('rect')).toBeNull()
    rerender(<IconRadius variant="sm" />)
    expect(container.querySelector('circle')).toBeNull()
    expect(container.querySelector('rect')).toHaveAttribute('rx', '2.5')
  })

  it('defaults to md and forwards SVG styling and accessibility attributes', () => {
    const { container } = render(
      <IconRadius
        size={24}
        strokeWidth={3}
        color="red"
        fill="blue"
        aria-label="Corner radius"
        className="radius-icon"
      />
    )
    const svg = container.querySelector('svg')
    const rect = container.querySelector('rect')
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
    expect(svg).toHaveAttribute('aria-label', 'Corner radius')
    expect(svg).toHaveClass('radius-icon')
    expect(svg).not.toHaveAttribute('variant')
    expect(rect).toHaveAttribute('rx', '6')
    expect(rect).toHaveAttribute('stroke', 'red')
    expect(rect).toHaveAttribute('stroke-width', '3')
    expect(rect).toHaveAttribute('fill', 'blue')
  })

  it.each([
    [IconRadiusNone, 'none'],
    [IconRadiusSm, 'sm'],
    [IconRadiusMd, 'md'],
    [IconRadiusLg, 'lg'],
  ] as const)('keeps the legacy export compatible', (LegacyIcon, variant) => {
    const { container: legacy } = render(<LegacyIcon size={20} />)
    const { container: current } = render(<IconRadius variant={variant} size={20} />)
    expect(legacy.innerHTML).toBe(current.innerHTML)
  })
})
