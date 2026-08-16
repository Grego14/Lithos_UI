import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { Testimonials1 } from '../../../../components/blocks/Testimonials/1'

describe('Testimonials1', () => {
  it('renders correctly', () => {
    render(<Testimonials1 />)

    // Check main heading
    expect(screen.getByText('Proof From the Front Lines')).toBeInTheDocument()

    // Check a specific quote
    expect(
      screen.getByText(
        'This product completely transformed how we operate. The workflow is incredibly smooth and efficient.'
      )
    ).toBeInTheDocument()

    // Check author names
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('Sarah Jones')).toBeInTheDocument()

    // Check author titles
    expect(screen.getByText('Marketing Director')).toBeInTheDocument()
    expect(screen.getByText('Lead Engineer')).toBeInTheDocument()
    expect(screen.getByText('Founder & CEO')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Testimonials1 />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
