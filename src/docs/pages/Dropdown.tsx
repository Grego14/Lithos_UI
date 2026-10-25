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
import {
  dropdownPropsData,
  dropdownTriggerPropsData,
  dropdownContentPropsData,
  dropdownItemPropsData,
  dropdownSubPropsData,
  dropdownGroupPropsData,
  dropdownSeparatorPropsData,
  useDropdownPropsData,
} from '../propsData/dropdown'
import { ProfileDropdownExample } from '../examples/dropdown/profile'
import profileSource from '../examples/dropdown/profile.tsx?raw'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Dropdown.tsx'
const dropdownPath = '../../components/ui/Dropdown'
const profileCode = {
  body: removeImports(profileSource),
  componentNames: [
    'Dropdown',
    'DropdownTrigger',
    'DropdownContent',
    'DropdownGroup',
    'DropdownItem',
    'DropdownSeparator',
    'DropdownSub',
    'Button',
  ],
  manualPath: {
    others: dropdownPath,
    Button: '../../components/ui/Button',
  },
}

export const DropdownDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Dropdown"
      description="Displays a menu to the user—such as a set of actions or functions—triggered by a button."
    />
    <DocSection className="mb-6">
      <DocLeadText>
        Dropdown presents contextual actions, groups, and submenus without altering the trigger element&apos;s state or
        label. Built on Floating UI, it provides positioning, focus management, and accessibility features.
      </DocLeadText>
      <DocCallout>Click the trigger below to open the menu and test navigation, groups, and submenus.</DocCallout>
    </DocSection>
    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="dropdown"
        componentNames={[
          'Dropdown',
          'DropdownContent',
          'DropdownItem',
          'DropdownGroup',
          'DropdownSeparator',
          'DropdownTrigger',
          'DropdownSub',
          'useDropdown',
        ]}
        manualPath={{ others: dropdownPath }}
        requires={[
          'utils/cn.ts',
          'components/ui/Button.tsx',
          'components/ui/dropdown/Dropdown.tsx',
          'components/ui/dropdown/DropdownContent.tsx',
          'components/ui/dropdown/DropdownItem.tsx',
          'components/ui/dropdown/DropdownGroup.tsx',
          'components/ui/dropdown/DropdownSeparator.tsx',
          'components/ui/dropdown/DropdownTrigger.tsx',
          'components/ui/dropdown/DropdownSub.tsx',
          'components/ui/dropdown/useDropdown.ts',
          'components/ui/dropdown/DropdownNavigationContext.ts',
        ]}
      />
    </DocSection>
    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="default"
      title="Default"
      description="Group related actions, account settings, and submenus into a compact popover. Items close the menu upon selection by default."
    >
      <PreviewBlock code={profileCode} githubUrl={githubUrl}>
        <div className="flex min-h-56 items-center justify-center p-12">
          <ProfileDropdownExample />
        </div>
      </PreviewBlock>
    </DocExample>
    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
        Compose menu items and submenus inside the root Dropdown provider:
      </p>
      <CodeViewer
        language="tsx"
        code={`<Dropdown>
  <DropdownTrigger></DropdownTrigger>

  <DropdownContent>

    <DropdownGroup>
      <DropdownItem></DropdownItem>
      <DropdownItem></DropdownItem>
    </DropdownGroup>

    <DropdownSeparator />

    <DropdownSub>
      <DropdownItem></DropdownItem>
    </DropdownSub>

  </DropdownContent>
</Dropdown>`}
      />
    </DocSection>
    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Uses <Code text='role="menu"' /> on the floating container and <Code text='role="menuitem"' /> on interactive
          options.
        </li>
        <li>The trigger exposes aria-haspopup and aria-expanded dynamically.</li>
        <li>Escape, outside clicks, and item selection dismiss the menu.</li>
        <li>Submenus support keyboard navigation and safe hover interactions.</li>
      </DocList>
    </DocSection>
    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout className="mb-6">
        Border radius is configurable through the <Code text="--lithos-radius" /> CSS token or per-instance via{' '}
        <Code text="className" />.
      </DocCallout>
      <PropsAccordion title="Dropdown Props" data={dropdownPropsData} />
      <PropsAccordion title="DropdownTrigger Props" data={dropdownTriggerPropsData} />
      <PropsAccordion title="DropdownContent Props" data={dropdownContentPropsData} />
      <PropsAccordion title="DropdownItem Props" data={dropdownItemPropsData} />
      <PropsAccordion title="DropdownSub Props" data={dropdownSubPropsData} />
      <PropsAccordion title="DropdownGroup Props" data={dropdownGroupPropsData} />
      <PropsAccordion title="DropdownSeparator Props" data={dropdownSeparatorPropsData} />
      <PropsAccordion title="useDropdown Return" data={useDropdownPropsData} isHook />
    </DocSection>
  </div>
)
