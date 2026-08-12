import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { ThemeEngine1 } from '../../../../components/blocks/ThemeEngine/1'

describe('ThemeEngine1', () => {
  const updateAccentColor = vi.fn()
  const accentColor = '#00FF00'

  it('renders correctly', () => {
    render(<ThemeEngine1 accentColor={accentColor} updateAccentColor={updateAccentColor} />)
    
    // Check main heading
    expect(screen.getByText('Dynamic Theme Engine')).toBeInTheDocument()
    
    // Check all preset theme buttons
    expect(screen.getByRole('button', { name: /activate cyan theme/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /activate purple theme/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /activate yellow theme/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /activate orange theme/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /activate pink theme/i })).toBeInTheDocument()
    
    // Check custom color input
    const colorInput = screen.getByLabelText('Choose custom theme color')
    expect(colorInput).toBeInTheDocument()
    
    // Check reset button
    expect(screen.getByRole('button', { name: /reset to default theme/i })).toBeInTheDocument()
  })

  it('calls updateAccentColor with the correct hex when a preset is clicked', () => {
    render(<ThemeEngine1 accentColor={accentColor} updateAccentColor={updateAccentColor} />)
    
    const cyanButton = screen.getByRole('button', { name: /activate cyan theme/i })
    fireEvent.click(cyanButton)
    
    expect(updateAccentColor).toHaveBeenCalledWith('#00FFFF')
  })

  it('calls updateAccentColor with a custom hex when the color input changes', () => {
    render(<ThemeEngine1 accentColor={accentColor} updateAccentColor={updateAccentColor} />)
    
    const colorInput = screen.getByLabelText('Choose custom theme color')
    fireEvent.change(colorInput, { target: { value: '#123456' } })
    
    expect(updateAccentColor).toHaveBeenCalledWith('#123456')
  })

  it('calls updateAccentColor with the default hex when reset is clicked', () => {
    render(<ThemeEngine1 accentColor={accentColor} updateAccentColor={updateAccentColor} />)
    
    const resetButton = screen.getByRole('button', { name: /reset to default theme/i })
    fireEvent.click(resetButton)
    
    expect(updateAccentColor).toHaveBeenCalledWith('#00FF00')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<ThemeEngine1 accentColor={accentColor} updateAccentColor={updateAccentColor} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
