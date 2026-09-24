import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { Kbd, KbdGroup } from '../../../components/ui/Kbd'

describe('Kbd Component', () => {
  it('renders children correctly', () => {
    render(<Kbd>⌘</Kbd>)

    expect(screen.getByText('⌘')).toBeInTheDocument()
  })

  it('renders a semantic <kbd> element', () => {
    render(<Kbd>Ctrl</Kbd>)

    const kbd = screen.getByText('Ctrl')
    expect(kbd.tagName.toLowerCase()).toBe('kbd')
  })

  it('applies default size and variant styles correctly', () => {
    render(<Kbd>K</Kbd>)

    const kbd = screen.getByText('K')
    expect(kbd).toHaveClass('text-xs', 'min-w-7', 'h-7', 'px-2')
    expect(kbd).toHaveClass('bg-(--lithos-surface)', 'text-(--lithos-text)', 'border-2', 'border-(--lithos-border)')
  })

  it('renders different size styles correctly', () => {
    const { rerender } = render(<Kbd size="xs">XS</Kbd>)
    expect(screen.getByText('XS')).toHaveClass('text-[0.65rem]', 'min-w-5', 'h-5', 'px-1')

    rerender(<Kbd size="sm">SM</Kbd>)
    expect(screen.getByText('SM')).toHaveClass('text-xs', 'min-w-6', 'h-6', 'px-1.5')

    rerender(<Kbd size="md">MD</Kbd>)
    expect(screen.getByText('MD')).toHaveClass('text-xs', 'min-w-7', 'h-7', 'px-2')

    rerender(<Kbd size="lg">LG</Kbd>)
    expect(screen.getByText('LG')).toHaveClass('text-sm', 'min-w-8', 'h-8', 'px-2.5')
  })

  it('renders variant styles correctly', () => {
    const { rerender } = render(<Kbd variant="accent">Accent</Kbd>)
    expect(screen.getByText('Accent')).toHaveClass('bg-(--lithos-accent)', 'text-(--lithos-accent-text)')

    rerender(<Kbd variant="outline">Outline</Kbd>)
    expect(screen.getByText('Outline')).toHaveClass('bg-transparent', 'text-(--lithos-text)', 'shadow-none')

    rerender(<Kbd variant="subtle">Subtle</Kbd>)
    expect(screen.getByText('Subtle')).toHaveClass('bg-(--lithos-surface)', 'border-(--lithos-border)/50')

    rerender(<Kbd variant="inverse">Inverse</Kbd>)
    expect(screen.getByText('Inverse')).toHaveClass('bg-(--lithos-text)', 'text-(--lithos-bg)')
  })

  it('calculates dynamic YIQ contrast for custom color prop', () => {
    // Dark background -> white text
    const { rerender } = render(<Kbd color="#000000">Dark</Kbd>)
    const darkKbd = screen.getByText('Dark')
    expect(darkKbd).toHaveStyle({
      backgroundColor: '#000000',
      color: '#ffffff',
    })

    // Bright yellow background -> black text
    rerender(<Kbd color="#FFFF00">Light</Kbd>)
    const lightKbd = screen.getByText('Light')
    expect(lightKbd).toHaveStyle({
      backgroundColor: '#FFFF00',
      color: '#000000',
    })
  })

  it('merges custom className without losing essential classes', () => {
    render(<Kbd className="custom-test-class opacity-80">Test</Kbd>)

    const kbd = screen.getByText('Test')
    expect(kbd).toHaveClass('custom-test-class', 'opacity-80')
  })

  it('forwards ref to the underlying <kbd> element', () => {
    const ref = createRef<HTMLElement | null>()
    render(<Kbd ref={ref}>Ref Key</Kbd>)

    expect(ref.current).toBeInstanceOf(HTMLElement)
    expect(ref.current?.tagName.toLowerCase()).toBe('kbd')
    expect(ref.current?.textContent).toBe('Ref Key')
  })

  it('passes through extra HTML attributes', () => {
    render(
      <Kbd data-testid="kbd-element" id="key-1" aria-label="Command key">
        ⌘
      </Kbd>
    )

    const kbd = screen.getByTestId('kbd-element')
    expect(kbd).toHaveAttribute('id', 'key-1')
    expect(kbd).toHaveAttribute('aria-label', 'Command key')
  })

  it('has zero accessibility violations', async () => {
    const { container } = render(<Kbd>Enter</Kbd>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

describe('KbdGroup Component', () => {
  it('renders children with group role and default spacing', () => {
    render(
      <KbdGroup data-testid="kbd-group">
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    )

    const group = screen.getByTestId('kbd-group')
    expect(group).toHaveAttribute('role', 'group')
    expect(group).toHaveClass('space-x-1.5')
    expect(screen.getByText('Ctrl')).toBeInTheDocument()
    expect(screen.getByText('K')).toBeInTheDocument()
  })

  it('applies negative margin math when attached is true (Zero-Gap Rule)', () => {
    render(
      <KbdGroup attached data-testid="kbd-group-attached">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    )

    const group = screen.getByTestId('kbd-group-attached')
    expect(group).toHaveClass('[&>*:not(:first-child)]:-ml-0.5')
  })

  it('forwards ref to the group container div', () => {
    const ref = createRef<HTMLDivElement | null>()
    render(
      <KbdGroup ref={ref}>
        <Kbd>Shift</Kbd>
      </KbdGroup>
    )

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('has zero accessibility violations for grouped keys', async () => {
    const { container } = render(
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>C</Kbd>
      </KbdGroup>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
