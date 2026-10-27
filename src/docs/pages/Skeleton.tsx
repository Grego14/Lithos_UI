import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { SetupGuide } from '../layout/SetupGuide'
import { skeletonPropsData, skeletonTextPropsData } from '../propsData/skeleton'
import { getComponentGithubUrl } from '../utils/githubUrl'
import { removeImports } from '../examples/removeImports'
import { SkeletonAnimations } from '../examples/skeleton/Animations'
import animationSource from '../examples/skeleton/Animations.tsx?raw'
import { SkeletonCardExample } from '../examples/skeleton/Card'
import cardSource from '../examples/skeleton/Card.tsx?raw'
import { SkeletonListExample } from '../examples/skeleton/List'
import listSource from '../examples/skeleton/List.tsx?raw'
import { SkeletonAvatarExample } from '../examples/skeleton/Avatar'
import avatarSource from '../examples/skeleton/Avatar.tsx?raw'
import { DocExample, DocHeader, DocHeading, DocList, DocSection, Code } from '../layout/DocPage'

const githubUrl = getComponentGithubUrl('skeleton')
const skeletonPath = '../../components/ui/Skeleton'
const skeletonCode = (source: string, componentNames: string[]) => ({
  body: removeImports(source),
  componentNames,
  manualPath: {
    others: skeletonPath,
    Card: '../../components/ui/Card',
    CardContent: '../../components/ui/Card',
  },
})

export const SkeletonDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Skeleton"
      description="Display skeleton placeholders for text, images, and avatars while content loads."
    />
    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="skeleton"
        componentNames={['Skeleton', 'SkeletonText']}
        manualPath={skeletonPath}
        requires={['utils/cn.ts']}
      />
      <p className="mb-6 font-body text-base leading-relaxed text-(--lithos-text) opacity-80">
        Import <Code text="lithos-ui/tokens.css" /> after your Tailwind stylesheet for the shared theme tokens. For
        shimmer, add these keyframes to your app&apos;s global CSS for either package or manual installation. The docs
        site defines them in <Code text="src/index.css" />; they are not included in the package stylesheet. Pulse uses
        Tailwind&apos;s built-in animation.
      </p>
      <CodeViewer
        language="css"
        code={`@keyframes lithos-shimmer {
  from { mask-position: 100% 0; }
  to { mask-position: 0% 0; }
}`}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="animations"
      title="Animations"
      description={
        <>
          Animation is enabled by default. Set <Code text={'animation="pulse"'} /> for pulse or{' '}
          <Code text="animation={false}" /> to disable it. Set <Code text="respectReducedMotion={true}" /> to follow the
          OS/browser reduced-motion preference. Forced colors disable both animations.
        </>
      }
    >
      <PreviewBlock code={skeletonCode(animationSource, ['Skeleton'])} githubUrl={githubUrl}>
        <SkeletonAnimations />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="component-card"
      title="Card"
      description="Use rectangular and text skeletons for a card's image, title, and description."
    >
      <PreviewBlock
        code={skeletonCode(cardSource, ['Skeleton', 'SkeletonText', 'Card', 'CardContent'])}
        githubUrl={githubUrl}
      >
        <SkeletonCardExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="component-list"
      title="List"
      description="Combine image and text skeletons into repeating list rows."
    >
      <PreviewBlock code={skeletonCode(listSource, ['Skeleton', 'SkeletonText'])} githubUrl={githubUrl}>
        <SkeletonListExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="component-avatar"
      title="Avatar"
      description="Use circular skeletons to reserve space for avatars in different sizes."
    >
      <PreviewBlock code={skeletonCode(avatarSource, ['Skeleton'])} githubUrl={githubUrl}>
        <SkeletonAvatarExample />
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Placeholders are decorative. They use <Code text="aria-hidden" /> and <Code text="inert" /> to stay out of
          screen-reader announcements and keyboard navigation.
        </li>
        <li>
          Set <Code text="aria-busy" /> on the content region. Announce loading and completion once, using a persistent{' '}
          <Code text='role="status"' /> outside that region.
        </li>
        <li>
          Render real content separately. Skeleton does not accept children; replace the placeholders when data is
          ready.
        </li>
        <li>
          Match dimensions to your final content to reduce layout shift. Keep already-loaded sections visible during
          partial refreshes.
        </li>
        <li>For long waits, provide explanatory text, cancellation, and error recovery.</li>
      </DocList>
    </DocSection>
    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <p className="mb-6 font-body text-base leading-relaxed text-(--lithos-text) opacity-80">
        Use <Code text="Skeleton" /> for individual placeholders and <Code text="SkeletonText" /> for multiple lines of
        text. See the props below for sizing, shapes, and animation options.
      </p>
      <PropsAccordion title="Skeleton Props" data={skeletonPropsData} />
      <PropsAccordion title="SkeletonText Props" data={skeletonTextPropsData} />
    </DocSection>
  </div>
)
