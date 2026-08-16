import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { PropsTable, PropsAccordion } from '../../../components/ui/PropsTable'

const mockData = [
  {
    name: 'testProp',
    type: 'string',
    description: 'A test property',
  },
  {
    name: 'requiredProp',
    type: 'number',
    required: true,
    defaultValue: '0',
    description: 'A required property',
  },
]

describe('PropsTable', () => {
  it('renders table headers', () => {
    render(<PropsTable data={mockData} />)
    expect(screen.getByText('Prop')).toBeInTheDocument()
    expect(screen.getByText('Type')).toBeInTheDocument()
    expect(screen.getByText('Default')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('renders prop rows correctly', () => {
    render(<PropsTable data={mockData} />)
    expect(screen.getByText('testProp')).toBeInTheDocument()
    expect(screen.getByText('requiredProp')).toBeInTheDocument()
    expect(screen.getByText('A test property')).toBeInTheDocument()
    expect(screen.getByText('A required property')).toBeInTheDocument()
  })

  it('shows required indicator', () => {
    render(<PropsTable data={mockData} />)
    expect(screen.getByTitle('Required')).toBeInTheDocument()
    expect(screen.getByTitle('Optional')).toBeInTheDocument()
  })

  it('has zero accessibility violations', async () => {
    const { container } = render(<PropsTable data={mockData} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('PropsAccordion', () => {
  it('renders accordion with title', () => {
    render(<PropsAccordion title="Component Props" data={mockData} />)
    expect(screen.getByText('Component Props')).toBeInTheDocument()
    expect(screen.getByText('testProp')).toBeInTheDocument()
  })

  it('has zero accessibility violations', async () => {
    const { container } = render(<PropsAccordion title="Component Props" data={mockData} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
