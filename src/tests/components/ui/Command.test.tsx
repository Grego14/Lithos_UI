import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandLoading,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandBadge,
  CommandSeparator,
  CommandDialog,
} from '../../../components/ui/Command'

describe('Command Component', () => {
  it('renders input, groups, and items correctly', () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem value="item-1">
              <span>First Item</span>
              <CommandShortcut>⌘1</CommandShortcut>
            </CommandItem>
            <CommandItem value="item-2">Second Item</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
    expect(screen.getByText('First Item')).toBeInTheDocument()
    expect(screen.getByText('⌘1')).toBeInTheDocument()
    expect(screen.getByText('Second Item')).toBeInTheDocument()
  })

  it('filters items in real-time as user types', async () => {
    const user = userEvent.setup()
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem value="calendar">Calendar</CommandItem>
            <CommandItem value="calculator">Calculator</CommandItem>
            <CommandItem value="settings">Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    expect(screen.getByText('Calendar')).toBeInTheDocument()
    expect(screen.getByText('Calculator')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()

    const input = screen.getByRole('combobox')
    await user.type(input, 'calc')

    expect(screen.getByText('Calculator')).toBeInTheDocument()
    expect(screen.queryByText('Calendar')).not.toBeInTheDocument()
    expect(screen.queryByText('Settings')).not.toBeInTheDocument()
  })

  it('shows CommandEmpty and hides empty group when no items match', async () => {
    const user = userEvent.setup()
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No matching items.</CommandEmpty>
          <CommandGroup heading="Fruits">
            <CommandItem value="apple">Apple</CommandItem>
            <CommandItem value="banana">Banana</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    const input = screen.getByRole('combobox')
    await user.type(input, 'xyz')

    expect(screen.getByText('No matching items.')).toBeInTheDocument()
    expect(screen.queryByText('Fruits')).not.toBeInTheDocument()
    expect(screen.queryByText('Apple')).not.toBeInTheDocument()
  })

  it('navigates items with ArrowDown and ArrowUp and triggers onSelect on Enter', async () => {
    const handleSelect1 = vi.fn()
    const handleSelect2 = vi.fn()
    const user = userEvent.setup()

    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup>
            <CommandItem value="item-1" onSelect={handleSelect1}>
              First
            </CommandItem>
            <CommandItem value="item-2" onSelect={handleSelect2}>
              Second
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    const app = screen.getByRole('application')
    // First item is active by default
    const first = screen.getByText('First')
    expect(first).toHaveAttribute('data-selected', 'true')

    // Press ArrowDown to select Second item
    await user.type(app, '{arrowdown}')
    const second = screen.getByText('Second')
    expect(second).toHaveAttribute('data-selected', 'true')

    // Press Enter to activate Second
    await user.keyboard('{Enter}')
    expect(handleSelect2).toHaveBeenCalledTimes(1)
    expect(handleSelect1).not.toHaveBeenCalled()
  })

  it('skips disabled items during keyboard navigation', async () => {
    const user = userEvent.setup()

    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup>
            <CommandItem value="item-1">Item 1</CommandItem>
            <CommandItem value="item-2" disabled>
              Item 2 Disabled
            </CommandItem>
            <CommandItem value="item-3">Item 3</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    const app = screen.getByRole('application')
    expect(screen.getByText('Item 1')).toHaveAttribute('data-selected', 'true')

    // ArrowDown should skip disabled Item 2 and land directly on Item 3
    await user.type(app, '{arrowdown}')
    expect(screen.getByText('Item 3')).toHaveAttribute('data-selected', 'true')
  })

  it('triggers onSelect when clicked directly', async () => {
    const handleSelect = vi.fn()
    const user = userEvent.setup()

    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup>
            <CommandItem value="clickable" onSelect={handleSelect}>
              Clickable Item
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    await user.click(screen.getByText('Clickable Item'))
    expect(handleSelect).toHaveBeenCalledWith('clickable')
  })

  it('renders CommandDialog when open and dismisses on Escape', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()

    render(
      <CommandDialog open onClose={handleClose}>
        <Command>
          <CommandInput placeholder="Palette search..." />
          <CommandList>
            <CommandEmpty>Empty</CommandEmpty>
            <CommandItem value="doc">Documentation</CommandItem>
          </CommandList>
        </Command>
      </CommandDialog>
    )

    expect(screen.getByPlaceholderText('Palette search...')).toBeInTheDocument()
    expect(screen.getByText('Documentation')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(handleClose).toHaveBeenCalled()
  })

  it('renders CommandSeparator without crashing', () => {
    const { container } = render(
      <Command>
        <CommandList>
          <CommandItem value="1">One</CommandItem>
          <CommandSeparator />
          <CommandItem value="2">Two</CommandItem>
        </CommandList>
      </Command>
    )

    expect(container.querySelector('[role="separator"]')).toBeInTheDocument()
  })

  it('has no accessibility violations (jest-axe)', async () => {
    const { container } = render(
      <Command>
        <CommandInput placeholder="Search accessible commands..." />
        <CommandList>
          <CommandEmpty>No options.</CommandEmpty>
          <CommandGroup heading="System">
            <CommandItem value="profile">Profile</CommandItem>
            <CommandItem value="settings">Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    // Run axe check
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders CommandShortcut utilizing the Kbd primitive with mechanical keycap styling', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem value="item">
            <span>Item</span>
            <CommandShortcut size="xs" variant="accent">
              ⌘K
            </CommandShortcut>
          </CommandItem>
        </CommandList>
      </Command>
    )

    const kbd = screen.getByText('⌘K')
    expect(kbd).toBeInTheDocument()
    expect(kbd.tagName.toLowerCase()).toBe('kbd')
    expect(kbd).toHaveAttribute('data-slot', 'kbd')
  })

  it('clears search input when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Command>
        <CommandInput placeholder="Search..." />
      </Command>
    )

    const input = screen.getByRole('combobox') as HTMLInputElement
    await user.type(input, 'hello')
    expect(input.value).toBe('hello')

    const clearButton = screen.getByRole('button', { name: /clear search/i })
    expect(clearButton).toBeInTheDocument()

    await user.click(clearButton)
    expect(input.value).toBe('')
    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument()
  })

  it('renders CommandBadge and CommandLoading correctly', () => {
    render(
      <Command>
        <CommandLoading>Searching resources...</CommandLoading>
        <CommandList>
          <CommandItem value="1">
            <span>Option</span>
            <CommandBadge intent="accent">New</CommandBadge>
          </CommandItem>
        </CommandList>
      </Command>
    )

    expect(screen.getByRole('status')).toHaveTextContent('Searching resources...')
    expect(screen.getByText('New')).toBeInTheDocument()
  })
})
