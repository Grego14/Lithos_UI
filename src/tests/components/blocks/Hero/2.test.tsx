import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Hero2 } from '../../../../components/blocks/Hero/2'

describe('Hero2', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Hero2 />
      </MemoryRouter>
    )

    // Check main heading
    expect(screen.getByText(/Ship Without/i)).toBeInTheDocument()

    // Check links/buttons
    expect(screen.getByText('Start Free Trial')).toBeInTheDocument()
    expect(screen.getByText('View Pricing')).toBeInTheDocument()
    
    // Check visual panel
    expect(screen.getByText('[ Application Interface ]')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <Hero2 />
      </MemoryRouter>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
