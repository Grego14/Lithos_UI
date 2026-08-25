/**
 * @fileoverview Lithos UI checkbox primitive.
 * - Real `<input type="checkbox">` stays mounted (`sr-only`, not `hidden`) so native semantics, keyboard control,
 *   and form submission all keep working; a sibling span is painted from its `peer-checked`/`peer-indeterminate`
 *   pseudo-classes, so the visual box tracks true DOM state in both controlled and uncontrolled usage.
 * - `indeterminate` is a DOM-only property (no HTML attribute), so it's synced imperatively via ref/useEffect.
 * - `variant="icon"` is the only one that renders a check/X, and is the only one with a distinct unchecked fill
 *   (fixed red) — checked always uses the theme accent (or `color`), unchecked is a fixed semantic "off" red so it
 *   reads the same regardless of the active accent. Every variant renders the indeterminate dash, since checked
 *   vs. partially-checked is a real state difference a flat fill color can't convey on its own.
 * - Checked defaults to the theme accent (`var(--lithos-accent)`/`var(--lithos-accent-text)`), same pairing as
 *   Button's primary variant. `color` overrides it per-instance with a custom hex, contrast computed via the YIQ
 *   engine.
 * - `CheckboxGroup` is a context provider: children `Checkbox`es that receive a `value` prop become controlled
 *   multi-select items automatically, while a standalone `Checkbox` outside any group stays fully independent.
 */
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  type ChangeEvent,
  type ComponentPropsWithRef,
  type CSSProperties,
  type ReactNode,
} from 'react'
import type { ClassArray, ClassValue } from 'clsx'
import type { HexColor } from '../../core/types'
import { colors } from '../../utils/colors'
import { getContrastText } from '../../utils/yiq'
import { cn } from '../../utils/cn'
import { IconCheck } from './icons/IconCheck'
import { IconMinus } from './icons/IconMinus'
import { IconClose } from './icons/IconClose'

export type CheckboxVariant = 'filled' | 'outlined' | 'icon'

interface CheckboxGroupContextType {
  value: string[]
  onToggleValue: (value: string) => void
  variant: CheckboxVariant
  disabled: boolean
  name?: string | undefined
}

const CheckboxGroupContext = createContext<CheckboxGroupContextType | null>(null)

export interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'size' | 'className' | 'value'> {
  variant?: CheckboxVariant | undefined
  color?: HexColor | string | undefined
  indeterminate?: boolean | undefined
  label?: ReactNode
  description?: ReactNode
  value?: string | undefined
  className?: ClassValue | ClassArray
}

