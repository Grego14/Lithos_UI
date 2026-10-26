import { createRef, useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Slider } from '../../../components/ui/Slider'
import { AppBrightnessExample } from '../../../docs/examples/slider/brightness'
import { DifficultySliderExample } from '../../../docs/examples/slider/difficulty'
import { RangeSliderExample } from '../../../docs/examples/slider/range'
import { SliderOrientationExample } from '../../../docs/examples/slider/orientation'
import { DefaultSliderExample } from '../../../docs/examples/slider/default'
import { SteppedSliderExample } from '../../../docs/examples/slider/steps'
import { IrregularSteppedSliderExample } from '../../../docs/examples/slider/steps-irregular'

describe('Slider', () => {
  it('selects and announces irregular values when stepping between presets', async () => {
    const { container } = render(<IrregularSteppedSliderExample />)
    const input = screen.getByRole('slider', { name: 'Irregular value: 15' })
    fireEvent.input(input, { target: { value: '3' } })
    expect(input).toHaveAccessibleName('Irregular value: 35')
    expect(input).toHaveAttribute('aria-valuetext', '35')
    fireEvent.input(input, { target: { value: '5' } })
    expect(input).toHaveAccessibleName('Irregular value: 100')
    fireEvent.input(input, { target: { value: '4' } })
    expect(input).toHaveAttribute('aria-valuetext', '65')
    expect(await axe(container)).toHaveNoViolations()
  })

  it('updates the default example percentage as its native value changes', () => {
    render(<DefaultSliderExample />)
    const input = screen.getByRole('slider', { name: 'Volume: 40%' })
    fireEvent.change(input, { target: { value: '55' } })
    expect(input).toHaveAccessibleName('Volume: 55%')
    expect(input).toHaveAttribute('aria-valuetext', '55%')
  })

  it('demonstrates increments of 20 and displays the selected stepped value', () => {
    render(<SteppedSliderExample />)
    const input = screen.getByRole('slider', { name: 'Value: 20' })
    expect(input).toHaveAttribute('min', '0')
    expect(input).toHaveAttribute('max', '100')
    expect(input).toHaveAttribute('step', '20')
    fireEvent.change(input, { target: { value: '60' } })
    expect(input).toHaveValue('60')
    expect(input).toHaveAccessibleName('Value: 60')
  })

  it('supports horizontal and vertical modes without leaking mode to the native input', () => {
    const { rerender } = render(<Slider aria-label="Axis" mode="vertical" />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-orientation', 'vertical')
    expect(screen.getByRole('slider')).not.toHaveAttribute('mode')
    rerender(<Slider aria-label="Axis" mode="horizontal" />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-orientation', 'horizontal')
    expect(screen.getByRole('slider').className).not.toContain('[writing-mode:vertical-lr]')
  })

  it('shows both orientations and updates each value independently', async () => {
    const { container } = render(<SliderOrientationExample />)
    const horizontal = screen.getByRole('slider', { name: 'Horizontal Volume' })
    const vertical = screen.getByRole('slider', { name: 'Vertical Volume' })
    expect(horizontal).toHaveAttribute('aria-orientation', 'horizontal')
    expect(vertical).toHaveAttribute('aria-orientation', 'vertical')
    fireEvent.input(horizontal, { target: { value: '61' } })
    expect(horizontal).toHaveAttribute('aria-valuetext', '61%')
    expect(vertical).toHaveValue('60')
    fireEvent.input(vertical, { target: { value: '61' } })
    expect(vertical).toHaveAttribute('aria-valuetext', '61%')
    expect(await axe(container)).toHaveNoViolations()
  })
  // JSDOM does not implement native range keyboard actions. Browser regression
  // checks cover actual key-driven stepping; these tests verify React events.
  it.each(['horizontal', 'vertical'] as const)(
    'delegates native arrow actions and handles input events in %s mode',
    (mode) => {
      const onValueChange = vi.fn()
      render(<Slider aria-label="Keyboard" mode={mode} defaultValue={20} step={20} onValueChange={onValueChange} />)
      const input = screen.getByRole('slider')
      for (const key of ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End']) {
        expect(fireEvent.keyDown(input, { key })).toBe(true)
      }
      expect(onValueChange).not.toHaveBeenCalled()
      fireEvent.input(input, { target: { value: '40' } })
      expect(input).toHaveValue('40')
      expect(onValueChange).toHaveBeenCalledExactlyOnceWith(40)
    }
  )

  it('lets keyboard users focus both orientations in order', async () => {
    const user = userEvent.setup()
    render(<SliderOrientationExample />)
    await user.tab()
    expect(screen.getByRole('slider', { name: 'Horizontal Volume' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('slider', { name: 'Vertical Volume' })).toHaveFocus()
  })

  it('does not change disabled inputs or override a consumer cancelling keyboard input', () => {
    const { rerender } = render(<Slider aria-label="Value" defaultValue={40} disabled />)
    const input = screen.getByRole('slider')
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(input).toHaveValue('40')
    rerender(<Slider aria-label="Value" defaultValue={40} onKeyDown={(event) => event.preventDefault()} />)
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(input).toHaveValue('40')
  })

  it('captures the numeric value before the native callback can mutate the input', () => {
    const onValueChange = vi.fn()
    render(
      <Slider
        aria-label="Value"
        onChange={(event) => {
          event.currentTarget.value = '90'
        }}
        onValueChange={onValueChange}
      />
    )
    fireEvent.change(screen.getByRole('slider'), { target: { value: '40' } })
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith(40)
  })
  it('updates both range handles in 1% increments without crossing', async () => {
    const { container } = render(<RangeSliderExample />)
    const minimum = screen.getByRole('slider', { name: 'Minimum value' })
    const maximum = screen.getByRole('slider', { name: 'Maximum value' })
    expect(screen.getByText('Selected range: 0% to 22%')).toBeInTheDocument()
    fireEvent.change(minimum, { target: { value: '1' } })
    expect(minimum).toHaveValue('1')
    expect(maximum).toHaveAttribute('aria-valuemin', '1')
    fireEvent.change(minimum, { target: { value: '40' } })
    expect(minimum).toHaveValue('22')
    fireEvent.change(maximum, { target: { value: '0' } })
    expect(maximum).toHaveValue('22')
    fireEvent.change(maximum, { target: { value: '50' } })
    expect(screen.getByText('Selected range: 22% to 50%')).toBeInTheDocument()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('lets keyboard users focus each range handle separately', async () => {
    const user = userEvent.setup()
    render(<RangeSliderExample />)
    await user.tab()
    expect(screen.getByRole('slider', { name: 'Minimum value' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('slider', { name: 'Maximum value' })).toHaveFocus()
  })
  it('supports explicit shapes without changing the global radius', () => {
    const { rerender } = render(<Slider aria-label="Shape" shape="square" />)
    expect(screen.getByRole('slider').className).toContain('[&::-webkit-slider-thumb]:rounded-none')
    expect(screen.getByRole('slider').className).toContain('[&::-moz-range-track]:rounded-none')
    rerender(<Slider aria-label="Shape" shape="round" />)
    expect(screen.getByRole('slider').className).toContain('[&::-webkit-slider-thumb]:rounded-full')
    expect(screen.getByRole('slider').className).toContain('[&::-moz-range-track]:rounded-full')
    expect(screen.getByRole('slider').className).not.toContain('[&::-webkit-slider-thumb]:rounded-none')
  })

  it('resolves custom thumb border contrast and preserves consumer styles', () => {
    const { rerender } = render(<Slider aria-label="Color" color="#ffffff" style={{ width: 200 }} />)
    expect(screen.getByRole('slider')).toHaveStyle({
      '--slider-color': '#ffffff',
      '--slider-border': '#000000',
      width: '200px',
    })
    rerender(<Slider aria-label="Color" color="#000000" />)
    expect(screen.getByRole('slider')).toHaveStyle({ '--slider-border': '#FFFFFF' })
  })

  it('adjusts whole-app brightness and restores the original filter on unmount', async () => {
    const originalFilter = document.documentElement.style.filter
    document.documentElement.style.filter = 'contrast(1.1)'
    const { container, unmount } = render(<AppBrightnessExample />)
    const sliders = screen.getAllByRole('slider', { name: 'Brightness' })
    fireEvent.change(sliders[0]!, { target: { value: '0' } })
    expect(document.documentElement).toHaveStyle({ filter: 'brightness(0.25)' })
    expect(sliders[1]).toHaveValue('100')
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    fireEvent.focus(sliders[1]!)
    expect(document.documentElement).toHaveStyle({ filter: 'brightness(1)' })
    expect(sliders[0]).toHaveValue('0')
    fireEvent.change(sliders[1]!, { target: { value: '80' } })
    expect(document.documentElement).toHaveStyle({ filter: 'brightness(0.85)' })
    expect(sliders[0]).toHaveValue('0')
    expect(sliders[1]).toHaveValue('80')
    expect(await axe(container)).toHaveNoViolations()
    unmount()
    expect(document.documentElement).toHaveStyle({ filter: 'contrast(1.1)' })
    document.documentElement.style.filter = originalFilter
  })

  it('gives the two filled sliders unique associated labels', () => {
    render(<AppBrightnessExample />)
    const sliders = screen.getAllByRole('slider', { name: 'Brightness' })
    expect(sliders[0]!.id).not.toBe(sliders[1]!.id)
    expect(sliders[0]).toHaveAccessibleName('Brightness')
    expect(sliders[1]).toHaveAccessibleName('Brightness')
  })
  it('redistributes difficulty shares in 1% steps, including zero-sized shares', async () => {
    const { container } = render(<DifficultySliderExample />)
    const easy = screen.getByRole('slider', { name: 'Easy share' })
    const medium = screen.getByRole('slider', { name: 'Easy and medium share' })
    expect(easy).toHaveAttribute('aria-valuetext', 'Easy 30%, Medium 40%, Hard 30%')
    expect(easy).toHaveAttribute('step', '1')
    fireEvent.change(easy, { target: { value: '31' } })
    expect(easy).toHaveAttribute('aria-valuetext', 'Easy 31%, Medium 39%, Hard 30%')
    fireEvent.change(easy, { target: { value: '50' } })
    fireEvent.change(medium, { target: { value: '100' } })
    expect(medium).toHaveAttribute('aria-valuetext', 'Easy 50%, Medium 50%, Hard 0%')
    expect(screen.getAllByText('50%')).toHaveLength(2)
    expect(screen.getByText('0%')).toBeInTheDocument()
    fireEvent.change(medium, { target: { value: '10' } })
    expect(medium).toHaveValue('50')
    expect(medium).toHaveAttribute('aria-valuetext', 'Easy 50%, Medium 0%, Hard 50%')
    fireEvent.change(easy, { target: { value: '100' } })
    expect(easy).toHaveValue('50')
    fireEvent.change(easy, { target: { value: '0' } })
    fireEvent.change(medium, { target: { value: '0' } })
    expect(easy).toHaveAttribute('aria-valuetext', 'Easy 0%, Medium 0%, Hard 100%')
    expect(await axe(container)).toHaveNoViolations()
  })
  it('uses a labelled native range with default bounds and step', () => {
    render(
      <>
        <label htmlFor="volume">Volume</label>
        <Slider id="volume" />
      </>
    )
    const input = screen.getByRole('slider', { name: 'Volume' })
    expect(input).toHaveAttribute('type', 'range')
    expect(input).toHaveAttribute('min', '0')
    expect(input).toHaveAttribute('max', '100')
    expect(input).toHaveAttribute('step', '1')
    expect(input).toHaveValue('50')
  })

  it('updates uncontrolled values and calls both change callbacks with their documented types', () => {
    const onChange = vi.fn()
    const onValueChange = vi.fn()
    render(<Slider aria-label="Volume" defaultValue={25} onChange={onChange} onValueChange={onValueChange} />)
    const input = screen.getByRole('slider')
    fireEvent.change(input, { target: { value: '60' } })
    expect(input).toHaveValue('60')
    expect(onChange).toHaveBeenCalledOnce()
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith(60)
    expect(onChange.mock.invocationCallOrder[0]).toBeLessThan(onValueChange.mock.invocationCallOrder[0]!)
  })

  it('updates controlled values through the numeric callback', () => {
    const Example = () => {
      const [value, setValue] = useState(20)
      return <Slider aria-label="Volume" value={value} onValueChange={setValue} aria-valuetext={`${value}%`} />
    }
    render(<Example />)
    const input = screen.getByRole('slider')
    fireEvent.change(input, { target: { value: '65' } })
    expect(input).toHaveValue('65')
    expect(input).toHaveAttribute('aria-valuetext', '65%')
  })

  it('leaves ownership with the consumer when a controlled value does not change', () => {
    const onValueChange = vi.fn()
    const { rerender } = render(<Slider aria-label="Volume" value={30} onValueChange={onValueChange} />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '70' } })
    expect(onValueChange).toHaveBeenCalledWith(70)
    expect(screen.getByRole('slider')).toHaveValue('30')
    rerender(<Slider aria-label="Volume" value={80} onValueChange={onValueChange} />)
    expect(screen.getByRole('slider')).toHaveValue('80')
  })

  it('supports negative bounds, fractional steps, and numeric callback values', () => {
    const onValueChange = vi.fn()
    render(
      <Slider aria-label="Temperature" min={-10} max={40} step={0.5} defaultValue={-5} onValueChange={onValueChange} />
    )
    const input = screen.getByRole('slider')
    expect(input).toHaveAttribute('min', '-10')
    expect(input).toHaveAttribute('max', '40')
    expect(input).toHaveAttribute('step', '0.5')
    fireEvent.change(input, { target: { value: '-4.5' } })
    expect(onValueChange).toHaveBeenCalledWith(-4.5)
  })

  it('supports continuous ranges and a zero initial value', () => {
    render(<Slider aria-label="Gain" min={0} max={1} step="any" defaultValue={0} />)
    expect(screen.getByRole('slider')).toHaveValue('0')
    expect(screen.getByRole('slider')).toHaveAttribute('step', 'any')
  })

  it.each([-20, 120])('lets the native input clamp an out-of-bounds default of %s', (defaultValue) => {
    render(<Slider aria-label="Volume" defaultValue={defaultValue} />)
    expect(screen.getByRole('slider')).toHaveValue(defaultValue < 0 ? '0' : '100')
  })

  it('supports a fixed range', () => {
    render(<Slider aria-label="Fixed value" min={5} max={5} defaultValue={10} />)
    expect(screen.getByRole('slider')).toHaveValue('5')
  })

  it('forwards native attributes, styles, class names, and the input ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <Slider
        ref={ref}
        aria-label="Volume"
        aria-describedby="help"
        name="volume"
        dir="rtl"
        className="max-w-xs"
        style={{ width: 200 }}
      />
    )
    const input = screen.getByRole('slider')
    expect(ref.current).toBe(input)
    expect(input).toHaveAttribute('name', 'volume')
    expect(input).toHaveAttribute('dir', 'rtl')
    expect(input).toHaveAttribute('aria-describedby', 'help')
    expect(input).toHaveClass('max-w-xs')
    expect(input).toHaveStyle({ width: '200px' })
  })

  it('participates in native form submission and reset', () => {
    const { container } = render(
      <form>
        <Slider name="volume" aria-label="Volume" defaultValue={25} />
        <Slider name="disabled" aria-label="Disabled" disabled />
      </form>
    )
    const form = container.querySelector('form')!
    fireEvent.change(screen.getByRole('slider', { name: 'Volume' }), { target: { value: '70' } })
    expect(new FormData(form).get('volume')).toBe('70')
    expect(new FormData(form).has('disabled')).toBe(false)
    form.reset()
    expect(screen.getByRole('slider', { name: 'Volume' })).toHaveValue('25')
  })

  it('is keyboard focusable and skips disabled sliders', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Slider aria-label="Disabled" disabled />
        <Slider aria-label="Volume" />
        <button>Next</button>
      </>
    )
    await user.tab()
    expect(screen.getByRole('slider', { name: 'Volume' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button')).toHaveFocus()
    expect(screen.getByRole('slider', { name: 'Disabled' })).toBeDisabled()
  })

  it('forwards keyboard handlers so consumers can cancel browser actions', () => {
    const onKeyDown = vi.fn((event) => event.preventDefault())
    render(<Slider aria-label="Volume" onKeyDown={onKeyDown} />)
    expect(fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' })).toBe(false)
    expect(onKeyDown).toHaveBeenCalledOnce()
  })

  it('has no axe violations for labelled enabled and disabled controls', async () => {
    const { container } = render(
      <>
        <Slider aria-label="Volume" />
        <Slider aria-label="Unavailable" disabled />
      </>
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
