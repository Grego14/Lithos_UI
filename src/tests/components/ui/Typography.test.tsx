import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Typography } from '../../../components/ui/Typography'

describe('Typography', () => {
  it('renders children correctly', () => {
    render(<Typography>Hello Lithos</Typography>)
    expect(screen.getByText('Hello Lithos')).toBeInTheDocument()
  })

  it('renders as a paragraph by default with body variant styles', () => {
    render(<Typography>Default Text</Typography>)
    const element = screen.getByText('Default Text')

    expect(element.tagName).toBe('P')
    expect(element).toHaveClass('text-(length:--lithos-body-size)')
  })

  it('maps default HTML tag according to variant when "as" is not provided', () => {
    render(<Typography variant="h1">Heading 1</Typography>)
    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H1')
    expect(heading).toHaveClass('text-(length:--lithos-h1-size)')
  })

  it('overrides element tag when "as" prop is explicitly passed', () => {
    render(
      <Typography variant="h1" as="span">
        Polymorphic Text
      </Typography>
    )
    const element = screen.getByText('Polymorphic Text')

    expect(element.tagName).toBe('SPAN')
    expect(element).toHaveClass('text-(length:--lithos-h1-size)')
  })

  it('merges custom className with variant base classes', () => {
    render(<Typography className="custom-test-class">Custom Class</Typography>)
    const element = screen.getByText('Custom Class')

    expect(element).toHaveClass('custom-test-class')
    expect(element).toHaveClass('text-(length:--lithos-body-size)')
  })

  it('applies background color and computes contrast text color when valid hex color is provided', () => {
    render(<Typography color="#000000">Dark Background</Typography>)
    const element = screen.getByText('Dark Background')

    expect(element).toHaveStyle({
      backgroundColor: '#000000',
      color: '#ffffff',
    })
  })

  it('throws an error when invalid hex color is passed', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<Typography color="invalid-color">Bad Color</Typography>)
    }).toThrow('[Typography]: color must be a valid HexColor')

    consoleErrorSpy.mockRestore()
  })

  it('forwards native HTML attributes correctly', () => {
    render(
      <Typography as="label" htmlFor="username-input" id="label-test">
        Username
      </Typography>
    )
    const label = screen.getByText('Username')

    expect(label).toHaveAttribute('for', 'username-input')
    expect(label).toHaveAttribute('id', 'label-test')
  })

  it('forwards ref to the underlying element', () => {
    const ref = createRef<HTMLParagraphElement>()
    render(<Typography ref={ref}>Ref Text</Typography>)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('P')
  })

  it('passes accessibility checks (a11y)', async () => {
    const { container } = render(
      <main>
        <Typography variant="h1">Accessible Title</Typography>
        <Typography>Accessible Paragraph</Typography>
      </main>
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
