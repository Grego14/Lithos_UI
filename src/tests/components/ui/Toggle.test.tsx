import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Toggle } from '../../../components/ui/Toggle'

describe('Toggle Component', () => {
  it('renders with default label', () => {
    const handleToggle = vi.fn()
    render(<Toggle checked={false} onToggle={handleToggle} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Theme Changed')).toBeInTheDocument()
  })

  it('renders with custom label', () => {
    const handleToggle = vi.fn()
    render(<Toggle checked={false} onToggle={handleToggle} label="Custom Toggle" />)

    expect(screen.getByText('Custom Toggle')).toBeInTheDocument()
  })

  it('applies correct aria-pressed attribute when unchecked', () => {
    const handleToggle = vi.fn()
    render(<Toggle checked={false} onToggle={handleToggle} />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })

  it('applies correct aria-pressed attribute when checked', () => {
    const handleToggle = vi.fn()
    render(<Toggle checked={true} onToggle={handleToggle} />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('applies correct aria-label attribute', () => {
    const handleToggle = vi.fn()
    render(<Toggle checked={false} onToggle={handleToggle} label="Test Label" />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Test Label')
  })

  it('calls onToggle when clicked', async () => {
    const handleToggle = vi.fn()
    const user = userEvent.setup()
    render(<Toggle checked={false} onToggle={handleToggle} />)

    await user.click(screen.getByRole('button'))
    expect(handleToggle).toHaveBeenCalledTimes(1)
  })

  it('calls onToggle multiple times on multiple clicks', async () => {
    const handleToggle = vi.fn()
    const user = userEvent.setup()
    render(<Toggle checked={false} onToggle={handleToggle} />)

    const button = screen.getByRole('button')
    await user.click(button)
    await user.click(button)
    await user.click(button)

    expect(handleToggle).toHaveBeenCalledTimes(3)
  })

  it('applies checked styles when checked', () => {
    const handleToggle = vi.fn()
    const { container } = render(<Toggle checked={true} onToggle={handleToggle} />)

    const track = container.querySelector('.bg-black')
    const thumb = container.querySelector('.translate-x-2')

    expect(track).toBeInTheDocument()
    expect(thumb).toBeInTheDocument()
  })

  it('applies unchecked styles when unchecked', () => {
    const handleToggle = vi.fn()
    const { container } = render(<Toggle checked={false} onToggle={handleToggle} />)

    const track = container.querySelector('.bg-white')
    const thumb = container.querySelector('.translate-x-0')

    expect(track).toBeInTheDocument()
    expect(thumb).toBeInTheDocument()
  })

  it('renders as button type', () => {
    const handleToggle = vi.fn()
    render(<Toggle checked={false} onToggle={handleToggle} />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('screen reader label is visually hidden', () => {
    const handleToggle = vi.fn()
    const { container } = render(<Toggle checked={false} onToggle={handleToggle} label="Hidden Label" />)

    const srOnlySpan = container.querySelector('.sr-only')
    expect(srOnlySpan).toBeInTheDocument()
    expect(srOnlySpan).toHaveTextContent('Hidden Label')
  })

  it('should have no accessibility violations when unchecked', async () => {
    const handleToggle = vi.fn()
    const { container } = render(<Toggle checked={false} onToggle={handleToggle} />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have no accessibility violations when checked', async () => {
    const handleToggle = vi.fn()
    const { container } = render(<Toggle checked={true} onToggle={handleToggle} />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have no accessibility violations with custom label', async () => {
    const handleToggle = vi.fn()
    const { container } = render(
      <Toggle checked={false} onToggle={handleToggle} label="Accessibility Toggle" />
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
