/**
 * @fileoverview Lithos UI DropdownTrigger primitive.
 * - Re-exports `PopoverTrigger` to attach reference listeners and aria attributes.
 * - Acts as the entry point element that toggles or opens the main dropdown.
 */
import { PopoverTrigger, type PopoverTriggerProps } from '../popover/PopoverTrigger'

export const DropdownTrigger = (props: PopoverTriggerProps) => <PopoverTrigger {...props} />
