import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../components/ui/Breadcrumb'

describe('Breadcrumb', () => {
  it('renders a simple breadcrumb using compound components', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>
    )
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders breadcrumbs from the items prop', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Analytics' },
    ]
    render(<Breadcrumb items={items} />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('collapses breadcrumbs when items exceed maxItems', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/level-1' },
      { label: 'Level 2', href: '/level-2' },
      { label: 'Level 3', href: '/level-3' },
      { label: 'Level 4', href: '/level-4' },
      { label: 'Current' },
    ]
    // maxItems defaults to 4
    render(<Breadcrumb items={items} />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Current')).toBeInTheDocument()
    
    // Middle items should be hidden behind ellipsis
    expect(screen.queryByText('Level 2')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Expand breadcrumb steps' })).toBeInTheDocument()
  })

  it('expands collapsed breadcrumbs when ellipsis is clicked', async () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/level-1' },
      { label: 'Level 2', href: '/level-2' },
      { label: 'Level 3', href: '/level-3' },
      { label: 'Level 4', href: '/level-4' },
      { label: 'Current' },
    ]
    const user = userEvent.setup()
    render(<Breadcrumb items={items} />)
    
    const ellipsis = screen.getByRole('button', { name: 'Expand breadcrumb steps' })
    await user.click(ellipsis)
    
    expect(screen.getByText('Level 1')).toBeInTheDocument()
    expect(screen.getByText('Level 2')).toBeInTheDocument()
    expect(screen.getByText('Level 3')).toBeInTheDocument()
    expect(screen.getByText('Level 4')).toBeInTheDocument()
  })

  it('calls onClick handler when a breadcrumb link is clicked', async () => {
    const handleClick = vi.fn()
    const items = [
      { label: 'Home', onClick: handleClick },
      { label: 'Current' },
    ]
    const user = userEvent.setup()
    render(<Breadcrumb items={items} />)
    
    await user.click(screen.getByText('Home'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('has no accessibility violations - basic', async () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations - with items prop and collapsed', async () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/level-1' },
      { label: 'Level 2', href: '/level-2' },
      { label: 'Level 3', href: '/level-3' },
      { label: 'Level 4', href: '/level-4' },
      { label: 'Current' },
    ]
    const { container } = render(<Breadcrumb items={items} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
