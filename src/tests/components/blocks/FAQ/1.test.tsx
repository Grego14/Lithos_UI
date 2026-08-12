import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { FAQ1 } from '../../../../components/blocks/FAQ/1'

describe('FAQ1', () => {
  it('renders correctly', () => {
    render(<FAQ1 />)
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
    expect(screen.getByText('Is this product scalable?')).toBeInTheDocument()
    expect(screen.getByText('Can I cancel anytime?')).toBeInTheDocument()
    expect(screen.getByText('Do you offer a free trial?')).toBeInTheDocument()
    expect(screen.getByText('What happens if I go over my plan limits?')).toBeInTheDocument()
  })

  it('expands answers when a question is clicked', () => {
    render(<FAQ1 />)
    
    // Initially the answer is not visible
    expect(screen.queryByText('Absolutely. We handle millions of requests a day without breaking a sweat.')).not.toBeInTheDocument()
    
    const firstQuestion = screen.getByText('Is this product scalable?')
    
    // The button containing the question
    const button = firstQuestion.closest('button')!
    expect(button).toHaveAttribute('aria-expanded', 'false')
    
    fireEvent.click(button)
    
    // After clicking, the answer is visible
    expect(screen.getByText('Absolutely. We handle millions of requests a day without breaking a sweat.')).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<FAQ1 />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
