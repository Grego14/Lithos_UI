import { createRef } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Tabs, TabsList, TabsTrigger, TabsContent, type TabsProps } from '../../../components/ui/Tabs'

describe('Tabs Component', () => {
  const renderTabs = (props: Partial<TabsProps> = {}) => {
    return render(
      <Tabs defaultValue="tab1" {...props}>
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    )
  }

  it('renders correctly and shows default tab content', () => {
    renderTabs()

    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Content 1')).toBeInTheDocument()

    // Tab 2 content should not be in the document (or hidden)
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('switches tabs on click', () => {
    renderTabs()

    const tab2Trigger = screen.getByText('Tab 2')
    fireEvent.click(tab2Trigger)

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('supports controlled value', () => {
    const handleValueChange = vi.fn()
    renderTabs({ value: 'tab2', onValueChange: handleValueChange })

    expect(screen.getByText('Content 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()

    const tab1Trigger = screen.getByText('Tab 1')
    fireEvent.click(tab1Trigger)

    expect(handleValueChange).toHaveBeenCalledWith('tab1')

    // Content shouldn't change automatically since it is controlled
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('applies variant styles correctly (vertical)', () => {
    renderTabs({ variant: 'vertical' })

    const list = screen.getByTestId('tabs-list')
    expect(list).toHaveClass('flex-col')
  })

  it('applies variant styles correctly (underline)', () => {
    renderTabs({ variant: 'underline' })

    const list = screen.getByTestId('tabs-list')
    expect(list).toHaveClass('border-b-4', 'border-(--lithos-border)')
  })

  it('merges custom classNames', () => {
    render(
      <Tabs defaultValue="tab1" className="custom-tabs">
        <TabsList className="custom-list">
          <TabsTrigger value="tab1" className="custom-trigger">
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="custom-content">
          Content
        </TabsContent>
      </Tabs>
    )

    expect(document.querySelector('.custom-tabs')).toBeInTheDocument()
    expect(document.querySelector('.custom-list')).toBeInTheDocument()
    expect(document.querySelector('.custom-trigger')).toBeInTheDocument()
    expect(document.querySelector('.custom-content')).toBeInTheDocument()
  })

  it('forwards ref to the underlying elements', () => {
    const tabsRef = createRef<HTMLDivElement | null>()
    const listRef = createRef<HTMLDivElement | null>()
    const triggerRef = createRef<HTMLButtonElement | null>()
    const contentRef = createRef<HTMLDivElement | null>()

    render(
      <Tabs defaultValue="tab1" ref={tabsRef}>
        <TabsList ref={listRef}>
          <TabsTrigger value="tab1" ref={triggerRef}>
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" ref={contentRef}>
          Content
        </TabsContent>
      </Tabs>
    )

    expect(tabsRef.current).toBeInstanceOf(HTMLDivElement)
    expect(listRef.current).toBeInstanceOf(HTMLDivElement)
    expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement)
    expect(contentRef.current).toBeInstanceOf(HTMLDivElement)
  })

  it('throws error when child components are used outside of Tabs provider', () => {
    const spy = vi.spyOn(console, 'error')
    spy.mockImplementation(() => {}) // Suppress React error logs

    expect(() => render(<TabsList />)).toThrow('Tabs components must be used within a Tabs provider')
    expect(() => render(<TabsTrigger value="tab1" />)).toThrow('Tabs components must be used within a Tabs provider')
    expect(() => render(<TabsContent value="tab1" />)).toThrow('Tabs components must be used within a Tabs provider')

    spy.mockRestore()
  })

  it('should have no accessibility violations', async () => {
    const { container } = renderTabs()
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
