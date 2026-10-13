export const isShortcutPressed = (event: KeyboardEvent, shortcut: string): boolean => {
  const keys = shortcut
    .toLowerCase()
    .split('+')
    .map((k) => k.trim())
  const targetKey = keys.at(-1)

  const hasCtrlOrCmd = keys.includes('ctrl') || keys.includes('cmd') || keys.includes('meta')
  const hasShift = keys.includes('shift')
  const hasAlt = keys.includes('alt')

  // normalize Ctrl / Cmd detection (Meta key on macOS)
  if (hasCtrlOrCmd && !(event.ctrlKey || event.metaKey)) return false
  if (hasShift && !event.shiftKey) return false
  if (hasAlt && !event.altKey) return false

  return event.key.toLowerCase() === targetKey
}

/** helper to detect if the user is on macOS */
export const isMac = () => {
  if (typeof window === 'undefined') return false
  return /macintosh|mac os x/i.test(navigator.userAgent)
}

const UPPERCASE_KEYS = ['ctrl', 'alt', 'shift']

/** format the shortcut string on an array of platform adapted labels */
export const getShortcutKeys = (shortcut: string) => {
  const mac = isMac()

  return shortcut.split('+').map((k) => {
    const key = k.trim().toLowerCase()

    if (key === 'cmd' || key === 'meta' || key === 'ctrl' || key === 'mod') {
      return mac ? '⌘' : 'Ctrl'
    }

    if (UPPERCASE_KEYS.includes(key)) return key.toUpperCase()
    return key.toUpperCase()
  })
}
