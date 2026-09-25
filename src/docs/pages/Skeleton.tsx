import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { SetupGuide } from '../layout/SetupGuide'
import { skeletonPropsData, skeletonTextPropsData } from '../propsData/skeleton'
import { SkeletonAnimations } from '../examples/skeleton/Animations'
import { SkeletonCardExample } from '../examples/skeleton/Card'
import { SkeletonListExample } from '../examples/skeleton/List'
import { SkeletonAvatarExample } from '../examples/skeleton/Avatar'
import animationSource from '../examples/skeleton/Animations.tsx?raw'
import cardSource from '../examples/skeleton/Card.tsx?raw'
import listSource from '../examples/skeleton/List.tsx?raw'
import avatarSource from '../examples/skeleton/Avatar.tsx?raw'

// Use the rendered example's source for both package and manual installation modes.
const sourceExample = (source: string, componentNames: string[]) => ({
  body: source.replace(/^import .*\r?\n/gm, '').trim(),
  componentNames,
  manualPath: {
    Card: '../../components/ui/Card',
    CardContent: '../../components/ui/Card',
    Skeleton: '../../components/ui/Skeleton',
    SkeletonText: '../../components/ui/Skeleton',
  },
})

const heading = 'mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)'
const subheading = 'mt-8 mb-4 text-xl font-black text-(--lithos-text)'
const paragraph = 'mb-6 font-body text-base leading-relaxed text-(--lithos-text) opacity-80'

export const SkeletonDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <header>
      <h1 className="mb-6 text-4xl md:text-5xl font-black tracking-tight leading-none">Skeleton</h1>
      <p className="max-w-2xl text-lg md:text-xl font-display opacity-70">
        Show the outline of your content while it loads, with crisp borders and theme-aware fills.
      </p>
      <hr className="border-t-2 border-(--lithos-border) my-8" />
    </header>

    <h2 id="installation" className={heading}>
      Installation
    </h2>
    <SetupGuide
      componentNames={['Skeleton', 'SkeletonText']}
      manualPath="../../components/ui/Skeleton"
      requires={['utils/cn.ts']}
    />
    <p className={paragraph}>
      Import <code>lithos-ui/tokens.css</code> after your Tailwind stylesheet for the shared theme tokens. For shimmer,
      add these keyframes to your app's global CSS for either package or manual installation. The docs site defines them
      in <code>src/index.css</code>; they are not included in the package stylesheet. Pulse uses Tailwind's built-in
      animation.
    </p>
    <CodeViewer
      language="css"
      code={`@keyframes lithos-shimmer {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}`}
    />

    <section aria-labelledby="examples" className="mb-12">
      <h2 id="examples" className={heading}>
        Examples
      </h2>
      <h3 id="animations" className={subheading}>
        Animations
      </h3>
      <p className={paragraph}>
        Shimmer is the default: a highlight sweeps across the fill. Choose pulse to animate the entire placeholder,
        including its border and shadow, or disable animation. Reduced motion and forced colors automatically disable
        both animations.
      </p>
      <PreviewBlock code={sourceExample(animationSource, ['Skeleton'])}>
        <SkeletonAnimations />
      </PreviewBlock>
      <p className={paragraph}>
        Small placeholders for individual UI elements. Match their dimensions to the content they replace.
      </p>
      <h3 id="component-card" className={subheading}>
        Card
      </h3>
      <p className={paragraph}>
        Use pulse animation for an image, title, and description inside the existing Card component.
      </p>
      <PreviewBlock code={sourceExample(cardSource, ['Skeleton', 'SkeletonText', 'Card', 'CardContent'])}>
        <SkeletonCardExample />
      </PreviewBlock>
      <h3 id="component-list" className={subheading}>
        List
      </h3>
      <p className={paragraph}>
        Repeat a compact row for a simple list. Text uses the available space without shrinking the leading placeholder.
      </p>
      <PreviewBlock code={sourceExample(listSource, ['Skeleton', 'SkeletonText'])}>
        <SkeletonListExample />
      </PreviewBlock>
      <h3 id="component-avatar" className={subheading}>
        Avatar
      </h3>
      <p className={paragraph}>Use the circular variant at the same diameter as the loaded avatar.</p>
      <PreviewBlock code={sourceExample(avatarSource, ['Skeleton'])}>
        <SkeletonAvatarExample />
      </PreviewBlock>
    </section>

    <h2 id="accessibility" className={heading}>
      Accessibility
    </h2>
    <ul className="list-disc pl-6 font-body leading-relaxed space-y-3 mb-8">
      <li>
        Placeholders are decorative. They use <code>aria-hidden</code> and <code>inert</code> to stay out of
        screen-reader announcements and keyboard navigation.
      </li>
      <li>
        Set <code>aria-busy</code> on the content region. Announce loading and completion once, using a persistent{' '}
        <code>role="status"</code> outside that region.
      </li>
      <li>
        Render real content separately. Skeleton does not accept children; replace the placeholders when data is ready.
      </li>
      <li>
        Match dimensions to your final content to reduce layout shift. Keep already-loaded sections visible during
        partial refreshes.
      </li>
      <li>For long waits, provide explanatory text, cancellation, and error recovery.</li>
    </ul>
    <h2 id="api" className={heading}>
      API Reference
    </h2>
    <p className={paragraph}>
      The <code>variant</code> prop controls text, rectangular, rounded, and circular placeholders. Text height follows
      the inherited font size. <code>SkeletonText</code> adds deterministic lines with a shorter final line. Utility
      classes override base styles; inline <code>style</code> overrides width and height props. Native attributes and
      React 19 refs reach the root element.
    </p>
    <PropsAccordion title="Skeleton Props" data={skeletonPropsData} />
    <PropsAccordion title="SkeletonText Props" data={skeletonTextPropsData} />
  </div>
)
