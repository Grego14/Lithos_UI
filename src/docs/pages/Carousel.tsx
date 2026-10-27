import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import {
  carouselPropsData,
  carouselSlidePropsData,
  carouselPrevPropsData,
  carouselNextPropsData,
  carouselTrackPropsData,
  carouselPaginationPropsData,
  carouselControlsPropsData,
  useCarouselPropsData,
} from '../propsData/carousel'
import { removeImports } from '../examples/removeImports'
import { DocCallout, DocExample, DocHeader, DocHeading, DocLeadText, DocList, DocSection } from '../layout/DocPage'
import { DefaultCarouselExample } from '../examples/carousel/default'
import defaultSource from '../examples/carousel/default.tsx?raw'
import { LoopingCarouselExample } from '../examples/carousel/looping'
import loopingSource from '../examples/carousel/looping.tsx?raw'
import { BottomControlsCarouselExample } from '../examples/carousel/bottomControls'
import bottomControlsSource from '../examples/carousel/bottomControls.tsx?raw'
import { NumbersSelectorCarouselExample } from '../examples/carousel/numbersSelector'
import numbersSelectorSource from '../examples/carousel/numbersSelector.tsx?raw'
import { NoCounterCarouselExample } from '../examples/carousel/noCounter'
import noCounterSource from '../examples/carousel/noCounter.tsx?raw'
import { NoControlsCarouselExample } from '../examples/carousel/noControls'
import noControlsSource from '../examples/carousel/noControls.tsx?raw'
import { PlayInfiniteCarouselExample } from '../examples/carousel/playInfinite'
import playInfiniteSource from '../examples/carousel/playInfinite.tsx?raw'
import { VerticalCarouselExample } from '../examples/carousel/vertical'
import verticalSource from '../examples/carousel/vertical.tsx?raw'
import { CustomLayoutCarouselExample } from '../examples/carousel/customLayout'
import customLayoutSource from '../examples/carousel/customLayout.tsx?raw'
import { getComponentGithubUrl } from '../utils/githubUrl'
import { colors } from '../../utils/colors'

const githubUrl = getComponentGithubUrl('carousel')
const manualPath = '../../components/ui/Carousel'
const carouselCode = (source: string, componentNames = ['Carousel', 'CarouselSlide']) => ({
  body: removeImports(source),
  componentNames,
  manualPath,
})

