import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { Spinner } from '../../../components/ui/Spinner'

describe('Spinner Component', () => {
  it('renders correctly with default props', () => {
    render(<Spinner data-testid="spinner" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveAttribute('role', 'status')
    expect(spinner).toHaveAttribute('aria-label', 'Loading')
    expect(spinner).toHaveClass('animate-spin')

    const hiddenText = screen.getByText('Loading...')
    expect(hiddenText).toBeInTheDocument()
    expect(hiddenText).toHaveClass('sr-only')
  })

  it('renders with custom size', () => {
    // The icon receives the size. The icon is rendered as an SVG inside the spinner.
    // We can query the SVG or just render it and check if it doesn't crash.
    const { container } = render(<Spinner size={48} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '48')
    expect(svg).toHaveAttribute('height', '48')
  })

  it('applies custom color via style', () => {
    render(<Spinner data-testid="spinner" color="#ff0000" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveStyle({ color: 'rgb(255, 0, 0)' })
  })

  it('applies the correct variant class when color is not provided', () => {
    render(<Spinner data-testid="spinner" variant="accent" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveClass('text-(--lithos-accent)')
  })

  it('renders anticlockwise when anticlockwise prop is true', () => {
    render(<Spinner data-testid="spinner" anticlockwise />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveClass('[animation-direction:reverse]')
  })

  it('applies custom className', () => {
    render(<Spinner data-testid="spinner" className="custom-class" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveClass('custom-class')
  })

  it('passes additional props to the container', () => {
    render(<Spinner data-testid="spinner" id="test-spinner" aria-hidden="true" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveAttribute('id', 'test-spinner')
    expect(spinner).toHaveAttribute('aria-hidden', 'true')
  })

  it('should not have basic accessibility violations', async () => {
    const { container } = render(<Spinner />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
