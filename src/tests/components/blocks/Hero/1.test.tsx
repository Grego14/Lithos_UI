import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Hero1 } from '../../../../components/blocks/Hero/1'

describe('Hero1', () => {
  const updateAccentColor = vi.fn()
  const accentColor = '#ff0000'

  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Hero1 accentColor={accentColor} updateAccentColor={updateAccentColor} />
      </MemoryRouter>
    )

    // Check main heading
    expect(screen.getByText('BUILD FRONTENDS THAT REFUSE TO BREAK')).toBeInTheDocument()

    // Check links
    expect(screen.getByRole('link', { name: /documentation/i })).toHaveAttribute('href', '/docs')
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/lithosui/Lithos_UI')

    // Check color input
    const colorInput = screen.getByLabelText('Choose custom theme color')
    expect(colorInput).toBeInTheDocument()
    expect(colorInput).toHaveValue(accentColor)
  })

  it('calls updateAccentColor when a new color is selected', () => {
    render(
      <MemoryRouter>
        <Hero1 accentColor={accentColor} updateAccentColor={updateAccentColor} />
      </MemoryRouter>
    )

    const colorInput = screen.getByLabelText('Choose custom theme color')
    fireEvent.change(colorInput, { target: { value: '#00ff00' } })

    expect(updateAccentColor).toHaveBeenCalledWith('#00ff00')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <Hero1 accentColor={accentColor} updateAccentColor={updateAccentColor} />
      </MemoryRouter>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
