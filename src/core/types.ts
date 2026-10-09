import type { ElementType, ReactNode, ComponentPropsWithRef } from 'react'
import 'react'

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined
  }
}

const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

// __brand doesn't exist at runtime; it just blocks plain strings from being assigned without going through isHexColor
export type HexColor = string & { readonly __brand: 'HexColor' }

export const isHexColor = (value: string): value is HexColor => HEX_COLOR_PATTERN.test(value)

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'text' | 'solid' | 'inverse'

/**
 * Creates a discriminated union supporting standard rendering or child delegation via `asChild`.
 *
 * @template BaseProps - Custom props required by the component.
 * @template DefaultElement - Default HTML element tag when `asChild` is false.
 * @template TargetElement - Dynamic element tag when `asChild` is true.
 */
export type AsChildProps<
  BaseProps,
  DefaultElement extends ElementType,
  TargetElement extends ElementType = DefaultElement,
> =
  | (BaseProps &
      Omit<ComponentPropsWithRef<DefaultElement>, keyof BaseProps> & {
        asChild?: false
      })
  | (BaseProps &
      Omit<ComponentPropsWithRef<TargetElement>, keyof BaseProps> & {
        /** Delegates rendering to its direct child element merging props and event handlers. */
        asChild: true
        children: ReactNode
      })
