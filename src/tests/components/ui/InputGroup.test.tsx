import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../../../components/ui/InputGroup'

describe('InputGroup Component', () => {
  it('renders a group container with the input inside', () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
    )

    expect(screen.getByTestId('group')).toBeInTheDocument()
    expect(screen.getByTestId('group')).toHaveAttribute('role', 'group')
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('applies the brutalist frame styles to the group', () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput />
      </InputGroup>
    )

    expect(screen.getByTestId('group')).toHaveClass(
      'border-2',
      'shadow-[2px_2px_0_0_var(--lithos-shadow)]',
      'focus-within:shadow-[4px_4px_0_0_var(--lithos-shadow)]',
      'overflow-hidden'
    )
  })

  it('strips the standalone input frame so the group owns the border', () => {
    render(
      <InputGroup>
        <InputGroupInput data-testid="input" />
      </InputGroup>
    )

    const input = screen.getByTestId('input')
    expect(input).toHaveClass('border-0', 'shadow-none', 'focus:shadow-none', 'flex-1')
    expect(input).not.toHaveClass('border-2')
  })

  it('pins the addon to the inline start edge by default with a divider', () => {
    render(
      <InputGroup>
        <InputGroupInput />
        <InputGroupAddon data-testid="addon">Icon</InputGroupAddon>
      </InputGroup>
    )

    const addon = screen.getByTestId('addon')
    expect(addon).toHaveClass('order-first', 'border-r-2')
    expect(addon).not.toHaveClass('order-last')
  })

  it('pins the addon to the inline end edge when align is inline-end', () => {
    render(
      <InputGroup>
        <InputGroupInput />
        <InputGroupAddon align="inline-end" data-testid="addon">
          12 results
        </InputGroupAddon>
      </InputGroup>
    )

    const addon = screen.getByTestId('addon')
    expect(addon).toHaveClass('order-last', 'border-l-2')
    expect(addon).not.toHaveClass('order-first')
  })

  it('renders addon content regardless of DOM order', () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>Icon</InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
    )

    expect(screen.getByText('Icon')).toHaveClass('order-first')
    expect(screen.getByText('12 results')).toHaveClass('order-last')
  })

  it('forwards native input attributes through InputGroupInput', () => {
    render(
      <InputGroup>
        <InputGroupInput type="email" placeholder="you@example.com" disabled />
      </InputGroup>
    )

    const input = screen.getByPlaceholderText('you@example.com')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toBeDisabled()
  })

  it('merges custom classNames on every subcomponent', () => {
    render(
      <InputGroup data-testid="group" className="custom-group max-w-xs">
        <InputGroupInput data-testid="input" className="custom-input" />
        <InputGroupAddon data-testid="addon" className="custom-addon">
          A
        </InputGroupAddon>
      </InputGroup>
    )

    expect(screen.getByTestId('group')).toHaveClass('custom-group', 'max-w-xs')
    expect(screen.getByTestId('input')).toHaveClass('custom-input')
    expect(screen.getByTestId('addon')).toHaveClass('custom-addon')
  })

  it('forwards refs to each subcomponent root', () => {
    const groupRef = createRef<HTMLDivElement | null>()
    const addonRef = createRef<HTMLDivElement | null>()
    render(
      <InputGroup ref={groupRef}>
        <InputGroupInput />
        <InputGroupAddon ref={addonRef}>A</InputGroupAddon>
      </InputGroup>
    )

    expect(groupRef.current).toBeInstanceOf(HTMLDivElement)
    expect(addonRef.current).toBeInstanceOf(HTMLDivElement)
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <InputGroup aria-label="Search files">
        <InputGroupInput aria-label="Search" />
        <InputGroupAddon>Icon</InputGroupAddon>
      </InputGroup>
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
