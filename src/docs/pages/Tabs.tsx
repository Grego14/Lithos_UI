import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { tabsPropsData, tabsListPropsData, tabsTriggerPropsData, tabsContentPropsData } from '../propsData/tabs'
import { SetupGuide } from '../layout/SetupGuide'
import { DocExample, DocHeader, DocHeading, DocLeadText, DocList, DocSection, Code } from '../layout/DocPage'
import { removeImports } from '../examples/removeImports'
import { getComponentGithubUrl } from '../utils/githubUrl'
import { DefaultTabs } from '../examples/tabs/default'
import defaultSource from '../examples/tabs/default.tsx?raw'
import { UnderlineTabs } from '../examples/tabs/underline'
import underlineSource from '../examples/tabs/underline.tsx?raw'
import { VerticalTabs } from '../examples/tabs/vertical'
import verticalSource from '../examples/tabs/vertical.tsx?raw'

const githubUrl = getComponentGithubUrl('tabs')
const tabsPath = '../../components/ui/Tabs'
const tabsCode = (source: string) => ({
  body: removeImports(source),
  componentNames: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
  manualPath: { others: tabsPath },
})

export const TabsDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Tabs"
      description="A set of layered sections of content—known as tab panels—that are displayed one at a time."
    />
    <DocSection>
      <DocLeadText>
        The Tabs component is perfect for settings pages, dashboards, or any interface where you want to toggle between
        different views without navigating to a new page. It features a Neo-brutalist design aesthetic.
      </DocLeadText>
    </DocSection>
    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="tabs"
        componentNames={['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent']}
        manualPath={tabsPath}
        requires={['utils/cn.ts']}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="default"
      title="Default"
      description={
        <>
          The default tab structure with a provided <Code text="defaultValue" />.
        </>
      }
    >
      <PreviewBlock code={tabsCode(defaultSource)} githubUrl={githubUrl}>
        <div className="mx-auto flex w-full max-w-md flex-col">
          <DefaultTabs />
        </div>
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="underline"
      title="Underline"
      description="A cleaner variant with a thick bottom border, ideal for subtle page navigation while retaining the brutalist aesthetic."
    >
      <PreviewBlock code={tabsCode(underlineSource)} githubUrl={githubUrl}>
        <div className="mx-auto flex w-full max-w-md flex-col">
          <UnderlineTabs />
        </div>
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="vertical"
      title="Vertical"
      description="A vertical variant where the tabs are stacked to the side of the content."
    >
      <PreviewBlock code={tabsCode(verticalSource)} githubUrl={githubUrl}>
        <div className="mx-auto flex w-full max-w-2xl">
          <VerticalTabs />
        </div>
      </PreviewBlock>
    </DocExample>
    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <CodeViewer
        language="tsx"
        code={`<Tabs>
  <TabsList>
    <TabsTrigger />
  </TabsList>
  <TabsContent />
</Tabs>
`}
      />
    </DocSection>
    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Uses standard WAI-ARIA roles (<Code text="tablist" />, <Code text="tab" />, and <Code text="tabpanel" />
          ).
        </li>
        <li>
          <Code text="TabsTrigger" /> uses native <Code text="<button>" /> elements and automatically manages the{' '}
          <Code text="aria-selected" /> state.
        </li>
        <li>Keyboard navigation is inherently supported through native button focus management.</li>
      </DocList>
    </DocSection>
    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <PropsAccordion title="Tabs Props" data={tabsPropsData} />
      <PropsAccordion title="TabsList Props" data={tabsListPropsData} />
      <PropsAccordion title="TabsTrigger Props" data={tabsTriggerPropsData} />
      <PropsAccordion title="TabsContent Props" data={tabsContentPropsData} />
    </DocSection>
  </div>
)
