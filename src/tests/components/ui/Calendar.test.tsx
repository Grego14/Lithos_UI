import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { Calendar } from '../../../components/ui/Calendar'

describe('Calendar', () => {
  it('renders correctly', () => {
    render(<Calendar mode="single" />)
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('selects a date on click in single mode', async () => {
    const user = userEvent.setup()
    render(<Calendar mode="single" />)
    
    const button = screen.getByText('15')
    await user.click(button)
    
    expect(button.parentElement).toHaveAttribute('aria-selected', 'true')
  })

  it('selects multiple dates in multiple mode', async () => {
    const user = userEvent.setup()
    render(<Calendar mode="multiple" />)
    
    const day15 = screen.getByText('15')
    const day16 = screen.getByText('16')
    
    await user.click(day15)
    await user.click(day16)
    
    expect(day15.parentElement).toHaveAttribute('aria-selected', 'true')
    expect(day16.parentElement).toHaveAttribute('aria-selected', 'true')
  })
  
  it('has no accessibility violations', async () => {
    const { container } = render(<Calendar mode="single" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
