import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Footer1 } from '../../../../components/blocks/Footer/1'

describe('Footer1', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Footer1 />
      </MemoryRouter>
    )

    expect(screen.getByText('BRAND MARK')).toBeInTheDocument()
    
    // Check navigation groups
    expect(screen.getByText('Product')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
    expect(screen.getByText('Company')).toBeInTheDocument()

    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <Footer1 />
      </MemoryRouter>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
