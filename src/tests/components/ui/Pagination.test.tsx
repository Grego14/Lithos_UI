import { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Pagination } from '../../../components/ui/Pagination'
import { BasicPagination } from '../../../docs/examples/pagination/BasicPagination'

describe('Pagination', () => {
  it('places a centered ellipsis between the first and last page groups', () => {
    render(<Pagination count={6} defaultPage={2} />)
    const items = screen.getAllByRole('listitem').slice(2, -2)
    expect(items.map((item) => item.textContent)).toEqual(['1', '2', '···', '5', '6'])
    expect(screen.getByText('···')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('···')).toHaveClass('items-center', 'justify-center')
  })

  it('renders a small page group for a large page count', () => {
    const { container, rerender } = render(<Pagination count={1000000} page={500000} />)
    const nav = container.querySelector('[data-slot="pagination"]')!
    expect(nav.querySelector('[aria-current="page"]')).toHaveTextContent('500000')
    expect(nav.querySelectorAll('button').length).toBeLessThanOrEqual(9)
    expect(nav.querySelectorAll('ul > li > span[aria-hidden="true"]')).toHaveLength(1)
    rerender(<Pagination count={1000000} page={500001} />)
    expect(nav.querySelector('[aria-current="page"]')).toHaveTextContent('500001')
  })

  it('jumps directly to the last and first pages and respects their boundaries', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination count={12} onPageChange={onPageChange} />)
    expect(screen.getByRole('button', { name: 'First page' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Last page' }))
    expect(screen.getByRole('status')).toHaveTextContent('Page 12 of 12')
    expect(onPageChange).toHaveBeenLastCalledWith(12)
    expect(screen.getByRole('button', { name: 'Last page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
    const first = screen.getByRole('button', { name: 'First page' })
    first.focus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('status')).toHaveTextContent('Page 1 of 12')
    expect(onPageChange).toHaveBeenLastCalledWith(1)
    expect(onPageChange).toHaveBeenCalledTimes(2)
  })

  it('can hide fast navigation while retaining previous and next controls', () => {
    render(<Pagination count={5} showEdges={false} />)
    expect(screen.queryByRole('button', { name: 'First page' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Last page' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled()
  })

  it('changes pages without passing either boundary', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination count={6} onPageChange={onPageChange} />)
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    expect(onPageChange).toHaveBeenLastCalledWith(2)
    await user.click(screen.getByRole('button', { name: 'Go to page 6' }))
    expect(screen.getByRole('status')).toHaveTextContent('Page 6 of 6')
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Previous page' }))
    expect(onPageChange).toHaveBeenLastCalledWith(5)
  })

  it('waits for controlled page updates and ignores repeated selections', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    const { rerender } = render(<Pagination count={6} page={2} onPageChange={onPageChange} />)
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    expect(onPageChange).toHaveBeenCalledWith(3)
    expect(screen.getByRole('button', { current: 'page' })).toHaveTextContent('2')
    rerender(<Pagination count={6} page={3} onPageChange={onPageChange} />)
    await user.click(screen.getByRole('button', { current: 'page' }))
    expect(onPageChange).toHaveBeenCalledTimes(1)
  })

  it('clamps uncontrolled state when count shrinks without restoring a stale page', () => {
    const onPageChange = vi.fn()
    const { rerender } = render(<Pagination count={20} defaultPage={18} onPageChange={onPageChange} />)
    rerender(<Pagination count={3} onPageChange={onPageChange} />)
    expect(screen.getByRole('status')).toHaveTextContent('Page 3 of 3')
    rerender(<Pagination count={20} onPageChange={onPageChange} />)
    expect(screen.getByRole('status')).toHaveTextContent('Page 3 of 20')
    expect(onPageChange).not.toHaveBeenCalled()
  })

  it.each([0, -1, Number.NaN, Infinity])('handles invalid or empty counts: %s', (count) => {
    const onPageChange = vi.fn()
    render(<Pagination count={count} variant="progress" onPageChange={onPageChange} />)
    expect(screen.getByRole('status')).toHaveTextContent('Page 0 of 0')
    screen.getAllByRole('button').forEach((button) => {
      expect(button).toBeDisabled()
      fireEvent.click(button)
    })
    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('supports keyboard selection, retains focus, and never submits the form', async () => {
    const user = userEvent.setup()
    const submit = vi.fn((event) => event.preventDefault())
    render(
      <form onSubmit={submit}>
        <Pagination count={6} />
      </form>
    )
    const target = screen.getByRole('button', { name: 'Go to page 2' })
    target.focus()
    await user.keyboard('{Enter}')
    expect(target).toHaveAttribute('aria-current', 'page')
    expect(target).toHaveFocus()
    const next = screen.getByRole('button', { name: 'Next page' })
    next.focus()
    await user.keyboard(' ')
    expect(screen.getByRole('status')).toHaveTextContent('Page 3 of 6')
    expect(next).toHaveFocus()
    expect(submit).not.toHaveBeenCalled()
  })

  it.each(['square', 'pill'] as const)('applies the %s shape to page controls', (shape) => {
    render(<Pagination count={5} shape={shape} />)
    expect(screen.getByRole('button', { name: 'Go to page 2' })).toHaveClass(
      shape === 'pill' ? 'rounded-full' : 'rounded-none'
    )
  })

  it('preserves the selected shape in track style', () => {
    render(<Pagination count={5} variant="track" shape="pill" />)
    expect(screen.getByRole('button', { name: 'Go to page 2' })).toHaveClass('rounded-full')
  })

  it.each([
    ['left', 'justify-start'],
    ['center', 'justify-center'],
    ['right', 'justify-end'],
  ] as const)('aligns to the %s of its container', (position, className) => {
    render(<Pagination count={5} position={position} />)
    expect(screen.getByRole('list')).toHaveClass(className)
  })

  it('forwards native nav props and ref', () => {
    const ref = createRef<HTMLElement>()
    render(<Pagination ref={ref} count={5} aria-label="Results" dir="rtl" className="text-red-600" />)
    expect(ref.current).toBe(screen.getByRole('navigation', { name: 'Results' }))
    expect(ref.current).toHaveAttribute('dir', 'rtl')
    expect(ref.current).toHaveClass('text-red-600')
  })

  it.each(['classic', 'dots', 'bordered', 'track', 'compact', 'progress'] as const)(
    'supports page changes and accessible markup for %s',
    async (variant) => {
      const user = userEvent.setup()
      const { container } = render(<Pagination count={5} variant={variant} shape="pill" defaultPage={2} />)
      await user.click(screen.getByRole('button', { name: 'Next page' }))
      expect(screen.getByRole('status')).toHaveTextContent('Page 3 of 5')
      expect(await axe(container)).toHaveNoViolations()
    }
  )

  it('updates the actual records in the controlled example', async () => {
    const user = userEvent.setup()
    render(<BasicPagination />)
    expect(screen.getByText('Project 01')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    expect(screen.queryByText('Project 01')).not.toBeInTheDocument()
    expect(screen.getByText('Project 04')).toBeInTheDocument()
  })
})
