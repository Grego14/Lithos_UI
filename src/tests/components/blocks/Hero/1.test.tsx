import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Hero1 } from '../../../../components/blocks/Hero/1'

describe('Hero1', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Hero1 />
      </MemoryRouter>
    )

    // Check main heading
    expect(screen.getByText('BUILD SOMETHING UNBREAKABLE')).toBeInTheDocument()

    // Check links/buttons
    expect(screen.getByText('Start Free Trial')).toBeInTheDocument()
    expect(screen.getByText('Read Documentation')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <Hero1 />
      </MemoryRouter>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
