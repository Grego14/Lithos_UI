import { act, createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Skeleton, SkeletonText } from '../../../components/ui/Skeleton'

describe('Skeleton', () => {
  it('shimmers the entire placeholder and removes its mask when switching animations', () => {
    const { rerender } = render(<Skeleton data-testid="placeholder" />)
    const element = screen.getByTestId('placeholder')
    const shimmer = 'animate-[lithos-shimmer_1.5s_linear_infinite]'
    const mask = '[mask-image:linear-gradient(to_right,#0006_35%,#000_50%,#0006_65%)]'
    expect(element).toHaveAttribute('data-animation', 'shimmer')
    expect(element).toHaveClass(
      shimmer,
      mask,
      '[mask-clip:no-clip]',
      'motion-reduce:[mask-image:none]',
      'forced-colors:[mask-image:none]'
    )
    expect(element).toBeEmptyDOMElement()
    rerender(<Skeleton data-testid="placeholder" animation="pulse" />)
    expect(element).toHaveClass('animate-pulse')
    expect(element).not.toHaveClass(shimmer, mask)
    rerender(<Skeleton data-testid="placeholder" animation={false} />)
    expect(element).toHaveClass('animate-none')
    expect(element).not.toHaveClass(shimmer, mask, 'animate-pulse')
  })

  it('renders a neutral text placeholder with pulse on the entire element', () => {
    render(<Skeleton data-testid="placeholder" animation="pulse" />)
    const element = screen.getByTestId('placeholder')
    expect(element).toHaveAttribute('data-variant', 'text')
    expect(element).toHaveAttribute('data-tone', 'neutral')
    expect(element).toHaveAttribute('data-animation', 'pulse')
    expect(element).toHaveClass('animate-pulse', '[animation-duration:1s]')
    expect(element).not.toHaveClass('after:animate-pulse', 'animate-none')
  })

  it.each(['text', 'rectangular', 'rounded', 'circular'] as const)(
    'lets consumer utilities replace %s variant defaults',
    (variant) => {
      render(
        <Skeleton data-testid="placeholder" variant={variant} className="w-24 h-10 rounded-lg bg-red-500 shadow-none" />
      )
      const element = screen.getByTestId('placeholder')
      expect(element).toHaveClass('w-24', 'h-10', 'rounded-lg', 'bg-red-500', 'shadow-none')
      expect(element).not.toHaveClass('w-full', 'w-12', 'h-auto', 'h-32', 'h-[1em]')
      expect(Array.from(element.classList).some((name) => name.startsWith('bg-[color-mix'))).toBe(false)
    }
  )

  it('is decorative and inert even when focus or ARIA attributes are supplied', async () => {
    const { container } = render(<Skeleton data-testid="placeholder" aria-hidden={false} tabIndex={0} />)
    const element = screen.getByTestId('placeholder')
    expect(element).toHaveAttribute('aria-hidden', 'true')
    expect(element).toHaveAttribute('inert')
    expect(element).toBeEmptyDOMElement()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('forwards native attributes and React 19 refs', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Skeleton ref={ref} id="cover" data-testid="placeholder" dir="rtl" />)
    expect(ref.current).toBe(screen.getByTestId('placeholder'))
    expect(ref.current).toHaveAttribute('id', 'cover')
    expect(ref.current).toHaveAttribute('dir', 'rtl')
  })

  it('applies explicit dimensions and gives inline styles precedence', () => {
    render(
      <Skeleton
        data-testid="placeholder"
        width="75%"
        height={24}
        style={{ height: 32 }}
        className={['w-24 h-10 max-w-sm', { 'rounded-full': true }]}
      />
    )
    expect(screen.getByTestId('placeholder')).toHaveStyle({ width: '75%', height: '32px' })
    expect(screen.getByTestId('placeholder')).toHaveClass('max-w-sm', 'rounded-full')
  })

  it('switches pulse off and back on without remounting the placeholder', () => {
    const { rerender } = render(<Skeleton data-testid="placeholder" animation="pulse" />)
    const element = screen.getByTestId('placeholder')
    rerender(<Skeleton data-testid="placeholder" animation={false} />)
    expect(screen.getByTestId('placeholder')).toBe(element)
    expect(element).toHaveAttribute('data-animation', 'none')
    expect(element).toHaveClass('animate-none')
    expect(element).not.toHaveClass('animate-pulse', '[animation-duration:1s]')
    rerender(<Skeleton data-testid="placeholder" animation="pulse" />)
    expect(screen.getByTestId('placeholder')).toBe(element)
    expect(element).toHaveClass('animate-pulse')
    expect(element).not.toHaveClass('animate-none')
  })

  it('includes reduced-motion and forced-colors safeguards', () => {
    render(<Skeleton data-testid="placeholder" />)
    expect(screen.getByTestId('placeholder')).toHaveClass(
      'motion-reduce:animate-none',
      'forced-colors:animate-none',
      'forced-colors:border-[CanvasText]',
      'forced-colors:bg-[Canvas]',
      'forced-colors:shadow-none'
    )
  })

  it('lets consumers override the pulse speed', () => {
    render(<Skeleton data-testid="placeholder" animation="pulse" className="[animation-duration:3s]" />)
    const element = screen.getByTestId('placeholder')
    expect(element).toHaveClass('animate-pulse', '[animation-duration:3s]')
    expect(element).not.toHaveClass('[animation-duration:1s]')
  })

  it('supports replacing loading placeholders with accessible content', async () => {
    const View = ({ loading }: { loading: boolean }) => (
      <>
        <section aria-label="Profile" aria-busy={loading}>
          {loading ? <SkeletonText /> : <button>Edit profile</button>}
        </section>
        <p role="status">{loading ? 'Loading profile' : 'Profile loaded'}</p>
      </>
    )
    const { rerender, container } = render(<View loading />)
    expect(screen.getByRole('region', { name: 'Profile' })).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByRole('status')).toHaveTextContent('Loading profile')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    rerender(<View loading={false} />)
    expect(screen.getByRole('region')).toHaveAttribute('aria-busy', 'false')
    expect(screen.getByRole('button', { name: 'Edit profile' })).toBeVisible()
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('SkeletonText', () => {
  it('defaults to three decorative shimmering lines with a shorter final line', () => {
    render(<SkeletonText data-testid="text" aria-hidden={false} />)
    const element = screen.getByTestId('text')
    expect(element).toHaveAttribute('aria-hidden', 'true')
    expect(element).toHaveAttribute('inert')
    expect(element.children).toHaveLength(3)
    for (const line of element.children) {
      expect(line).toHaveAttribute('aria-hidden', 'true')
      expect(line).toHaveAttribute('inert')
      expect(line).toHaveAttribute('data-animation', 'shimmer')
    }
    expect(element.children[2]).toHaveStyle({ width: '65%' })
  })

  it('shortens only the last line of multiline text', () => {
    const { rerender } = render(<SkeletonText data-testid="text" lines={4} lastLineWidth="40%" />)
    const lines = screen.getByTestId('text').children
    expect(lines).toHaveLength(4)
    for (const line of Array.from(lines).slice(0, -1)) {
      expect(line).not.toHaveAttribute('style')
    }
    expect(lines[3]).toHaveStyle({ width: '40%' })
    rerender(<SkeletonText data-testid="text" lines={1} lastLineWidth="40%" />)
    expect(screen.getByTestId('text').children[0]).not.toHaveAttribute('style')
  })

  it.each([
    [0, 0],
    [-1, 0],
    [2.8, 2],
    [NaN, 3],
    [Infinity, 3],
    [-Infinity, 3],
    [1000, 100],
  ])('handles lines=%s safely', (lines, expected) => {
    render(<SkeletonText data-testid="text" lines={lines} />)
    expect(screen.getByTestId('text').children).toHaveLength(expected)
  })

  it('forwards its ref and applies animation and tone to every line', () => {
    const ref = createRef<HTMLDivElement>()
    render(<SkeletonText data-testid="text" ref={ref} tone="accent" animation={false} />)
    expect(ref.current).toBe(screen.getByTestId('text'))
    expect(ref.current).toHaveAttribute('inert')
    for (const line of ref.current!.children) {
      expect(line).toHaveAttribute('data-tone', 'accent')
      expect(line).toHaveAttribute('data-animation', 'none')
      expect(line).toHaveClass('animate-none')
      expect(line).not.toHaveClass('animate-pulse')
    }
  })

  it('merges wrapper utility overrides and forwards native styles', () => {
    render(<SkeletonText data-testid="text" className="w-48 space-y-4" style={{ maxWidth: 240 }} />)
    const element = screen.getByTestId('text')
    expect(element).toHaveClass('w-48', 'space-y-4')
    expect(element).not.toHaveClass('w-full', 'space-y-[0.625em]')
    expect(element).toHaveStyle({ maxWidth: '240px' })
  })

  it('hydrates deterministic server markup without recoverable errors', async () => {
    const view = <SkeletonText lines={4} lastLineWidth="42%" />
    const host = document.createElement('div')
    host.innerHTML = renderToString(view)
    document.body.append(host)
    const originalLines = Array.from(host.querySelectorAll('[data-variant]'))
    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot> | undefined
    try {
      await act(async () => {
        root = hydrateRoot(host, view, { onRecoverableError })
      })
      expect(onRecoverableError).not.toHaveBeenCalled()
      expect(Array.from(host.querySelectorAll('[data-variant]'))).toEqual(originalLines)
    } finally {
      await act(async () => root?.unmount())
      host.remove()
    }
  })
})
