import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '../../../components/ui/Breadcrumb'

describe('Breadcrumb', () => {
  const mockItems = [
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile', href: '/settings/profile' },
  ]

  it('renders correctly with children', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Current</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>
    )
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Current')).toBeInTheDocument()
  })

  it('renders items prop correctly', () => {
    render(<Breadcrumb items={mockItems} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  it('renders active item as page', () => {
    render(<Breadcrumb items={mockItems} />)
    const page = screen.getByText('Profile')
    expect(page.tagName).toBe('SPAN')
    expect(page).toHaveAttribute('aria-current', 'page')
  })

  it('renders links for inactive items', () => {
    render(<Breadcrumb items={mockItems} />)
    const link = screen.getByText('Home')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders collapsible variant and expands when ellipsis is clicked', async () => {
    const user = userEvent.setup()
    const manyItems = [
      { label: 'One', href: '/1' },
      { label: 'Two', href: '/2' },
      { label: 'Three', href: '/3' },
      { label: 'Four', href: '/4' },
      { label: 'Five', href: '/5' },
    ]
    render(<Breadcrumb items={manyItems} maxItems={4} />)
    
    // Middle item should not be in document initially
    expect(screen.queryByText('Three')).not.toBeInTheDocument()
    
    // Ellipsis should be there
    const ellipsis = screen.getByTitle(/Show 3 hidden steps/i)
    expect(ellipsis).toBeInTheDocument()

    await user.click(ellipsis)

    // Now it should be visible
    expect(screen.getByText('Three')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Breadcrumb items={mockItems} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
