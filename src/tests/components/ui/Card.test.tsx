import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { Card, CardImage, CardContent, CardTitle, CardDescription, CardFooter } from '../../../components/ui/Card'

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <CardContent>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardContent>
      </Card>
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Card data-testid="card">Content</Card>)

    expect(screen.getByTestId('card')).toHaveClass('bg-(--lithos-surface)', 'text-(--lithos-text)')
  })

  it('applies solid variant styles', () => {
    render(
      <Card variant="solid" data-testid="card">
        Content
      </Card>
    )

    expect(screen.getByTestId('card')).toHaveClass('bg-(--lithos-accent)', 'text-(--lithos-accent-text)')
  })

  it('applies accent variant hover styles', () => {
    render(
      <Card variant="accent" data-testid="card">
        Content
      </Card>
    )

    expect(screen.getByTestId('card')).toHaveClass('hover:bg-(--lithos-accent)')
  })

  it('applies image variant layout and overlay', () => {
    const { container } = render(
      <Card variant="image" data-testid="card">
        <CardImage src="/photo.jpg" alt="Photo" isBackground />
      </Card>
    )

    expect(screen.getByTestId('card')).toHaveClass('bg-transparent', 'flex', 'flex-col', 'justify-end')
    expect(container.querySelector('.pointer-events-none')).toBeInTheDocument()
  })

  it('enables hover lift only when interactive is set', () => {
    const { rerender } = render(<Card data-testid="card">Content</Card>)
    expect(screen.getByTestId('card')).not.toHaveClass('hover:-translate-y-1')

    rerender(
      <Card interactive data-testid="card">
        Content
      </Card>
    )
    expect(screen.getByTestId('card')).toHaveClass('hover:-translate-y-1')
  })

  it('CardContent applies spacing scale', () => {
    const { rerender } = render(
      <CardContent spacing="sm" data-testid="content">
        Body
      </CardContent>
    )
    expect(screen.getByTestId('content')).toHaveClass('p-3')

    rerender(
      <CardContent spacing="lg" data-testid="content">
        Body
      </CardContent>
    )
    expect(screen.getByTestId('content')).toHaveClass('p-9')
  })

  it('CardFooter applies spacing scale', () => {
    const { rerender } = render(
      <CardFooter spacing="sm" data-testid="footer">
        Actions
      </CardFooter>
    )
    expect(screen.getByTestId('footer')).toHaveClass('px-3', 'pt-2', 'pb-3')

    rerender(
      <CardFooter spacing="lg" data-testid="footer">
        Actions
      </CardFooter>
    )
    expect(screen.getByTestId('footer')).toHaveClass('px-9', 'pt-6', 'pb-9')
  })

  it('CardTitle renders as an h3', () => {
    render(<CardTitle>Heading</CardTitle>)

    expect(screen.getByRole('heading', { level: 3, name: 'Heading' })).toBeInTheDocument()
  })

  it('CardImage requires alt text and forwards it', () => {
    render(
      <Card>
        <CardImage src="/photo.jpg" alt="A landscape" />
      </Card>
    )

    expect(screen.getByAltText('A landscape')).toBeInTheDocument()
  })

  it('merges additional custom classNames', () => {
    render(
      <Card className="custom-class" data-testid="card">
        Content
      </Card>
    )

    expect(screen.getByTestId('card')).toHaveClass('custom-class')
  })

  it('forwards ref to the underlying div element', () => {
    const ref = createRef<HTMLDivElement | null>()
    render(<Card ref={ref}>Content</Card>)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('passes through extra HTML attributes', () => {
    render(
      <Card data-testid="card" id="card-1">
        Content
      </Card>
    )

    expect(screen.getByTestId('card')).toHaveAttribute('id', 'card-1')
  })

  it("passes className, id, and other native props through to each part's root element", () => {
    render(
      <Card className="custom-card" id="card-id" data-testid="card">
        <CardImage src="/photo.jpg" alt="Photo" className="custom-image" id="image-id" data-testid="image" />
        <CardContent className="custom-content" id="content-id" data-testid="content">
          <CardTitle className="custom-title" id="title-id" data-testid="title">
            Title
          </CardTitle>
          <CardDescription className="custom-desc" id="desc-id" data-testid="desc">
            Description
          </CardDescription>
        </CardContent>
        <CardFooter className="custom-footer" id="footer-id" data-testid="footer">
          Actions
        </CardFooter>
      </Card>
    )

    const cases = [
      ['card', 'custom-card', 'card-id'],
      ['image', 'custom-image', 'image-id'],
      ['content', 'custom-content', 'content-id'],
      ['title', 'custom-title', 'title-id'],
      ['desc', 'custom-desc', 'desc-id'],
      ['footer', 'custom-footer', 'footer-id'],
    ] as const

    cases.forEach(([testId, className, id]) => {
      const el = screen.getByTestId(testId)
      expect(el).toHaveClass(className)
      expect(el).toHaveAttribute('id', id)
    })
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Card>
        <CardImage src="/photo.jpg" alt="Preview" />
        <CardContent>
          <CardTitle>Accessible Card</CardTitle>
          <CardDescription>Description copy.</CardDescription>
        </CardContent>
        <CardFooter>Actions</CardFooter>
      </Card>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
