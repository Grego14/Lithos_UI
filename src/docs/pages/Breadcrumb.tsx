import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { breadcrumbPropsData, breadcrumbItemDataPropsData } from '../propsData/breadcrumb'
import { removeImports } from '../examples/removeImports'
import { DocCallout, DocExample, DocHeader, DocHeading, DocLeadText, DocList, DocSection } from '../layout/DocPage'
import { CollapsibleBreadcrumbExample } from '../examples/breadcrumb/collapsible'
import collapsibleSource from '../examples/breadcrumb/collapsible.tsx?raw'
import { IconBreadcrumbExample } from '../examples/breadcrumb/icons'
import iconsSource from '../examples/breadcrumb/icons.tsx?raw'
import { CustomSeparatorBreadcrumbExample } from '../examples/breadcrumb/customSeparator'
import customSeparatorSource from '../examples/breadcrumb/customSeparator.tsx?raw'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Breadcrumb.tsx'
const manualPath = '../../components/ui/Breadcrumb'
const breadcrumbCode = (source: string, componentNames: string[]) => ({
  body: removeImports(source),
  componentNames,
  manualPath,
})

export const BreadcrumbDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Breadcrumb"
      description="Navigate with clean, accessible breadcrumbs featuring collapsible paths and icon-supported items."
    />

    <DocSection>
      <DocLeadText>
        Breadcrumbs show users where they are and help them navigate back to previous pages without getting lost. Lithos
        UI offers two simple styles: <strong>Collapsible</strong> to keep long paths tidy, and <strong>Icon</strong> for
        a visual touch.
      </DocLeadText>
      <DocCallout>
        Screen readers automatically recognize the breadcrumb landmark (<code>&lt;nav aria-label="Breadcrumb"&gt;</code>
        ) and identify the active page (<code>aria-current="page"</code>) for easy keyboard navigation.
      </DocCallout>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="breadcrumb"
        componentNames={['Breadcrumb']}
        manualPath="../../components/ui/Breadcrumb"
        requires={[
          'utils/cn.ts',
          'components/ui/icons/IconHome.tsx',
          'components/ui/icons/IconBreadcrumbSeparator.tsx',
          'components/ui/icons/IconFolder.tsx',
          'components/ui/icons/IconSettings.tsx',
          'components/ui/icons/IconFileText.tsx',
        ]}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="collapsible"
      title="Collapsible"
      description={
        <>
          Use this when navigation paths become too long to fit cleanly on screen. It renders a standard breadcrumb but
          replaces intermediate items with an ellipsis button to save space. Clicking the ellipsis expands the hidden
          items inline. Restrict the maximum visible items using the <code>maxItems</code> prop. The ellipsis button is
          fully accessible, featuring a descriptive <code>aria-label</code> that alerts screen readers to its expanding
          function.
        </>
      }
    >
      <PreviewBlock code={breadcrumbCode(collapsibleSource, ['Breadcrumb'])} githubUrl={githubUrl}>
        <div className="flex flex-col items-center justify-center p-4">
          <CollapsibleBreadcrumbExample />
        </div>
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="icon"
      title="Icon"
      description={
        <>
          Use this to pair descriptive icons alongside segment names, enhancing visual clarity and hierarchical
          scanning. It renders an icon preceding the text for each breadcrumb segment. Hover and focus states remain
          identical to the default text links. Keep segment text brief to accommodate the added icon width. Icons are
          treated as decorative and do not alter the navigation's semantic accessibility.
        </>
      }
    >
      <PreviewBlock
        code={breadcrumbCode(iconsSource, ['Breadcrumb', 'IconFolder', 'IconSettings', 'IconFileText'])}
        githubUrl={githubUrl}
      >
        <div className="flex flex-col items-center justify-center p-4">
          <IconBreadcrumbExample />
        </div>
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="custom-separator"
      title="Custom Separator"
      description={
        <>
          Use the <code>separator</code> prop to replace the default SVG chevron with any custom <code>ReactNode</code>.
          Whether it's a simple text slash or a different SVG icon, the breadcrumb will automatically manage spacing and
          accessibility for your custom separator.
        </>
      }
    >
      <PreviewBlock code={breadcrumbCode(customSeparatorSource, ['Breadcrumb'])} githubUrl={githubUrl}>
        <div className="flex flex-col items-center justify-center p-4">
          <CustomSeparatorBreadcrumbExample />
        </div>
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <CodeViewer
        language="tsx"
        code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage />
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
      />
    </DocSection>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Breadcrumbs are wrapped in a <code>&lt;nav aria-label="Breadcrumb"&gt;</code> element to define a navigation
          landmark.
        </li>
        <li>
          The currently active page is indicated to assistive technologies using <code>aria-current="page"</code>.
        </li>
        <li>
          Separators between items are hidden from screen readers using <code>aria-hidden="true"</code>.
        </li>
        <li>
          The collapsible ellipsis button provides a descriptive <code>aria-label</code> that updates dynamically when
          expanded.
        </li>
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <PropsAccordion title="Breadcrumb Props" data={breadcrumbPropsData} />
      <PropsAccordion title="BreadcrumbItemData" data={breadcrumbItemDataPropsData} />
    </DocSection>
  </div>
)
