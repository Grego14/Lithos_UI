import { describe, it, expect } from 'vitest'
import { deriveImportLines, deriveUsageCode } from './deriveUsageCode'

describe('deriveImportLines', () => {
  it('should map all components to lithos-ui in command mode', () => {
    const result = deriveImportLines({
      componentNames: ['Select', 'useSelect', 'SelectOption'],
      types: ['SelectOption'],
      manualPath: '../../components/ui/Select',
      mode: 'command',
    })

    expect(result).toBe("import { Select, useSelect, type SelectOption } from 'lithos-ui'")
  })

  it('should group imports under single path when manualPath is a string', () => {
    const result = deriveImportLines({
      componentNames: ['Select', 'useSelect', 'SelectOption'],
      types: ['SelectOption'],
      manualPath: '../../components/ui/Select',
      mode: 'manual',
    })

    expect(result).toBe("import { Select, useSelect, type SelectOption } from '../../components/ui/Select'")
  })

  it('should prioritize explicit array mappings in manualPath over fallback', () => {
    const result = deriveImportLines({
      componentNames: ['Select', 'useState', 'SelectOption'],
      types: ['SelectOption'],
      manualPath: {
        react: ['useState'],
        others: '../../components/ui/Select',
      },
      mode: 'manual',
    })

    // useState us next to 'Select' so it appears on the next line
    expect(result).toBe(
      "import { Select, type SelectOption } from '../../components/ui/Select'\n" + "import { useState } from 'react'"
    )
  })

  it('should handle custom per-item path mappings in manual mode', () => {
    const result = deriveImportLines({
      componentNames: ['Select', 'SelectOption', 'Button'],
      types: ['SelectOption'],
      manualPath: {
        Select: '../../components/ui/Select',
        SelectOption: '../../components/ui/Select',
        Button: '../../components/ui/Button',
      },
      mode: 'manual',
    })

    expect(result).toBe(
      "import { Select, type SelectOption } from '../../components/ui/Select'\n" +
        "import { Button } from '../../components/ui/Button'"
    )
  })
})

describe('deriveUsageCode', () => {
  it('should append body after generated import lines', () => {
    const result = deriveUsageCode(
      {
        body: 'export const Demo = () => <Select />',
        componentNames: ['Select'],
        manualPath: '../../components/ui/Select',
      },
      'manual'
    )

    expect(result).toBe(
      "import { Select } from '../../components/ui/Select'\n\n" + 'export const Demo = () => <Select />'
    )
  })
})
