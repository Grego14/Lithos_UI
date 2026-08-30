/**
 * @fileoverview Lithos UI select type definitions.
 * - Defines option structures, event payloads, and context shapes for single and multi-selection modes.
 * - Exports public component props interfaces for consumer typing.
 */
import type { ReactNode, MouseEvent, KeyboardEvent, RefObject } from 'react'
import type { LithosClass } from '../../../utils/cn'

export type RegisterElementProps = (index: number, node: HTMLElement | null) => void

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
  icon?: ReactNode
}

export type HandleSelectType = <T extends HTMLElement = HTMLElement>(
  value: string,
  e: MouseEvent<T> | KeyboardEvent<T>
) => void

export interface SelectContextType {
  selectedValue: string | string[]
  handleSelect: HandleSelectType
  open: boolean
  setOpen: (open: boolean) => void
  activeIndex: number | null
  setActiveIndex: (index: number | null) => void
  elementsRef: RefObject<Array<HTMLElement | null>>
  labelsRef: RefObject<Array<string | null>>
  multiple?: boolean
  selectedIndex: number | null
  setSelectedIndex: (index: number | null) => void
  registerElement: RegisterElementProps
  options?: SelectOption[] | undefined
}

export type SelectOnChangeEvent<V = string, T extends HTMLElement = HTMLElement> = (
  value: V,
  event: MouseEvent<T> | KeyboardEvent<T>
) => void

export type SelectProps = {
  options?: SelectOption[]
  placeholder?: string | number
  className?: LithosClass
  disabled?: boolean
  children?: ReactNode
  label?: string
} & (
  | {
      multiple?: false
      value?: string | number
      defaultValue?: string | number
      onChange?: SelectOnChangeEvent
    }
  | {
      multiple: true
      value?: (string | number)[]
      defaultValue?: (string | number)[]
      onChange?: SelectOnChangeEvent<string[]>
    }
)
