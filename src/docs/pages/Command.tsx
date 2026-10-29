import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import {
  DocCallout,
  DocExample,
  DocHeader,
  DocHeading,
  DocLeadText,
  DocList,
  DocSection,
  Code,
} from '../layout/DocPage'
import { removeImports } from '../examples/removeImports'
import type { ManualPath } from '../utils/deriveUsageCode'
import {
  commandPropsData,
  commandInputPropsData,
  commandItemPropsData,
  commandGroupPropsData,
  commandDialogPropsData,
} from '../propsData/command'
import { BasicCommandExample } from '../examples/command/basic'
import basicSource from '../examples/command/basic.tsx?raw'
import { ShortcutsCommandExample } from '../examples/command/shortcuts'
import shortcutsSource from '../examples/command/shortcuts.tsx?raw'
import { CommandDialogExample } from '../examples/command/dialog'
import dialogSource from '../examples/command/dialog.tsx?raw'
import { getComponentGithubUrl } from '../utils/githubUrl'

const githubUrl = getComponentGithubUrl('command')
const commandPath = '../../components/ui/Command'
const commandCode = (source: string, componentNames: string[], manualPath: ManualPath = commandPath) => ({
  body: removeImports(source),
  componentNames,
  manualPath,
})
const dialogCode = commandCode(
  dialogSource,
  [
    'Command',
    'CommandDialog',
    'CommandInput',
    'CommandList',
    'CommandEmpty',
    'CommandGroup',
    'CommandItem',
    'CommandShortcut',
    'Button',
    'useState',
    'useEffect',
  ],
  {
    others: commandPath,
    Button: '../../components/ui/Button',
    react: ['useState', 'useEffect'],
  }
)

export const CommandDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Command"
      description="A keyboard-driven command palette for ⌘K menus, global search, and quick actions."
    />
    <DocSection className="mb-6">
      <DocLeadText>
        Built with <strong>zero external dependencies</strong>, the Command palette provides client-side fuzzy
        searching, seamless keyboard navigation (<kbd>↑</kbd>, <kbd>↓</kbd>, <kbd>Enter</kbd>), and standalone or modal
        dialog modes.
      </DocLeadText>
      <DocCallout>
        Try the examples with keyboard only: use the arrow keys to navigate, Enter to select, and Escape to dismiss the
        command dialog.
      </DocCallout>
    </DocSection>
    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="command"
        componentNames={[
          'Command',
          'CommandInput',
          'CommandList',
          'CommandEmpty',
          'CommandLoading',
          'CommandGroup',
          'CommandItem',
          'CommandItemDescription',
          'CommandShortcut',
          'CommandBadge',
          'CommandSeparator',
          'CommandFooter',
          'CommandDialog',
        ]}
        manualPath={commandPath}
        requires={[
          'utils/cn.ts',
          'components/ui/Dialog.tsx',
          'components/ui/Kbd.tsx',
          'components/ui/Badge.tsx',
          'components/ui/icons/IconSearch.tsx',
          'components/ui/icons/IconClose.tsx',
        ]}
      />
    </DocSection>
    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="basic"
      title="Basic"
      description='Inline command menu with search filtering, item groups, and automatic empty states. Try typing "cal" or "sett" in the search box.'
    >
      <PreviewBlock
        code={commandCode(
          basicSource,
          [
            'Command',
            'CommandInput',
            'CommandList',
            'CommandEmpty',
            'CommandGroup',
            'CommandItem',
            'CommandItemDescription',
            'CommandBadge',
            'CommandShortcut',
            'CommandSeparator',
            'CommandFooter',
            'IconFileText',
            'IconFolder',
            'IconSearch',
            'IconSettings',
          ],
          {
            others: commandPath,
            IconFileText: '../../components/ui/icons',
            IconFolder: '../../components/ui/icons',
            IconSearch: '../../components/ui/icons',
            IconSettings: '../../components/ui/icons',
          }
        )}
        githubUrl={githubUrl}
      >
        <div className="mx-auto w-full max-w-md">
          <BasicCommandExample />
        </div>
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="shortcuts"
      title="With Shortcuts and Icons"
      description="Items can be enriched with icons and right-aligned keyboard shortcut badges."
    >
      <PreviewBlock
        code={commandCode(
          shortcutsSource,
          [
            'Command',
            'CommandInput',
            'CommandList',
            'CommandEmpty',
            'CommandGroup',
            'CommandItem',
            'CommandShortcut',
            'CommandBadge',
            'CommandSeparator',
            'IconFileText',
            'IconFolder',
            'IconSearch',
            'IconSettings',
          ],
          {
            others: commandPath,
            IconFileText: '../../components/ui/icons',
            IconFolder: '../../components/ui/icons',
            IconSearch: '../../components/ui/icons',
            IconSettings: '../../components/ui/icons',
          }
        )}
        githubUrl={githubUrl}
      >
        <div className="mx-auto w-full max-w-md">
          <ShortcutsCommandExample />
        </div>
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="dialog"
      title="Command Dialog (⌘K Palette)"
      description="Modal command palette that opens over the application with backdrop blur, focus trapping, and Escape dismissal."
    >
      <PreviewBlock code={dialogCode} githubUrl={githubUrl}>
        <div className="flex flex-col items-center justify-center p-6">
          <CommandDialogExample />
          <p className="mt-3 text-xs opacity-60 font-mono">Press Escape to close the palette.</p>
        </div>
      </PreviewBlock>
    </DocExample>
    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <CodeViewer
        language="tsx"
        code={`<Command>
  <CommandInput />
  <CommandList>
    <CommandLoading />
    <CommandEmpty />
    <CommandGroup>
      <CommandItem>
        <CommandItemDescription />
        <CommandBadge />
        <CommandShortcut />
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
  </CommandList>
  <CommandFooter />
</Command>`}
      />
    </DocSection>
    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Follows WAI-ARIA combobox patterns with <Code text="application" />, <Code text="combobox" />,{' '}
          <Code text="listbox" />, and <Code text="option" /> roles.
        </li>
        <li>
          Active items are indicated via <Code text="aria-selected" /> and <Code text="data-selected" />.
        </li>
        <li>Supports arrow-key navigation, Home/End, and Enter to select.</li>
        <li>Disabled items receive aria-disabled and are skipped during keyboard traversal.</li>
      </DocList>
    </DocSection>
    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <PropsAccordion title="Command Props" data={commandPropsData} />
      <PropsAccordion title="CommandInput Props" data={commandInputPropsData} />
      <PropsAccordion title="CommandItem Props" data={commandItemPropsData} />
      <PropsAccordion title="CommandGroup Props" data={commandGroupPropsData} />
      <PropsAccordion title="CommandDialog Props" data={commandDialogPropsData} />
    </DocSection>
  </div>
)
