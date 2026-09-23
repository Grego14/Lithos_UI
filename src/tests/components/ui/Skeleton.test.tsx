import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { act } from 'react'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Skeleton, SkeletonText } from '../../../components/ui/Skeleton'

describe('Skeleton', () => {
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

  it('preserves responsive dimensions and gives explicit styles precedence', () => {
    render(
      <Skeleton
        data-testid="placeholder"
        width="75%"
        height={24}
        style={{ height: 32 }}
        className={['max-w-sm', { 'rounded-full': true }]}
      />
    )
    expect(screen.getByTestId('placeholder')).toHaveStyle({ width: '75%', height: '32px' })
    expect(screen.getByTestId('placeholder')).toHaveClass('max-w-sm', 'rounded-full')
  })

  it('switches animation off without remounting the placeholder', () => {
    const { rerender } = render(<Skeleton data-testid="placeholder" animation="pulse" />)
    const element = screen.getByTestId('placeholder')
    rerender(<Skeleton data-testid="placeholder" animation={false} />)
    expect(screen.getByTestId('placeholder')).toBe(element)
    expect(element).toHaveAttribute('data-animation', 'none')
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
  it('shortens only the last line of multiline text', () => {
    const { container, rerender } = render(<SkeletonText lines={4} lastLineWidth="40%" />)
    const lines = container.querySelectorAll('.lithos-skeleton')
    expect(lines).toHaveLength(4)
    expect(lines[0]).not.toHaveAttribute('style')
    expect(lines[3]).toHaveStyle({ width: '40%' })
    rerender(<SkeletonText lines={1} lastLineWidth="40%" />)
    expect(container.querySelector('.lithos-skeleton')).not.toHaveAttribute('style')
  })

  it.each([
    [0, 0],
    [-1, 0],
    [2.8, 2],
    [NaN, 3],
    [Infinity, 3],
    [1000, 100],
  ])('handles lines=%s safely', (lines, expected) => {
    const { container } = render(<SkeletonText lines={lines} />)
    expect(container.querySelectorAll('.lithos-skeleton')).toHaveLength(expected)
  })

  it('forwards its ref and applies animation and tone to every line', () => {
    const ref = createRef<HTMLDivElement>()
    render(<SkeletonText data-testid="text" ref={ref} tone="accent" animation={false} />)
    expect(ref.current).toBe(screen.getByTestId('text'))
    expect(ref.current).toHaveAttribute('inert')
    for (const line of ref.current!.children) {
      expect(line).toHaveAttribute('data-tone', 'accent')
      expect(line).toHaveAttribute('data-animation', 'none')
    }
  })

  it('hydrates deterministic server markup without recoverable errors', async () => {
    const view = <SkeletonText lines={4} lastLineWidth="42%" />
    const host = document.createElement('div')
    host.innerHTML = renderToString(view)
    document.body.append(host)
    const originalLines = Array.from(host.querySelectorAll('.lithos-skeleton'))
    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot> | undefined
    try {
      await act(async () => {
        root = hydrateRoot(host, view, { onRecoverableError })
      })
      expect(onRecoverableError).not.toHaveBeenCalled()
      expect(Array.from(host.querySelectorAll('.lithos-skeleton'))).toEqual(originalLines)
    } finally {
      await act(async () => root?.unmount())
      host.remove()
    }
  })
})
