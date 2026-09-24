export const origin = {
  center: 'origin-center',
  top: 'origin-top',
  bottom: 'origin-bottom',
  left: 'origin-left',
  right: 'origin-right',
  'top-left': 'origin-top-left',
  'top-right': 'origin-top-right',
  'bottom-left': 'origin-bottom-left',
  'bottom-right': 'origin-bottom-right',
} as const

export const zIndex = {
  dropdown: 'z-(--lithos-z-dropdown)',
  sticky: 'z-(--lithos-z-sticky)',
  popover: 'z-(--lithos-z-popover)',
  overlay: 'z-(--lithos-z-overlay)',
  modal: 'z-(--lithos-z-modal)',
  drawer: 'z-(--lithos-z-drawer)',
  tooltip: 'z-(--lithos-z-tooltip)',
} as const
