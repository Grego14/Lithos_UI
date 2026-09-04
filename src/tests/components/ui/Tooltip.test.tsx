import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { Tooltip } from '../../../components/ui/tooltip/Tooltip'
import { TooltipTrigger } from '../../../components/ui/tooltip/TooltipTrigger'
import { TooltipContent } from '../../../components/ui/tooltip/TooltipContent'
import type { TooltipProps } from '../../../components/ui/tooltip/Tooltip'

describe('Tooltip Component', () => {
  // Floating UI uses ResizeObserver which is not available in jsdom
  beforeAll(() => {
    globalThis.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  })

  const renderTooltip = (props: Partial<TooltipProps> = {}) => {
    return render(
      <Tooltip {...props}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    )
  }

  it('renders trigger correctly', () => {
    renderTooltip()
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('shows tooltip content on hover', async () => {
    renderTooltip()

    // Content should not be visible initially
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()

    // Hover over the trigger
    fireEvent.mouseEnter(screen.getByText('Hover me'))

    // Content should be visible after hover
    await waitFor(() => {
      expect(screen.getByText('Tooltip content')).toBeInTheDocument()
    })
  })

  it('hides tooltip content on mouse leave', async () => {
    renderTooltip()

    // Hover over the trigger
    fireEvent.mouseEnter(screen.getByText('Hover me'))

    // Content should be visible
    await waitFor(() => {
      expect(screen.getByText('Tooltip content')).toBeInTheDocument()
    })

    // Leave the trigger
    fireEvent.mouseLeave(screen.getByText('Hover me'))

    // Content should be hidden
    await waitFor(() => {
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })
  })

  it('shows tooltip content on focus', async () => {
    renderTooltip()

    fireEvent.focus(screen.getByText('Hover me'))

    await waitFor(() => {
      expect(screen.getByText('Tooltip content')).toBeInTheDocument()
    })
  })

  it('supports initialOpen prop', () => {
    renderTooltip({ initialOpen: true })

    expect(screen.getByText('Tooltip content')).toBeInTheDocument()
  })

  it('supports controlled open state', () => {
    const handleOpenChange = vi.fn()
    const { rerender } = render(
      <Tooltip open={true} onOpenChange={handleOpenChange}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    )

    expect(screen.getByText('Tooltip content')).toBeInTheDocument()

    rerender(
      <Tooltip open={false} onOpenChange={handleOpenChange}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    )

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
  })

  it('applies variant styles correctly', () => {
    render(
      <Tooltip initialOpen={true}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent variant="primary">Tooltip content</TooltipContent>
      </Tooltip>
    )

    const content = screen.getByText('Tooltip content').closest('div')
    expect(content).toHaveClass('bg-(--lithos-accent)')
  })

  it('throws error when child components are used outside of Tooltip provider', () => {
    const spy = vi.spyOn(console, 'error')
    spy.mockImplementation(() => {}) // Suppress React error logs

    expect(() => render(<TooltipTrigger>Hover me</TooltipTrigger>)).toThrow(
      'Tooltip components must be wrapped in <Tooltip />'
    )
    expect(() => render(<TooltipContent>Tooltip content</TooltipContent>)).toThrow(
      'Tooltip components must be wrapped in <Tooltip />'
    )

    spy.mockRestore()
  })

  it('should have no accessibility violations', async () => {
    const { container } = renderTooltip({ initialOpen: true })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
