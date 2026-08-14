import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { KineticGrid } from '../../../components/ui/KineticGrid'

describe('KineticGrid', () => {
  it('renders children correctly', () => {
    render(<KineticGrid>Test Content</KineticGrid>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('updates CSS variables on mouse move', () => {
    render(<KineticGrid>Test</KineticGrid>)
    
    // The container is the wrapper, we can find it by its child text
    const wrapper = screen.getByText('Test').parentElement as HTMLElement
    
    // Trigger mouse move
    fireEvent.mouseMove(wrapper, { clientX: 100, clientY: 100 })
    
    // Expect --mouse-x and --mouse-y to be set. Since getBoundingClientRect returns 0 in JSDOM, 
    // clientX - left = 100, clientY - top = 100
    expect(wrapper.style.getPropertyValue('--mouse-x')).toBe('100px')
    expect(wrapper.style.getPropertyValue('--mouse-y')).toBe('100px')
  })

  it('renders base grid and accent grid', () => {
    const { container } = render(<KineticGrid>Test</KineticGrid>)
    expect(container.querySelector('#base-grid')).toBeInTheDocument()
    expect(container.querySelector('#accent-grid')).toBeInTheDocument()
  })

  it('has zero accessibility violations', async () => {
    const { container } = render(<KineticGrid>Test</KineticGrid>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
