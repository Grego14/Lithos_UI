/**
 * @fileoverview Lithos UI tooltip trigger element.
 * - Re-exports PopoverTrigger to attach hover, focus, and ARIA attributes seamlessly.
 * - Acts as the anchor element for the floating tooltip overlay.
 */
import { PopoverTrigger, type PopoverTriggerProps } from '../popover/PopoverTrigger'

export const TooltipTrigger = (props: PopoverTriggerProps) => <PopoverTrigger {...props} />
