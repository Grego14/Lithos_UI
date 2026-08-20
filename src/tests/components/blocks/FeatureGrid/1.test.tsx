import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { FeatureGrid1 } from '../../../../components/blocks/FeatureGrid/1'

describe('FeatureGrid1', () => {
  it('renders correctly', () => {
    render(<FeatureGrid1 />)

    // Check main heading
    expect(screen.getByText('Everything you need to grow')).toBeInTheDocument()

    // Check all feature titles
    expect(screen.getByText('Real-time Analytics')).toBeInTheDocument()
    expect(screen.getByText('Enterprise Security')).toBeInTheDocument()
    expect(screen.getByText('Seamless Integrations')).toBeInTheDocument()
    expect(screen.getByText('24/7 Support')).toBeInTheDocument()

    // Check descriptions
    expect(
      screen.getByText('Track your metrics in real-time with our beautiful, easy-to-use dashboard.')
    ).toBeInTheDocument()

    // Check footer link
    expect(screen.getByRole('link', { name: /explore all features/i })).toHaveAttribute('href', '#')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<FeatureGrid1 />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
