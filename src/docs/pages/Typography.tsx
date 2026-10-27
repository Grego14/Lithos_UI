import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { typographyPropsData } from '../propsData/typography'
import { getComponentGithubUrl } from '../utils/githubUrl'
import { removeImports } from '../examples/removeImports'
import { ArticleSnippet } from '../examples/typography/article'
import articleSource from '../examples/typography/article.tsx?raw'
import { UsagePreview } from '../examples/typography/variants'
import variantsSource from '../examples/typography/variants.tsx?raw'
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

const githubUrl = getComponentGithubUrl('typography')
const typographyPath = '../../components/ui/Typography'
const typographyCode = (source: string) => ({
  body: removeImports(source),
  componentNames: ['Typography'],
  manualPath: typographyPath,
})

const articleSnippetCode = typographyCode(articleSource)
const usageCode = typographyCode(variantsSource)

export const TypographyDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Typography"
      description="A polymorphic primitive for fluid headings, body text, and inline accents driven by raw structural weight."
    />
    <DocSection className="mb-6">
      <DocLeadText>
        Typography handles text scale, line-height, and semantic elements with built-in support for inline highlights,
        blockquotes, code tags, and solid text shadows.
      </DocLeadText>
      <DocCallout>
        All font sizes use fluid <Code text="clamp()" /> functions linked to <Code text="--lithos-[variant]-size" />{' '}
        tokens, ensuring scale adaptability across device viewports.
      </DocCallout>
    </DocSection>
    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="typography"
        componentNames={['Typography']}
        manualPath={typographyPath}
        requires={['utils/cn.ts', 'utils/yiq.ts', 'core/types.ts']}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="some"
      title="Some"
      description="Combine typographic variants to build structured content layouts with high contrast and explicit visual hierarchy."
    >
      <PreviewBlock code={articleSnippetCode} githubUrl={githubUrl}>
        <ArticleSnippet />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="all"
      title="All"
      description="Overview of all available typography scale variants from display headings down to micro captions, code blocks, and marks."
    >
      <PreviewBlock code={usageCode} githubUrl={githubUrl}>
        <UsagePreview />
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Supports semantic HTML tags automatically mapped by <Code text="variant" /> or explicitly overridden via{' '}
          <Code text="as" />.
        </li>
        <li>Maintains WCAG contrast ratios across high-contrast background utility overlays.</li>
        <li>Ensures scalable text sizing that respects user root font size preferences.</li>
      </DocList>
    </DocSection>
    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout className="mb-6">
        Typography font sizes are globally customizable using <Code text="--lithos-[variant]-size" /> CSS variables in
        your theme stylesheet, or per-instance using Tailwind utility classes via <Code text="className" />.
      </DocCallout>
      <PropsAccordion title="Typography Props" data={typographyPropsData} />
    </DocSection>
  </div>
)
