import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { Accordion, AccordionGroup } from '../../../components/ui/Accordion'

describe('Accordion', () => {
  it('renders title and content', () => {
    render(<Accordion title="Test Title">Test Content</Accordion>)
    expect(screen.getByRole('button', { name: /Test Title/i })).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('toggles content visibility on click', async () => {
    const user = userEvent.setup()
    render(<Accordion title="Test Title">Test Content</Accordion>)

    const button = screen.getByRole('button', { name: /Test Title/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Accordion title="Accessible Title">Content</Accordion>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('passes className, id, and other native props through to the root element', () => {
    const { container } = render(
      <Accordion title="Test Title" className="custom-class" id="custom-id" data-testid="custom-accordion">
        Test Content
      </Accordion>
    )
    const root = container.firstElementChild
    expect(root).toHaveClass('custom-class')
    expect(root).toHaveAttribute('id', 'custom-id')
    expect(root).toHaveAttribute('data-testid', 'custom-accordion')
  })
})

describe('AccordionGroup', () => {
  it('allows only one item to be open by default', async () => {
    const user = userEvent.setup()
    render(
      <AccordionGroup>
        <Accordion title="Item 1" value="1">
          Content 1
        </Accordion>
        <Accordion title="Item 2" value="2">
          Content 2
        </Accordion>
      </AccordionGroup>
    )

    const button1 = screen.getByRole('button', { name: /Item 1/i })
    const button2 = screen.getByRole('button', { name: /Item 2/i })

    await user.click(button1)
    expect(button1).toHaveAttribute('aria-expanded', 'true')
    expect(button2).toHaveAttribute('aria-expanded', 'false')

    await user.click(button2)
    expect(button1).toHaveAttribute('aria-expanded', 'false')
    expect(button2).toHaveAttribute('aria-expanded', 'true')
  })

  it('allows multiple items to be open when allowMultiple is true', async () => {
    const user = userEvent.setup()
    render(
      <AccordionGroup allowMultiple>
        <Accordion title="Item 1" value="1">
          Content 1
        </Accordion>
        <Accordion title="Item 2" value="2">
          Content 2
        </Accordion>
      </AccordionGroup>
    )

    const button1 = screen.getByRole('button', { name: /Item 1/i })
    const button2 = screen.getByRole('button', { name: /Item 2/i })

    await user.click(button1)
    await user.click(button2)

    expect(button1).toHaveAttribute('aria-expanded', 'true')
    expect(button2).toHaveAttribute('aria-expanded', 'true')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <AccordionGroup>
        <Accordion title="Item 1" value="1">
          Content 1
        </Accordion>
        <Accordion title="Item 2" value="2">
          Content 2
        </Accordion>
      </AccordionGroup>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('passes className, id, and other native props through to the root element', () => {
    const { container } = render(
      <AccordionGroup className="custom-class" id="custom-id" data-testid="custom-group">
        <Accordion title="Item 1" value="1">
          Content 1
        </Accordion>
      </AccordionGroup>
    )
    const root = container.firstElementChild
    expect(root).toHaveClass('custom-class')
    expect(root).toHaveAttribute('id', 'custom-id')
    expect(root).toHaveAttribute('data-testid', 'custom-group')
  })
})
