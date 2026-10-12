/**
 * @fileoverview Lithos UI dialog primitive type definitions and interfaces.
 * - Defines variants, intents, sizes, context contracts, and component prop configurations.
 */
import type { RefObject, ReactNode } from 'react'
import type { LithosElementProps } from '../../../core/types'
import type { ButtonVariant } from '../Button'

/**
 * Visual structural variants supported by the dialog panel.
 */
export type DialogVariant = 'default' | 'simple' | 'bare'

/**
 * Semantic intent styling categories for dialog accents and borders.
 */
export type DialogIntent = 'default' | 'success' | 'error' | 'warning' | 'info'

/**
 * Maximum width scale options for the dialog container.
 */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl'

/**
 * Props configuration interface for the root `Dialog` component.
 */
export interface DialogProps extends LithosElementProps<'div'> {
  /** Controls visibility state of the modal overlay. */
  open: boolean

  /** Callback function triggered when attempting to dismiss or close the dialog. */
  onClose: () => void

  /** Visual structural variant style. */
  variant?: DialogVariant

  /** Semantic accent intent styling category. */
  intent?: DialogIntent | undefined

  /** Maximum width sizing scale for the panel. */
  size?: DialogSize

  /** Custom override hex color string for brutalist offset shadows. */
  offsetColor?: string

  /** Enables inner scroll boundaries and dividing border separators for header and footer. */
  scrollable?: boolean

  /** Optional reference to an element that should receive initial focus upon opening. */
  initialFocusRef?: RefObject<HTMLElement | null>
}

/**
 * Context value contract shared across dialog sub-components.
 */
export interface DialogContextType {
  /** Callback dispatcher to close the dialog overlay. */
  onClose: () => void

  /** Unique HTML identifier assigned to the dialog title element for screen readers. */
  titleId: string

  /** Indicates whether the dialog layout enforces scrollable container boundaries. */
  scrollable?: boolean
}

/**
 * Props configuration interface for the `DialogHeader` component.
 */
export interface DialogHeaderProps extends LithosElementProps<'div'> {
  /** Optional leading icon element rendered inside the header section. */
  icon?: ReactNode

  /** Hides the default dismiss close button in the top right corner. */
  hideClose?: boolean
}

/**
 * Props configuration interface for the `DialogTitle` component.
 */
export type DialogTitleProps = LithosElementProps<'h2'>

/**
 * Props configuration interface for the `DialogBody` component.
 */
export type DialogBodyProps = LithosElementProps<'div'>

/**
 * Props configuration interface for the `DialogFooter` component.
 */
export type DialogFooterProps = LithosElementProps<'div'>

/**
 * Props configuration interface for the `CustomDialog` composite component.
 */
export interface CustomDialogProps {
  /** Controls visibility state of the composite modal overlay. */
  open: boolean

  /** Callback function triggered when dismissing or cancelling the dialog. */
  onClose: () => void

  /** Callback function triggered upon activating the primary action button. */
  onAction: () => void

  /** Title text heading displayed in the dialog header. */
  title: string

  /** Message body content string or custom React nodes. */
  message: ReactNode

  /** Custom text label for the primary action button. */
  actionLabel?: string

  /** Custom text label for the cancel dismissal button. */
  cancelLabel?: string

  /** Visual variant style for the primary action button. */
  buttonVariant?: ButtonVariant

  /** Custom color string for the primary action button. */
  buttonColor?: string

  /** Custom override hex color string for brutalist offset shadows. */
  offsetColor?: string

  /** Enables inner scroll boundaries and dividing border separators. */
  scrollable?: boolean

  /** Maximum width sizing scale for the panel. */
  size?: DialogSize

  /** Optional leading icon element rendered inside the header. */
  icon?: ReactNode
}
