import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { CodeViewer } from '../../../components/ui/CodeViewer'
import { ToastProvider } from '../../../components/ui/Toast'

const mockCode = `const greet = () => 'Hello World'`

describe('CodeViewer Component', () => {
  let writeTextSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    if (!navigator.clipboard) {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: () => Promise.resolve() },
        configurable: true,
        writable: true
      })
    }

    writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)
  })

  afterEach(() => {
    writeTextSpy.mockRestore()
    vi.restoreAllMocks()
  })

  it('renders code snippet correctly', () => {
    render(
      <ToastProvider>
        <CodeViewer code={mockCode} />
      </ToastProvider>
    )

    const codeContainer = screen.getByText((_, element) => {
      return element?.hasAttribute('data-code-viewer') ?? false
    })

    expect(codeContainer.textContent).toBe(mockCode)
  })

  it('renders language label when showLanguage is true', () => {
    render(
      <ToastProvider>
        <CodeViewer code={mockCode} language="typescript" showLanguage />
      </ToastProvider>
    )

    expect(screen.getByText('typescript')).toBeInTheDocument()
  })

  it('renders decorative color blocks instead of text when showLanguage is false', () => {
    render(
      <ToastProvider>
        <CodeViewer code={mockCode} language="tsx" showLanguage={false} />
      </ToastProvider>
    )

    expect(screen.queryByText('tsx')).not.toBeInTheDocument()
  })

  it('copies code to clipboard and triggers success toast on copy click', async () => {
    render(
      <ToastProvider>
        <CodeViewer code={mockCode} />
      </ToastProvider>
    )

    const copyBtn = screen.getByRole('button', { name: 'Copy code' })
    fireEvent.click(copyBtn)

    await waitFor(() => {
      expect(writeTextSpy).toHaveBeenCalledWith(mockCode)
    })

    expect(screen.getByText('SUCCESS')).toBeInTheDocument()
    expect(screen.getByText('Copied to clipboard')).toBeInTheDocument()
  })

  it('triggers error toast when clipboard write fails', async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(new Error('Permission denied'))

    render(
      <ToastProvider>
        <CodeViewer code={mockCode} />
      </ToastProvider>
    )

    const copyBtn = screen.getByRole('button', { name: 'Copy code' })
    await user.click(copyBtn)

    expect(screen.getByText('ERROR')).toBeInTheDocument()
    expect(screen.getByText('Failed to copy code to clipboard')).toBeInTheDocument()
  })

  it('applies embedded styles when embedded prop is true', () => {
    const { container } = render(
      <ToastProvider>
        <CodeViewer code={mockCode} embedded />
      </ToastProvider>
    )

    const rootWrapper = container.firstChild as HTMLElement
    expect(rootWrapper).toHaveClass('bg-transparent', 'mb-0')
    expect(rootWrapper).not.toHaveClass('border-2')
  })

  it('applies custom className passed via props', () => {
    const { container } = render(
      <ToastProvider>
        <CodeViewer code={mockCode} className="custom-test-class" />
      </ToastProvider>
    )

    const rootWrapper = container.firstChild as HTMLElement
    expect(rootWrapper).toHaveClass('custom-test-class')
  })

  it('has correct keyboard focus order and tabIndexes', () => {
    render(
      <ToastProvider>
        <CodeViewer code={mockCode} />
      </ToastProvider>
    )

    const copyBtn = screen.getByRole('button', { name: 'Copy code' })

    // the <pre> element is the one with the scroll not the <code>
    const codeContainer = screen.getByText((_, element) => element?.tagName === 'PRE')

    expect(copyBtn).not.toHaveAttribute('tabIndex', '-1')
    expect(codeContainer).not.toHaveAttribute('tabindex', '0')
  })

  it('allows focusing action button using keyboard navigation', async () => {
    const user = userEvent.setup()

    render(
      <ToastProvider>
        <CodeViewer code={mockCode} />
      </ToastProvider>
    )

    const copyBtn = screen.getByRole('button', { name: 'Copy code' })

    // Navegamos con Tab hasta llegar al botón
    await user.tab()
    expect(document.activeElement).toBe(copyBtn)
  })

  it('passes a11y audit without violations', async () => {
    const { container } = render(
      <ToastProvider>
        <CodeViewer code={mockCode} showLanguage />
      </ToastProvider>
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
