import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { Input } from '../../../components/ui/Input'
import { colors } from '../../../utils/colors'

describe('Input Component', () => {
  it('renders a native input element', () => {
    render(<Input placeholder="Enter your name" />)

    const input = screen.getByPlaceholderText('Enter your name')
    expect(input).toBeInTheDocument()
    expect(input).toBeInstanceOf(HTMLInputElement)
  })

  it('applies base brutalist styles', () => {
    render(<Input data-testid="input" />)

    const input = screen.getByTestId('input')
    expect(input).toHaveClass('border-2', 'p-2', 'text-sm', 'outline-none', 'font-bold')
  })

  it('forwards native attributes to the element', () => {
    render(<Input type="email" placeholder="you@example.com" />)

    const input = screen.getByPlaceholderText('you@example.com')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('applies disabled styling and drops hover transition when disabled', () => {
    const { rerender } = render(<Input data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveClass('transition')

    rerender(<Input data-testid="input" disabled />)
    expect(screen.getByTestId('input')).toBeDisabled()
    expect(screen.getByTestId('input')).toHaveClass('opacity-50')
    expect(screen.getByTestId('input')).not.toHaveClass('transition')
  })

  it('applies the system error color when invalid is true', () => {
    render(<Input data-testid="input" invalid />)

    expect(screen.getByTestId('input')).toHaveStyle({ borderColor: colors.error })
  })

  it('keeps consumer inline styles while invalid forces only the border color', () => {
    render(<Input data-testid="input" invalid style={{ width: 200 }} />)

    expect(screen.getByTestId('input')).toHaveStyle({ borderColor: colors.error, width: '200px' })
  })

  it('merges additional custom classNames', () => {
    render(<Input data-testid="input" className="custom-class max-w-xs" />)

    expect(screen.getByTestId('input')).toHaveClass('custom-class', 'max-w-xs')
  })

  it('forwards ref to the underlying input element', () => {
    const ref = createRef<HTMLInputElement | null>()
    render(<Input ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(<Input aria-label="Username" />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
