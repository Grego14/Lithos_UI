import { describe, expect, it } from 'vitest'
import { getCliCommand } from './cliCommand'

describe('Slider installation commands', () => {
  it.each([
    ['npm', 'npx lithos-ui add slider'],
    ['pnpm', 'pnpm dlx lithos-ui add slider'],
    ['yarn', 'yarn dlx lithos-ui add slider'],
    ['bun', 'bunx lithos-ui add slider'],
  ] as const)('generates the %s command', (manager, expected) => {
    expect(getCliCommand(manager, ['Slider'])).toBe(expected)
  })
})
