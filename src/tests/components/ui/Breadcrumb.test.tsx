import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../components/ui/Breadcrumb'

describe('Breadcrumb', () => {
  it('renders breadcrumb items', () => {
    render(
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Current' }]}
      />
    )

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/products')
    expect(screen.getByRole('link', { name: 'Current' })).toHaveAttribute('aria-current', 'page')
  })

  it('renders children when items are not provided', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>Current</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>
    )

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
    expect(screen.getByText('Current')).toBeInTheDocument()
  })

  it('renders the home icon by default', () => {
    render(<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Current' }]} />)

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
  })

  it('can hide the home icon', () => {
    render(<Breadcrumb showHomeIcon={false} items={[{ label: 'Home', href: '/' }, { label: 'Current' }]} />)

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.queryByTestId('home-icon')).not.toBeInTheDocument()
  })

  it('renders a custom separator', () => {
    render(
      <Breadcrumb
        separator={<span data-testid="custom-separator">/</span>}
        items={[{ label: 'Home', href: '/' }, { label: 'Current' }]}
      />
    )

    expect(screen.getByTestId('custom-separator')).toBeInTheDocument()
  })

  it('marks the last item as the current page by default', () => {
    render(
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Current' }]}
      />
    )

    expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument()
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page')
  })

  it('respects an explicitly active item', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/', active: true },
          { label: 'Products', href: '/products' },
        ]}
      />
    )

    expect(screen.getByText('Home')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument()
  })

  it('calls onClick when a breadcrumb link is clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Breadcrumb items={[{ label: 'Home', href: '/', onClick: handleClick }, { label: 'Current' }]} />)

    await user.click(screen.getByRole('link', { name: 'Home' }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders collapsible breadcrumbs when variant is collapsible', () => {
    render(
      <Breadcrumb
        variant="collapsible"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Category', href: '/category' },
          { label: 'Current' },
        ]}
      />
    )

    expect(screen.getByRole('button', { name: 'Expand breadcrumb steps' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByText('Current')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Products' })).not.toBeInTheDocument()
  })

  it('expands collapsed breadcrumb items when ellipsis is clicked', async () => {
    const user = userEvent.setup()

    render(
      <Breadcrumb
        variant="collapsible"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Category', href: '/category' },
          { label: 'Current' },
        ]}
      />
    )

    const ellipsis = screen.getByRole('button', { name: 'Expand breadcrumb steps' })

    await user.click(ellipsis)

    expect(screen.getByRole('button', { name: 'Collapse breadcrumb steps' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Category' })).toBeInTheDocument()
  })

  it('collapses expanded breadcrumb items when ellipsis is clicked again', async () => {
    const user = userEvent.setup()

    render(
      <Breadcrumb
        variant="collapsible"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Category', href: '/category' },
          { label: 'Current' },
        ]}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Expand breadcrumb steps' }))
    await user.click(screen.getByRole('button', { name: 'Collapse breadcrumb steps' }))

    expect(screen.getByRole('button', { name: 'Expand breadcrumb steps' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Products' })).not.toBeInTheDocument()
  })

  it('automatically collapses when items exceed maxItems', () => {
    render(
      <Breadcrumb
        maxItems={3}
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Category', href: '/category' },
          { label: 'Current' },
        ]}
      />
    )

    expect(screen.getByRole('button', { name: 'Expand breadcrumb steps' })).toBeInTheDocument()
  })

  it('renders BreadcrumbSeparator', () => {
    render(<BreadcrumbSeparator />)

    const separator = screen.getByRole('presentation', { hidden: true })

    expect(separator).toBeInTheDocument()
    expect(separator).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders BreadcrumbLink', () => {
    render(<BreadcrumbLink href="/products">Products</BreadcrumbLink>)

    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/products')
  })

  it('renders BreadcrumbPage as the current page', () => {
    render(<BreadcrumbPage>Current</BreadcrumbPage>)

    expect(screen.getByRole('link', { name: 'Current' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Current' })).toHaveAttribute('aria-disabled', 'true')
  })

  it('renders BreadcrumbEllipsis', () => {
    render(<BreadcrumbEllipsis />)

    expect(screen.getByRole('button', { name: 'Expand breadcrumb steps' })).toBeInTheDocument()
  })

  it('calls BreadcrumbEllipsis onClick', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<BreadcrumbEllipsis onClick={handleClick} />)

    await user.click(screen.getByRole('button', { name: 'Expand breadcrumb steps' }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Current' }]}
      />
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