export const Checkbox = ({
  variant,
  color,
  indeterminate = false,
  label,
  description,
  disabled,
  checked,
  defaultChecked,
  onChange,
  value,
  id,
  name,
  className,
  style,
  ref,
  ...rest
}: CheckboxProps) => {
  const group = useContext(CheckboxGroupContext)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const generatedId = useId()
  const inputId = id ?? generatedId

  const isGroupItem = group !== null && value !== undefined

  const resolvedVariant = variant ?? group?.variant ?? 'filled'
  const resolvedDisabled = disabled ?? group?.disabled ?? false
  const resolvedName = name ?? group?.name

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate
  }, [indeterminate])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isGroupItem) group!.onToggleValue(value!)
    onChange?.(event)
  }

  const boxColor = color || 'var(--lithos-accent)'
  const contrastColor = color ? getContrastText(color) : 'var(--lithos-accent-text)'
  const offColor = colors.error
  const offContrastColor = getContrastText(offColor)

  const isFilled = resolvedVariant === 'filled' || resolvedVariant === 'icon'
  const isIconVariant = resolvedVariant === 'icon'

  const colorVars = {
    '--cb-color': boxColor,
    '--cb-contrast': contrastColor,
    '--cb-off': offColor,
    '--cb-off-contrast': offContrastColor,
  } as CSSProperties

  const boxClasses = cn(
    'inline-block shrink-0 w-5 h-5 border-2 border-(--lithos-border) rounded-(--lithos-radius) transition-all duration-75',
    'shadow-[2px_2px_0px_0px_var(--lithos-shadow)] peer-active:shadow-none peer-active:translate-x-0.5 peer-active:translate-y-0.5',
    'peer-focus-visible:ring-2 peer-focus-visible:ring-(--lithos-text) peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-(--lithos-bg)',
    isIconVariant
      ? 'bg-[var(--cb-off)] peer-checked:bg-[var(--cb-color)] peer-indeterminate:bg-[var(--cb-color)]'
      : isFilled
        ? 'bg-(--lithos-surface) peer-checked:bg-[var(--cb-color)] peer-indeterminate:bg-[var(--cb-color)]'
        : 'bg-(--lithos-surface) peer-checked:border-[var(--cb-color)] peer-indeterminate:border-[var(--cb-color)]'
  )

  const iconColorStyle = { color: isFilled ? 'var(--cb-contrast)' : 'var(--cb-color)' }
  const crossColorStyle = { color: 'var(--cb-off-contrast)' }

  const iconBase =
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-opacity duration-75'

  const checkClasses = cn(iconBase, 'opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-0')
  const minusClasses = cn(iconBase, 'opacity-0 peer-indeterminate:opacity-100')
  const crossClasses = cn(iconBase, 'opacity-100 peer-checked:opacity-0 peer-indeterminate:opacity-0')

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-start',
        resolvedDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      style={style}
    >
      <span className="relative inline-flex shrink-0" style={colorVars}>
        <input
          ref={(node: HTMLInputElement | null) => {
            inputRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          type="checkbox"
          id={inputId}
          checked={isGroupItem ? group!.value.includes(value!) : checked}
          defaultChecked={isGroupItem ? undefined : defaultChecked}
          onChange={handleChange}
          disabled={resolvedDisabled}
          value={value}
          name={resolvedName}
          className="peer sr-only"
          {...rest}
        />
        <span aria-hidden="true" className={boxClasses} />
        {isIconVariant && (
          <>
            <IconClose aria-hidden="true" className={crossClasses} style={crossColorStyle} />
            <IconCheck aria-hidden="true" className={checkClasses} style={iconColorStyle} />
          </>
        )}
        <IconMinus aria-hidden="true" className={minusClasses} style={iconColorStyle} />
      </span>

      {(label || description) && (
        <span className="flex flex-col ml-2">
          {label && <span className="font-bold font-body leading-tight text-base">{label}</span>}
          {description && <span className="text-xs font-body opacity-70 leading-tight mt-0.5">{description}</span>}
        </span>
      )}
    </label>
  )
}

export interface CheckboxGroupProps {
  value: string[]
  onChange: (value: string[]) => void
  label?: ReactNode
  description?: ReactNode
  orientation?: 'horizontal' | 'vertical' | undefined
  variant?: CheckboxVariant | undefined
  disabled?: boolean | undefined
  name?: string | undefined
  className?: ClassValue | ClassArray
  children: ReactNode
}

export const CheckboxGroup = ({
  value,
  onChange,
  label,
  description,
  orientation = 'vertical',
  variant = 'filled',
  disabled = false,
  name,
  className,
  children,
}: CheckboxGroupProps) => {
  const groupId = useId()
  const labelId = `${groupId}-label`

  const onToggleValue = (item: string) => {
    onChange(value.includes(item) ? value.filter((v) => v !== item) : [...value, item])
  }

  const isHorizontal = orientation === 'horizontal'

  return (
    <div role="group" aria-labelledby={label ? labelId : undefined} className={cn('flex flex-col', className)}>
      {label && (
        <span id={labelId} className="mb-2 font-black uppercase tracking-tight text-sm">
          {label}
        </span>
      )}
      {description && <span className="mb-3 text-xs font-body opacity-70">{description}</span>}

      <div
        className={cn(
          'flex',
          isHorizontal ? 'flex-row flex-wrap [&>*:not(:first-child)]:ml-4' : 'flex-col [&>*:not(:first-child)]:mt-2'
        )}
      >
        <CheckboxGroupContext.Provider value={{ value, onToggleValue, variant, disabled, name }}>
          {children}
        </CheckboxGroupContext.Provider>
      </div>
    </div>
  )
}
