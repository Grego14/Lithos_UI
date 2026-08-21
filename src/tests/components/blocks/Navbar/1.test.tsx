import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { Navbar1 } from '../../../../components/blocks/Navbar/1'

describe('Navbar1', () => {
  it('renders correctly', () => {
    render(<Navbar1 />)

    // Logo
    expect(screen.getByRole('link', { name: /logo/i })).toBeInTheDocument()

    // Links (desktop + hidden mobile, testing by name handles multiple if they exist, but initially only desktop is visible)
    const productsLinks = screen.getAllByRole('link', { name: /products/i })
    expect(productsLinks.length).toBeGreaterThan(0)

    const featuresLinks = screen.getAllByRole('link', { name: /features/i })
    expect(featuresLinks.length).toBeGreaterThan(0)

    // Actions (Log In, Sign Up)
    const logInButtons = screen.getAllByRole('button', { name: /log in/i })
    expect(logInButtons.length).toBeGreaterThan(0)

    const signUpButtons = screen.getAllByRole('button', { name: /sign up/i })
    expect(signUpButtons.length).toBeGreaterThan(0)
  })

  it('toggles mobile menu open and closed', () => {
    render(<Navbar1 />)

    // Mobile menu button
    const menuButton = screen.getByRole('button', { name: /open menu/i })
    expect(menuButton).toBeInTheDocument()

    // At first, mobile overlay is not rendered.
    // We check this by seeing how many "Products" links there are.
    // There should only be 1 (desktop).
    expect(screen.getAllByRole('link', { name: /products/i })).toHaveLength(1)

    // Open menu
    fireEvent.click(menuButton)

    // Button label changes
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()

    // Mobile links appear
    const productsLinks = screen.getAllByRole('link', { name: /products/i })
    expect(productsLinks).toHaveLength(2)

    // Click a mobile link to close the menu
    fireEvent.click(productsLinks[1]!)

    // Menu is closed again
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /products/i })).toHaveLength(1)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Navbar1 />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})