import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { SetupGuide } from '../layout/SetupGuide'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Button } from '../../components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
} from '../../components/ui/DropdownMenu'

import {
  dropdownMenuPropsData,
  dropdownMenuTriggerPropsData,
  dropdownMenuContentPropsData,
  dropdownMenuItemPropsData,
  dropdownMenuSubPropsData,
  dropdownMenuGroupPropsData,
  dropdownMenuSeparatorPropsData,
  useDropdownPropsData,
} from '../propsData/dropdown'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/DropdownMenu.tsx'

const ProfileDropdownDemo = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <DropdownMenu placement="bottom-start">
        <DropdownMenuTrigger asChild>
          <Button variant="accent">My account</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup label="Settings">
            <DropdownMenuItem onClick={() => console.log('Go to profile')}>Profile</DropdownMenuItem>

            <DropdownMenuItem onClick={() => console.log('Go to plan')}>Plan</DropdownMenuItem>

            <DropdownMenuItem disabled className="flex flex-col items-start space-y-2">
              <span>Integrations</span>
              <span className="opacity-60">(Coming soon)</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuSub
            trigger={
              <span className="flex items-center justify-between w-full">
                Preferences <span>▶</span>
              </span>
            }
          >
            <DropdownMenuItem>Toggle Theme</DropdownMenuItem>
            <DropdownMenuItem>Language</DropdownMenuItem>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => console.log('Log out')}
              className="text-red-500 hover:bg-red-500/5 focus:bg-red-500/5"
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const DropdownMenuDoc = () => {
  const usageCode = {
    body: `export const ProfileDropdown = () => {
  return (
    <DropdownMenu placement='bottom-start'>
      <DropdownMenuTrigger asChild>
        <Button variant='accent'>My account</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56 p-1'>
        <DropdownMenuGroup label='Settings'>
          <DropdownMenuItem onClick={() => console.log('Profile')}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('Plan')}>
            Plan
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuSub trigger={<span className='flex items-center justify-between w-full'>Preferences <span>▶</span></span>}>
          <DropdownMenuItem>Toggle Theme</DropdownMenuItem>
          <DropdownMenuItem>Language</DropdownMenuItem>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => console.log('Log out')} className='text-red-500 hover:bg-red-500/5 focus:bg-red-500/5'>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
    componentNames: [
      'DropdownMenu',
      'DropdownMenuTrigger',
      'DropdownMenuContent',
      'DropdownMenuGroup',
      'DropdownMenuItem',
      'DropdownMenuSeparator',
      'DropdownMenuSub',
      'DropdownMenuClose',
      'Button',
    ],
    manualPath: {
      Button: '../../components/ui/Button',
      others: '../../components/ui/DropdownMenu',
    },
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          DropdownMenu
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          Displays a menu to the user-such as a set of actions or functions-triggered by a button.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The DropdownMenu component allows you to present a list of contextual actions, groups, and submenus without
          altering the state or label of the trigger element. Built on top of Floating UI, it provides robust
          positioning, focus management, and accessibility features.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Click the trigger button below to open the menu and test navigation, subgroups, and submenus.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={[
          'DropdownMenu',
          'DropdownMenuContent',
          'DropdownMenuItem',
          'DropdownMenuGroup',
          'DropdownMenuSeparator',
          'DropdownMenuTrigger',
          'DropdownMenuClose',
          'useDropdown',
          'Button',
        ]}
        manualPath={{
          Button: '../../components/ui/Button',
          others: '../../components/ui/DropdownMenu',
        }}
        requires={[
          'utils/cn.ts',
          'components/ui/Button.tsx',
          'components/ui/dropdown/DropdownMenu',
          'components/ui/dropdown/DropdownMenuContent',
          'components/ui/dropdown/DropdownMenuItem',
          'components/ui/dropdown/DropdownMenuGroup',
          'components/ui/dropdown/DropdownMenuSeparator',
          'components/ui/dropdown/DropdownMenuTrigger',
          'components/ui/dropdown/DropdownMenuClose',
          'components/ui/dropdown/useDropdown',
        ]}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Action Menu
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use a DropdownMenu when you need to group related actions (like account settings, navigation options, or
        administrative triggers) into a compact popover overlay. Items automatically close the dropdown upon selection
        unless explicitly configured otherwise.
      </p>

      <PreviewBlock code={usageCode} githubUrl={githubUrl}>
        <ProfileDropdownDemo />
      </PreviewBlock>

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Assemble the menu by composing subcomponents inside the root <code>DropdownMenu</code> provider:
        </p>
        <CodeViewer
          language="tsx"
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>...</Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent>

    <DropdownMenuGroup label="...">
      <DropdownMenuItem>...</DropdownMenuItem>
      <DropdownMenuItem>...</DropdownMenuItem>
    </DropdownMenuGroup>

    <DropdownMenuSeparator />

    <DropdownMenuSub trigger={<span>...</span>}>
      <DropdownMenuItem>...</DropdownMenuItem>
    </DropdownMenuSub>

  </DropdownMenuContent>
</DropdownMenu>`}
        />
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text) space-y-2">
          <li>
            Uses <code>role="menu"</code> on the floating content container and <code>role="menuitem"</code> on
            interactive options.
          </li>
          <li>
            Manages <code>aria-haspopup="menu"</code> and <code>aria-expanded</code> attributes dynamically on the
            trigger element.
          </li>
          <li>
            Supports keyboard dismissal via the <kbd>Escape</kbd> key and closes automatically when clicking outside or
            interacting with non-disabled items.
          </li>
          <li>
            Submenus expose <code>aria-haspopup="menu"</code> on their trigger items and support safe hover interactions
            through polygon pointer detection.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <div className="mb-6 p-4 border-l-4 border-(--lithos-accent) bg-(--lithos-surface) text-sm font-body text-(--lithos-text)">
          <strong>Note:</strong> Border radius is configurable globally via the <code>--lithos-radius</code> CSS token,
          or per-instance via <code>className</code> (e.g. <code>rounded-full</code>). No custom prop is required.
        </div>
        <PropsAccordion title="DropdownMenu Props" data={dropdownMenuPropsData} />
        <PropsAccordion title="DropdownMenuTrigger Props" data={dropdownMenuTriggerPropsData} />
        <PropsAccordion title="DropdownMenuContent Props" data={dropdownMenuContentPropsData} />
        <PropsAccordion title="DropdownMenuItem Props" data={dropdownMenuItemPropsData} />
        <PropsAccordion title="DropdownMenuSub Props" data={dropdownMenuSubPropsData} />
        <PropsAccordion title="DropdownMenuGroup Props" data={dropdownMenuGroupPropsData} />
        <PropsAccordion title="DropdownMenuSeparator Props" data={dropdownMenuSeparatorPropsData} />
        <PropsAccordion title="useDropdown Return" data={useDropdownPropsData} isHook />
      </section>
    </div>
  )
}
