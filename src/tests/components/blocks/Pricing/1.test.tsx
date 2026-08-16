import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { Pricing1 } from '../../../../components/blocks/Pricing/1'

describe('Pricing1', () => {
  it('renders correctly', () => {
    render(<Pricing1 />)

    // Check main heading
    expect(screen.getByText('Simple, Transparent Pricing')).toBeInTheDocument()

    // Check all plan titles
    expect(screen.getByText('STARTER')).toBeInTheDocument()
    expect(screen.getByText('PRO')).toBeInTheDocument()
    expect(screen.getByText('ENTERPRISE')).toBeInTheDocument()

    // Check all prices
    expect(screen.getByText('$29')).toBeInTheDocument()
    expect(screen.getByText('$79')).toBeInTheDocument()
    expect(screen.getByText('$199')).toBeInTheDocument()

    // Check some specific features
    expect(screen.getByText(/Up to 5 Users/i)).toBeInTheDocument()
    expect(screen.getByText(/Unlimited Users/i)).toBeInTheDocument()

    // Check call to action buttons
    expect(screen.getByRole('button', { name: /start free trial/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /upgrade to pro/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /contact sales/i })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Pricing1 />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