export const CarouselDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Carousel"
      description="An accessible horizontal/vertical slide viewer supporting auto-play, custom controls, and live region announcements."
    />

    <DocSection>
      <DocLeadText>
        The Carousel primitive organizes content into paginated horizontal/vertical steps. Includes built-in support for
        keyboard navigation (ArrowLeft / ArrowRight) and automated screen reader live region notifications.
      </DocLeadText>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="carousel"
        componentNames={['Carousel']}
        manualPath={manualPath}
        requires={[
          'utils/cn.ts',
          'utils/scrollTo.ts',
          'components/ui/Button.tsx',
          'components/ui/carousel/Carousel.tsx',
          'components/ui/carousel/CarouselButton.tsx',
          'components/ui/carousel/CarouselControls.tsx',
          'components/ui/carousel/CarouselSlide.tsx',
          'components/ui/carousel/CarouselPagination.tsx',
          'components/ui/carousel/CarouselTrack.tsx',
          'components/ui/carousel/useCarousel.ts',
          'components/ui/carousel/useCarouselDrag.ts',
          'components/ui/carousel/carousel.types.ts',
          'components/ui/icons/IconArrowLeft.tsx',
          'components/ui/icons/IconArrowRight.tsx',
          'components/ui/icons/IconArrowDown.tsx',
          'components/ui/icons/IconArrowUp.tsx',
          'components/ui/icons/IconCircle.tsx',
        ]}
      />
    </DocSection>

    <DocSection>
      <DocHeading id="examples">Examples</DocHeading>
      <DocExample
        id="default"
        title="Default"
        description={
          <>
            Use this as the standard presentation for a series of slides. It renders horizontal pagination dots at the
            top alongside navigation arrows. Focus shifts correctly between slides, and keyboard arrows allow panning.
            Content within slides can be arbitrary. Fully accessible via live regions that announce the active slide to
            screen readers.
          </>
        }
      >
        <PreviewBlock code={carouselCode(defaultSource)} githubUrl={githubUrl}>
          <DefaultCarouselExample />
        </PreviewBlock>
      </DocExample>

      <DocExample
        id="looping"
        title="Looping"
        description="Use this to allow continuous navigation, ensuring users can seamlessly cycle past the first or last slides without hitting a hard stop. It renders identically to the default but visually wraps the slides in an infinite scrolling track. Does not affect child content limits. Arrow key navigation loops automatically."
      >
        <PreviewBlock code={carouselCode(loopingSource)} githubUrl={githubUrl}>
          <LoopingCarouselExample />
        </PreviewBlock>
      </DocExample>

      <DocExample
        id="bottom-controls"
        title="Bottom controls"
        description="Use this when the carousel sits high on a page or when imagery needs to take precedence over navigation UI. It moves the navigation arrows and pagination dots to the bottom edge. Layout physics remain identical otherwise. Navigation shortcuts and semantic roles are preserved."
      >
        <PreviewBlock code={carouselCode(bottomControlsSource)} githubUrl={githubUrl}>
          <BottomControlsCarouselExample />
        </PreviewBlock>
      </DocExample>

      <DocExample
        id="numbers-selector"
        title="Numbers Selector"
        description="Use this when the absolute position within the slide deck is more important than visual dots, such as multi-step forms or tutorials. It replaces the pagination dots with explicit numeric buttons. Visual height is slightly expanded to accommodate the numbers. Keyboard interactions on the numeric selectors allow direct jumps."
      >
        <PreviewBlock code={carouselCode(numbersSelectorSource)} githubUrl={githubUrl}>
          <NumbersSelectorCarouselExample />
        </PreviewBlock>
      </DocExample>

      <DocExample
        id="no-current-slider"
        title="No current slider"
        description="Use this to declutter the carousel interface when the exact slide count isn't strictly necessary for the user. It removes the textual slide counter while keeping other navigation elements intact. Visuals are otherwise identical. Screen readers still announce the slide index via the live region."
      >
        <PreviewBlock code={carouselCode(noCounterSource)} githubUrl={githubUrl}>
          <NoCounterCarouselExample />
        </PreviewBlock>
      </DocExample>

      <DocExample
        id="no-controls"
        title="No controls"
        description={
          <>
            Use this to create a "headless" carousel driven entirely by your own external state or custom buttons. It
            hides the primary directional arrows and pagination UI. You must pass custom buttons that hook into the{' '}
            <code>CarouselContext</code>. Keyboard arrow navigation still works implicitly on focus.
          </>
        }
      >
        <PreviewBlock code={carouselCode(noControlsSource)} githubUrl={githubUrl}>
          <NoControlsCarouselExample />
        </PreviewBlock>
      </DocExample>

      <DocExample
        id="play-infinite"
        title="Play infinitely"
        description="Use this for hero banners or continuous galleries that should cycle automatically. It rotates slides on a fixed interval without user interaction. To protect accessibility, auto-play forcibly pauses on hover or keyboard focus, ensuring users have time to read. The live region is temporarily silenced during auto-play to prevent spamming screen readers."
      >
        <PreviewBlock code={carouselCode(playInfiniteSource)} githubUrl={githubUrl}>
          <PlayInfiniteCarouselExample />
        </PreviewBlock>
      </DocExample>

      <DocExample
        id="vertical"
        title="Vertical"
        description={
          <>
            Use this to navigate between slides along the Y-axis instead of the standard horizontal direction. It
            renders the track vertically and shifts the navigation arrows to point up and down. Text within slides
            remains horizontal. Arrow navigation bindings automatically remap to <code>ArrowUp</code> and{' '}
            <code>ArrowDown</code>. Accessible live regions remain fully functional.
          </>
        }
      >
        <PreviewBlock code={carouselCode(verticalSource)} githubUrl={githubUrl}>
          <VerticalCarouselExample />
        </PreviewBlock>
      </DocExample>

      <DocExample
        id="custom-layout"
        title="Custom Layout"
        description={
          <>
            Compose the carousel from its track, slide, controls, and pagination primitives to tailor its structure. Use{' '}
            <code>useCarousel</code> to access carousel state inside custom content.
          </>
        }
      >
        <PreviewBlock
          code={carouselCode(customLayoutSource, [
            'Carousel',
            'CarouselSlide',
            'CarouselPrev',
            'CarouselNext',
            'CarouselTrack',
            'CarouselPagination',
            'useCarousel',
          ])}
          githubUrl={githubUrl}
        >
          <CustomLayoutCarouselExample />
        </PreviewBlock>
      </DocExample>

      <DocCallout borderColor={colors.warning}>
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          When customizing the dimensions in a custom layout, apply sizing utilities (e.g., <code>w-40</code>,{' '}
          <code>h-40</code>) directly to the <code>CarouselTrack</code>.
        </p>
        <p className="text-sm font-medium font-body opacity-80 mt-4">
          The <code>CarouselSlide</code> primitive automatically expands to fit the active track boundary cleanly.
        </p>
      </DocCallout>
    </DocSection>

    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <CodeViewer
        language="tsx"
        code={`<Carousel>
  <CarouselControls>
    <CarouselPrev />
    <CarouselNext />
  </CarouselControls>

  <CarouselTrack>
    <CarouselSlide>...</CarouselSlide>
    <CarouselSlide>...</CarouselSlide>
  </CarouselTrack>

  <CarouselPagination />
</Carousel>`}
      />
    </DocSection>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Uses <code>role="region"</code> and <code>aria-roledescription="carousel"</code> to identify the component
          structure to screen readers.
        </li>
        <li>
          Provides an <code>aria-label</code> (falling back to "Carousel") to convey the component context.
        </li>
        <li>
          Features a visually hidden live region (<code>aria-live</code>) that announces active slide changes
          dynamically, automatically setting politeness to <code>off</code> during auto-play to avoid screen reader
          spam.
        </li>
        <li>
          Supports full keyboard navigation using directional arrow keys (<code>ArrowLeft</code>/<code>ArrowRight</code>{' '}
          or <code>ArrowUp</code>/<code>ArrowDown</code> based on orientation).
        </li>
        <li>
          Automatically pauses auto-rotation on hover and focus to ensure users have enough time to interact with the
          content.
        </li>
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <PropsAccordion title="Carousel Props" data={carouselPropsData} className="mb-6" />
      <PropsAccordion title="CarouselSlide Props" data={carouselSlidePropsData} className="mb-6" />
      <PropsAccordion title="CarouselPrev Button Props" data={carouselPrevPropsData} className="mb-6" />
      <PropsAccordion title="CarouselNext Button Props" data={carouselNextPropsData} />
      <PropsAccordion title="CarouselTrack Props" data={carouselTrackPropsData} />
      <PropsAccordion title="CarouselControls Props" data={carouselControlsPropsData} />
      <PropsAccordion title="CarouselPagination Props" data={carouselPaginationPropsData} />
      <PropsAccordion title="useCarousel Return" data={useCarouselPropsData} isHook />
    </DocSection>
  </div>
)
