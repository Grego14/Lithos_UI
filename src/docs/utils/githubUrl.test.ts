import { describe, it, expect } from 'vitest'
import { getComponentGithubUrl } from './githubUrl'

describe('getComponentGithubUrl', () => {
  it('resolves correct GitHub URLs for components with specific directories', () => {
    expect(getComponentGithubUrl('breadcrumb')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/breadcrumb/Breadcrumb.tsx'
    )
    expect(getComponentGithubUrl('calendar')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/calendar/Calendar.tsx'
    )
    expect(getComponentGithubUrl('carousel')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/carousel/Carousel.tsx'
    )
    expect(getComponentGithubUrl('checkbox')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/checkbox/Checkbox.tsx'
    )
    expect(getComponentGithubUrl('command')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/command/Command.tsx'
    )
    expect(getComponentGithubUrl('dialog')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/dialog/Dialog.tsx'
    )
    expect(getComponentGithubUrl('drawer')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/drawer/Drawer.tsx'
    )
    expect(getComponentGithubUrl('dropdown')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/dropdown/Dropdown.tsx'
    )
    expect(getComponentGithubUrl('popover')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/popover/Popover.tsx'
    )
    expect(getComponentGithubUrl('select')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/select/Select.tsx'
    )
    expect(getComponentGithubUrl('toast')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/toast/ToastProvider.tsx'
    )
    expect(getComponentGithubUrl('sidebar')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/sidebar/Sidebar.tsx'
    )
    expect(getComponentGithubUrl('tooltip')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/tooltip/Tooltip.tsx'
    )
    expect(getComponentGithubUrl('icons')).toBe(
      'https://github.com/lithosui/Lithos_UI/tree/main/src/components/ui/icons'
    )
  })

  it('resolves correct GitHub URLs for single-file and docs-only components', () => {
    expect(getComponentGithubUrl('button')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Button.tsx'
    )
    expect(getComponentGithubUrl('accordion')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Accordion.tsx'
    )
    expect(getComponentGithubUrl('code-viewer')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/CodeViewer.tsx'
    )
    expect(getComponentGithubUrl('preview-block')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/PreviewBlock.tsx'
    )
  })

  it('handles case-insensitivity gracefully', () => {
    expect(getComponentGithubUrl('CheckBox')).toBe(
      'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/checkbox/Checkbox.tsx'
    )
  })
})
