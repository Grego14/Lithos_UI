import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Carousel, CarouselSlide } from '../../components/ui/Carousel'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import {
  carouselPropsData,
  carouselSlidePropsData,
  carouselPrevPropsData,
  carouselNextPropsData,
} from '../propsData/carousel'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Carousel.tsx'
const CAROUSEL_PATH = '../../components/ui/Carousel'

export const CarouselDoc = () => {
  const usageCode = {
    body: `export const AppCarousel = () => {
  return (
    <Carousel title='Default carousel, everything included!'>
      <CarouselSlide>Slide 1</CarouselSlide>
      <CarouselSlide>Slide 2</CarouselSlide>
      <CarouselSlide>Slide 3</CarouselSlide>
      <CarouselSlide>Slide 4</CarouselSlide>
      <CarouselSlide>Slide 5</CarouselSlide>
      <CarouselSlide>Slide 6</CarouselSlide>
      <CarouselSlide>Slide 7</CarouselSlide>
    </Carousel>
  )
}`,
    componentNames: ['Carousel', 'CarouselSlide'],
    manualPath: CAROUSEL_PATH,
  }

  const loopCode = {
    body: `export const AppCarousel = () => {
  return (
    <Carousel title='Carousel with looping!' loop>
      <CarouselSlide>Slide 1</CarouselSlide>
      <CarouselSlide>Slide 2</CarouselSlide>
      <CarouselSlide>Slide 3</CarouselSlide>
      <CarouselSlide>Slide 4</CarouselSlide>
      <CarouselSlide>Slide 5</CarouselSlide>
      <CarouselSlide>Slide 6</CarouselSlide>
      <CarouselSlide>Slide 7</CarouselSlide>
    </Carousel>
  )
}`,
    componentNames: ['Carousel', 'CarouselSlide'],
    manualPath: CAROUSEL_PATH,
  }

  const bottomControlsCode = {
    body: `export const AppCarousel = () => {
  return (
    <Carousel title='Carousel with controls at the bottom!' controlsPosition='bottom'>
      <CarouselSlide>Slide 1</CarouselSlide>
      <CarouselSlide>Slide 2</CarouselSlide>
      <CarouselSlide>Slide 3</CarouselSlide>
      <CarouselSlide>Slide 4</CarouselSlide>
      <CarouselSlide>Slide 5</CarouselSlide>
      <CarouselSlide>Slide 6</CarouselSlide>
      <CarouselSlide>Slide 7</CarouselSlide>
    </Carousel>
  )
}`,
    componentNames: ['Carousel', 'CarouselSlide'],
    manualPath: CAROUSEL_PATH,
  }

  const numbersSelectorCode = {
    body: `export const AppCarousel = () => {
  return (
    <Carousel title='Carousel using the numbers sliders selector!' slideSelector='numbers'>
      <CarouselSlide>Slide 1</CarouselSlide>
      <CarouselSlide>Slide 2</CarouselSlide>
      <CarouselSlide>Slide 3</CarouselSlide>
      <CarouselSlide>Slide 4</CarouselSlide>
      <CarouselSlide>Slide 5</CarouselSlide>
      <CarouselSlide>Slide 6</CarouselSlide>
      <CarouselSlide>Slide 7</CarouselSlide>
    </Carousel>
  )
}`,
    componentNames: ['Carousel', 'CarouselSlide'],
    manualPath: CAROUSEL_PATH,
  }

  const noCurrentSliderCode = {
    body: `export const AppCarousel = () => {
  return (
    <Carousel title='Carousel without the current slider identifier!' showCounter={false}>
      <CarouselSlide>Slide 1</CarouselSlide>
      <CarouselSlide>Slide 2</CarouselSlide>
      <CarouselSlide>Slide 3</CarouselSlide>
      <CarouselSlide>Slide 4</CarouselSlide>
      <CarouselSlide>Slide 5</CarouselSlide>
      <CarouselSlide>Slide 6</CarouselSlide>
      <CarouselSlide>Slide 7</CarouselSlide>
    </Carousel>
  )
}`,
    componentNames: ['Carousel', 'CarouselSlide'],
    manualPath: CAROUSEL_PATH,
  }

  const noControlsCode = {
    body: `export const AppCarousel = () => {
  return (
    <Carousel title='Headless Carousel!' hideControls>
      <CarouselSlide>Slide 1</CarouselSlide>
      <CarouselSlide>Slide 2</CarouselSlide>
      <CarouselSlide>Slide 3</CarouselSlide>
      <CarouselSlide>Slide 4</CarouselSlide>
      <CarouselSlide>Slide 5</CarouselSlide>
      <CarouselSlide>Slide 6</CarouselSlide>
      <CarouselSlide>Slide 7</CarouselSlide>
    </Carousel>
  )
}`,
    componentNames: ['Carousel', 'CarouselSlide'],
    manualPath: CAROUSEL_PATH,
  }

  const infinitePlayCode = {
    body: `export const AppCarousel = () => {
  return (
    <Carousel title='Carousel that plays infinitely!' playInfinite>
      <CarouselSlide>Slide 1</CarouselSlide>
      <CarouselSlide>Slide 2</CarouselSlide>
      <CarouselSlide>Slide 3</CarouselSlide>
      <CarouselSlide>Slide 4</CarouselSlide>
      <CarouselSlide>Slide 5</CarouselSlide>
      <CarouselSlide>Slide 6</CarouselSlide>
      <CarouselSlide>Slide 7</CarouselSlide>
    </Carousel>
  )
}`,
    componentNames: ['Carousel', 'CarouselSlide'],
    manualPath: CAROUSEL_PATH,
  }

  const verticalCode = {
    body: `export const AppCarousel = () => {
  return (
    <Carousel title='Carousel with vertical sliding!' vertical>
      <CarouselSlide>Slide 1</CarouselSlide>
      <CarouselSlide>Slide 2</CarouselSlide>
      <CarouselSlide>Slide 3</CarouselSlide>
      <CarouselSlide>Slide 4</CarouselSlide>
      <CarouselSlide>Slide 5</CarouselSlide>
      <CarouselSlide>Slide 6</CarouselSlide>
      <CarouselSlide>Slide 7</CarouselSlide>
    </Carousel>
  )
}`,
    componentNames: ['Carousel', 'CarouselSlide'],
    manualPath: CAROUSEL_PATH,
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Carousel
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          An accessible horizontal/vertical slide viewer supporting auto-play, custom controls, and live region
          announcements.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Carousel primitive organizes content into paginated horizontal/vertical steps. Includes built-in support
          for keyboard navigation (ArrowLeft / ArrowRight) and automated screen reader live region notifications.
        </p>
      </section>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Carousel']}
        manualPath="../../components/ui/Carousel"
        requires={[
          'utils/cn.ts',
          'utils/scrollTo.ts',
          'components/ui/Button.tsx',
          'components/ui/carousel/CarouselButton.tsx',
          'components/ui/carousel/CarouselContext.tsx',
          'components/ui/carousel/CarouselControls.tsx',
          'components/ui/carousel/CarouselSlide.tsx',
          'components/ui/carousel/CarouselPagination.tsx',
          'components/ui/carousel/useCarouselDrag.ts',
          'components/ui/icons/IconArrowLeft.tsx',
          'components/ui/icons/IconArrowRight.tsx',
          'components/ui/icons/IconArrowDown.tsx',
          'components/ui/icons/IconArrowUp.tsx',
          'components/ui/icons/IconCircle.tsx',
        ]}
      />

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <CodeViewer
          language="tsx"
          code={`<Carousel>
  <CarouselControls>
    <CarouselPrev />
    <CarouselNext />
  </CarouselControls>

  <CarouselSlide>...</CarouselSlide>
  <CarouselSlide>...</CarouselSlide>

  <CarouselPagination />
</Carousel>`}
        />
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Default
      </h3>
      <p className="mb-4 text-sm font-body opacity-70 text-(--lithos-text)">
        The default usage <i>(Using only the title prop)</i> adds top navigation controls and dot pagination indicators.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={usageCode} githubUrl={githubUrl}>
          <Carousel title="Default carousel, everything included!">
            <CarouselSlide>Slide 1</CarouselSlide>
            <CarouselSlide>Slide 2</CarouselSlide>
            <CarouselSlide>Slide 3</CarouselSlide>
            <CarouselSlide>Slide 4</CarouselSlide>
            <CarouselSlide>Slide 5</CarouselSlide>
            <CarouselSlide>Slide 6</CarouselSlide>
            <CarouselSlide>Slide 7</CarouselSlide>
          </Carousel>
        </PreviewBlock>
      </div>

      <h3 id="looping" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Infinite Looping
      </h3>
      <p className="mb-4 text-sm font-body opacity-70 text-(--lithos-text)">
        Enable continuous navigation so users can scroll seamlessly past the first and last slides.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={loopCode} githubUrl={githubUrl}>
          <Carousel title="Carousel with looping!" loop>
            <CarouselSlide>Slide 1</CarouselSlide>
            <CarouselSlide>Slide 2</CarouselSlide>
            <CarouselSlide>Slide 3</CarouselSlide>
            <CarouselSlide>Slide 4</CarouselSlide>
            <CarouselSlide>Slide 5</CarouselSlide>
            <CarouselSlide>Slide 6</CarouselSlide>
            <CarouselSlide>Slide 7</CarouselSlide>
          </Carousel>
        </PreviewBlock>
      </div>

      <h3 id="bottom-controls" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Bottom controls
      </h3>
      <p className="mb-4 text-sm font-body opacity-70 text-(--lithos-text)">
        Move the carousel controls to the bottom and the extra selectors to the top.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={bottomControlsCode} githubUrl={githubUrl}>
          <Carousel title="Carousel with the controls at the bottom!" controlsPosition="bottom">
            <CarouselSlide>Slide 1</CarouselSlide>
            <CarouselSlide>Slide 2</CarouselSlide>
            <CarouselSlide>Slide 3</CarouselSlide>
            <CarouselSlide>Slide 4</CarouselSlide>
            <CarouselSlide>Slide 5</CarouselSlide>
            <CarouselSlide>Slide 6</CarouselSlide>
            <CarouselSlide>Slide 7</CarouselSlide>
          </Carousel>
        </PreviewBlock>
      </div>

      <h3 id="numbers-selector" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Numbers Selector
      </h3>
      <p className="mb-4 text-sm font-body opacity-70 text-(--lithos-text)">
        Use numbers instead of dots on the slider selectors.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={numbersSelectorCode} githubUrl={githubUrl}>
          <Carousel title="Carousel using the numbers sliders selector!" slideSelector="numbers">
            <CarouselSlide>Slide 1</CarouselSlide>
            <CarouselSlide>Slide 2</CarouselSlide>
            <CarouselSlide>Slide 3</CarouselSlide>
            <CarouselSlide>Slide 4</CarouselSlide>
            <CarouselSlide>Slide 5</CarouselSlide>
            <CarouselSlide>Slide 6</CarouselSlide>
            <CarouselSlide>Slide 7</CarouselSlide>
          </Carousel>
        </PreviewBlock>
      </div>

      <h3 id="no-current-slider" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        No current slider
      </h3>
      <p className="mb-4 text-sm font-body opacity-70 text-(--lithos-text)">
        Hides the current slider position and total count indicator.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={noCurrentSliderCode} githubUrl={githubUrl}>
          <Carousel title="Carousel without the current slider identifier!" showCounter={false}>
            <CarouselSlide>Slide 1</CarouselSlide>
            <CarouselSlide>Slide 2</CarouselSlide>
            <CarouselSlide>Slide 3</CarouselSlide>
            <CarouselSlide>Slide 4</CarouselSlide>
            <CarouselSlide>Slide 5</CarouselSlide>
            <CarouselSlide>Slide 6</CarouselSlide>
            <CarouselSlide>Slide 7</CarouselSlide>
          </Carousel>
        </PreviewBlock>
      </div>

      <h3 id="no-controls" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        No controls
      </h3>
      <p className="mb-4 text-sm font-body opacity-70 text-(--lithos-text)">
        Hides the primary direction arrow controls.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={noControlsCode} githubUrl={githubUrl}>
          <Carousel title="Headless Carousel!" hideControls>
            <CarouselSlide>Slide 1</CarouselSlide>
            <CarouselSlide>Slide 2</CarouselSlide>
            <CarouselSlide>Slide 3</CarouselSlide>
            <CarouselSlide>Slide 4</CarouselSlide>
            <CarouselSlide>Slide 5</CarouselSlide>
            <CarouselSlide>Slide 6</CarouselSlide>
            <CarouselSlide>Slide 7</CarouselSlide>
          </Carousel>
        </PreviewBlock>
      </div>

      <h3 id="play-infinite" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Play infinitely
      </h3>
      <p className="mb-4 text-sm font-body opacity-70 text-(--lithos-text)">
        Automatically rotates slides at a specified interval without requiring user interaction.{' '}
        <i>(stops at hover/focus) if stopOnHover = true</i>
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={infinitePlayCode} githubUrl={githubUrl}>
          <Carousel title="Carousel that plays infinitely!" playInfinite>
            <CarouselSlide>Slide 1</CarouselSlide>
            <CarouselSlide>Slide 2</CarouselSlide>
            <CarouselSlide>Slide 3</CarouselSlide>
            <CarouselSlide>Slide 4</CarouselSlide>
            <CarouselSlide>Slide 5</CarouselSlide>
            <CarouselSlide>Slide 6</CarouselSlide>
            <CarouselSlide>Slide 7</CarouselSlide>
          </Carousel>
        </PreviewBlock>
      </div>

      <h3 id="vertical-orientation" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Vertical Oreientation
      </h3>
      <p className="mb-4 text-sm font-body opacity-70 text-(--lithos-text)">
        Navigate between slides vertically instead of the default horizontal direction.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={verticalCode} githubUrl={githubUrl}>
          <Carousel title="Carousel with vertical sliding!" vertical>
            <CarouselSlide>Slide 1</CarouselSlide>
            <CarouselSlide>Slide 2</CarouselSlide>
            <CarouselSlide>Slide 3</CarouselSlide>
            <CarouselSlide>Slide 4</CarouselSlide>
            <CarouselSlide>Slide 5</CarouselSlide>
            <CarouselSlide>Slide 6</CarouselSlide>
            <CarouselSlide>Slide 7</CarouselSlide>
          </Carousel>
        </PreviewBlock>
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
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
            Supports full keyboard navigation using directional arrow keys (<code>ArrowLeft</code>/
            <code>ArrowRight</code> or <code>ArrowUp</code>/<code>ArrowDown</code> based on orientation).
          </li>
          <li>
            Automatically pauses auto-rotation on hover and focus to ensure users have enough time to interact with the
            content.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
          API Reference
        </h2>

        <PropsAccordion title="Carousel Props" data={carouselPropsData} className="mb-6" />
        <PropsAccordion title="CarouselSlide Props" data={carouselSlidePropsData} className="mb-6" />
        <PropsAccordion title="CarouselPrev Button Props" data={carouselPrevPropsData} className="mb-6" />
        <PropsAccordion title="CarouselNext Button Props" data={carouselNextPropsData} />
      </section>
    </div>
  )
}
