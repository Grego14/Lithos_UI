/**
 * @fileoverview Lithos UI DropdownMenuTrigger primitive.
 * - Re-exports `PopoverTrigger` to attach reference listeners and aria attributes.
 * - Acts as the entry point element that toggles or opens the main dropdown menu.
 */
import { PopoverTrigger, type PopoverTriggerProps } from '../popover/PopoverTrigger'

export const DropdownMenuTrigger = (props: PopoverTriggerProps) => <PopoverTrigger {...props} />
