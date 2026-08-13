import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Footer2 } from '../../../../components/blocks/Footer/2'

describe('Footer2', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Footer2 />
      </MemoryRouter>
    )

    expect(screen.getByText('BRAND MARK')).toBeInTheDocument()
    
    // Check navigation links
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()

    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <Footer2 />
      </MemoryRouter>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
