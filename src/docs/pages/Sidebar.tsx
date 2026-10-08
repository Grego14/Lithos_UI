import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { SetupGuide } from '../layout/SetupGuide'
import { PropsAccordion } from '../../components/ui/PropsTable'

import { removeImports } from '../examples/removeImports'
import { ExamplePermanent } from '../examples/sidebar/permanent'
import { ExampleMini } from '../examples/sidebar/mini'

import examplePermanentSource from '../examples/sidebar/permanent.tsx?raw'
import exampleMiniSource from '../examples/sidebar/mini.tsx?raw'

import {
  useSidebarReturnPropsData,
  sidebarItemPropsData,
  sidebarTriggerPropsData,
  sidebarContentPropsData,
  sidebarPropsData,
} from '../propsData/sidebar'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/sidebar/Sidebar.tsx'
const sidebarPath = '../../components/ui/Sidebar'

const manualPath = {
  react: ['useState'],
  IconHome: '../../components/ui/icons/IconHome',
  IconFolder: '../../components/ui/icons/IconFolder',
  IconSettings: '../../components/ui/icons/IconSettings',
  others: sidebarPath,
}

const usagePermanent = {
  body: removeImports(examplePermanentSource),
  componentNames: ['Sidebar', 'SidebarContent', 'SidebarItem', 'useState', 'IconFolder', 'IconHome', 'IconSettings'],
  manualPath,
}

const usageMini = {
  body: removeImports(exampleMiniSource),
  componentNames: [
    'Sidebar',
    'SidebarContent',
    'SidebarTrigger',
    'SidebarItem',
    'useState',
    'IconFolder',
    'IconHome',
    'IconSettings',
  ],
  manualPath,
}

export const SidebarDoc = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-6">
          Sidebar
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A flexible navigation panel supporting permanent and collapsible mini modes with neo-brutalist styling.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-6 mb-6" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Sidebar component structures application layouts by grouping navigation links and controls. It supports a
          static permanent layout as well as a collapsible mini mode for space-constrained interfaces.
        </p>
      </section>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Sidebar']}
        manualPath={manualPath}
        requires={[
          'utils/cn.ts',
          'components/ui/Button',
          'components/ui/icons/IconChevronLeft',
          'components/ui/icons/IconSidebar',
        ]}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="permanent" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Permanent
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        The default mode. The sidebar remains strictly visible at its full expanded width. Recommended for large desktop
        screens where navigation space is plentiful.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={usagePermanent} githubUrl={githubUrl} className="overflow-x-auto">
          <ExamplePermanent />
        </PreviewBlock>
      </div>

      <h3 id="mini" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Mini
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Allows toggling between an expanded state and a compact icon-only view using the <code>SidebarTrigger</code>{' '}
        component.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={usageMini} githubUrl={githubUrl}>
          <ExampleMini />
        </PreviewBlock>
      </div>

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Sidebar is a compound component. Combine its structural primitives to compose custom headers, navigation
          items, and collapse triggers.
        </p>
        <CodeViewer
          language="tsx"
          code={`<Sidebar>
  <SidebarContent>
    <SidebarTrigger />

    <SidebarItem></SidebarItem>
  </SidebarContent>
</Sidebar>`}
        />
      </div>

      <section className="mt-12 mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Supports semantic HTML landmark roles (<code>aside</code>, <code>nav</code>, <code>section</code>) via the{' '}
            <code>role</code> prop.
          </li>
          <li>
            <code>SidebarItem</code> leverages the native <code>Button</code> component to maintain keyboard focus
            indicators and click handling.
          </li>
          <li>
            Labels are dynamically exposed via <code>title</code> attributes when the sidebar is collapsed in mini mode.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>

        <div className="mb-6 p-4 border-l-4 border-(--lithos-accent) bg-(--lithos-surface) text-sm font-body text-(--lithos-text)">
          <strong>Note:</strong> Border styles and theme colors are powered globally via <code>--lithos-border</code>{' '}
          and <code>--lithos-surface</code> CSS variables. Override container layouts via <code>className</code>.
        </div>

        <PropsAccordion title="Sidebar Props" data={sidebarPropsData} />
        <PropsAccordion title="SidebarContent Props" data={sidebarContentPropsData} />
        <PropsAccordion title="SidebarTrigger Props" data={sidebarTriggerPropsData} />
        <PropsAccordion title="SidebarItem Props" data={sidebarItemPropsData} />
        <PropsAccordion title="useSidebar return" data={useSidebarReturnPropsData} isHook />
      </section>
    </div>
  )
}
