import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Carousel, CarouselSlide } from '../../components/ui/Carousel'
import { type PropItem, PropsAccordion } from '../../components/ui/PropsTable'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Carousel.tsx'

const carouselPropsData: PropItem[] = [
  {
    name: 'title',
    type: 'string',
    required: false,
    description: 'Header text for controls and screen reader accessibility label.'
  },
  {
    name: 'controlsPosition',
    type: "'top' | 'bottom'",
    defaultValue: "'top'",
    required: false,
    description: 'Positioning of the prev/next arrow buttons.'
  },
  {
    name: 'hideControls',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Hides the direction navigation buttons.'
  },
  {
    name: 'hideExtras',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Hides indicator selectors and status counts.'
  },
  {
    name: 'extras',
    type: '{ slidersSelector?: "dots" | "numbers"; currentSlider?: boolean }',
    defaultValue: '{ slidersSelector: "dots", currentSlider: true }',
    required: false,
    description: 'Configuration for slide indicators and position counter.'
  },
  {
    name: 'playInfinite',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Enables automatic infinite slide rotation.'
  },
  {
    name: 'playInterval',
    type: 'number',
    defaultValue: '5000',
    required: false,
    description: 'Interval timing in milliseconds for automatic rotation.'
  },
  {
    name: 'playDirection',
    type: "'right' | 'left'",
    defaultValue: "'right'",
    required: false,
    description: 'Direction of infinite scroll movement.'
  },
  {
    name: 'stopOnHover',
    type: 'boolean',
    defaultValue: 'true',
    required: false,
    description: 'Pauses auto-rotation on mouse enter or keyboard focus.'
  }
]

const carouselSlidePropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Content rendered inside the individual slide.'
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Custom CSS classes passed to the slide wrapper.'
  }
]

export const CarouselDoc = () => {
  const usageCode = `import { Carousel, CarouselSlide } from '../../components/ui/Carousel'

export const AppCarousel = () => {
  return (
    <Carousel title='Default carousel, everything included!'>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 1</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 2</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 3</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 4</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 5</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 6</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 7</CarouselSlide>
    </Carousel>
  )
}`

  const bottomControlsCode = `import { Carousel, CarouselSlide } from '../../components/ui/Carousel'

export const AppCarousel = () => {
  return (
    <Carousel title='Carousel with controls at the bottom!' controlsPosition='bottom'>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 1</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 2</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 3</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 4</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 5</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 6</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 7</CarouselSlide>
    </Carousel>
  )
}`

  const numbersSelectorCode = `import { Carousel, CarouselSlide } from '../../components/ui/Carousel'

export const AppCarousel = () => {
  return (
    <Carousel title='Carousel using the numbers sliders selector' extras={{ slidersSelector: 'numbers' }}>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 1</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 2</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 3</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 4</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 5</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 6</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 7</CarouselSlide>
    </Carousel>
  )
}`

  const noCurrentSliderCode = `import { Carousel, CarouselSlide } from '../../components/ui/Carousel'

export const AppCarousel = () => {
  return (
    <Carousel title='Carousel without the current slider identifier' extras={{ currentSlider: false }}>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 1</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 2</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 3</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 4</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 5</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 6</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 7</CarouselSlide>
    </Carousel>
  )
}`

  const noControlsCode = `import { Carousel, CarouselSlide } from '../../components/ui/Carousel'

export const AppCarousel = () => {
  return (
    <Carousel title='Carousel without controls!' hideControls>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 1</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 2</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 3</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 4</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 5</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 6</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 7</CarouselSlide>
    </Carousel>
  )
}`

  const infinitePlayCode = `import { Carousel, CarouselSlide } from '../../components/ui/Carousel'

export const AppCarousel = () => {
  return (
    <Carousel title='Carousel that plays infinitely!' playInfinite>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 1</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 2</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 3</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 4</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 5</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 6</CarouselSlide>
      <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 7</CarouselSlide>
    </Carousel>
  )
}`

  return (
    <div className='max-w-5xl mx-auto px-6'>
      <header className='mt-0'>
        <h1 className='text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8'>
          Carousel
        </h1>
        <p className='mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)'>
          An accessible horizontal slide viewer supporting auto-play, custom controls, and live region announcements.
        </p>
        <hr className='border-t-2 border-(--lithos-border) mt-8 mb-8' />
      </header>

      <section className='mb-12'>
        <p className='mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body'>
          The Carousel primitive organizes content into paginated horizontal steps. Includes built-in support for keyboard navigation (ArrowLeft / ArrowRight) and automated screen reader live region notifications.
        </p>
      </section>

      <section className='mb-12'>
        <h2 id='api' className='mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)'>
          API Reference
        </h2>

        <PropsAccordion title='Carousel Props' data={carouselPropsData} className='mb-4' />
        <PropsAccordion title='CarouselSlide Props' data={carouselSlidePropsData} />
      </section>

      <h2 id='examples' className='mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)'>
        Examples
      </h2>

      <h3 id='default' className='mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)'>
        Default
      </h3>
      <p className='mb-4 text-sm font-body opacity-70 text-(--lithos-text)'>
        The default usage <i>(Using only the title prop)</i> adds top navigation controls and dot pagination indicators.
      </p>

      <div className='mt-8 mb-16'>
        <PreviewBlock code={usageCode} githubUrl={githubUrl}>
          <Carousel title='Default carousel, everything included!'>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 1</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 2</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 3</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 4</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 5</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 6</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 7</CarouselSlide>
          </Carousel>
        </PreviewBlock>
      </div>

      <h3 id='bottom-controls' className='mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)'>
        Bottom controls
      </h3>
      <p className='mb-4 text-sm font-body opacity-70 text-(--lithos-text)'>
        Move the carousel controls to the bottom and the extra selectors to the top.
      </p>

      <div className='mt-8 mb-16'>
        <PreviewBlock code={bottomControlsCode} githubUrl={githubUrl}>
          <Carousel title='Carousel with the controls at the bottom!' controlsPosition='bottom'>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 1</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 2</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 3</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 4</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 5</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 6</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 7</CarouselSlide>
          </Carousel>
        </PreviewBlock>
      </div>

      <h3 id='numbers-selector' className='mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)'>
        Numbers Selector
      </h3>
      <p className='mb-4 text-sm font-body opacity-70 text-(--lithos-text)'>
        Use numbers instead of dots on the slider selectors.
      </p>

      <div className='mt-8 mb-16'>
        <PreviewBlock code={numbersSelectorCode} githubUrl={githubUrl}>
          <Carousel title='Carousel using the numbers sliders selector!' extras={{ slidersSelector: 'numbers' }}>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 1</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 2</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 3</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 4</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 5</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 6</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 7</CarouselSlide>
          </Carousel>
        </PreviewBlock>
      </div>

      <h3 id='no-current-slider' className='mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)'>
        Without current slider
      </h3>
      <p className='mb-4 text-sm font-body opacity-70 text-(--lithos-text)'>
        Hides the current slider position and total count indicator.
      </p>

      <div className='mt-8 mb-16'>
        <PreviewBlock code={noCurrentSliderCode} githubUrl={githubUrl}>
          <Carousel title='Carousel without the current slider identifier!' extras={{ currentSlider: false }}>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 1</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 2</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 3</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 4</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 5</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 6</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 7</CarouselSlide>
          </Carousel>
        </PreviewBlock>
      </div>

      <h3 id='no-controls' className='mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)'>
        Without controls
      </h3>
      <p className='mb-4 text-sm font-body opacity-70 text-(--lithos-text)'>
        Hides the primary direction arrow controls.
      </p>

      <div className='mt-8 mb-16'>
        <PreviewBlock code={noControlsCode} githubUrl={githubUrl}>
          <Carousel title='Carousel without the controls!' hideControls>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 1</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 2</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 3</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 4</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 5</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 6</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 7</CarouselSlide>
          </Carousel>
        </PreviewBlock>
      </div>

      <h3 id='play-infinite' className='mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)'>
        Play infinitely
      </h3>
      <p className='mb-4 text-sm font-body opacity-70 text-(--lithos-text)'>
        Automatically rotates slides at a specified interval without requiring user interaction.
      </p>

      <div className='mt-8 mb-16'>
        <PreviewBlock code={infinitePlayCode} githubUrl={githubUrl}>
          <Carousel title='Carousel that plays infinitely!' playInfinite>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 1</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 2</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 3</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 4</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 5</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 6</CarouselSlide>
            <CarouselSlide className='h-[20rem] flex items-center justify-center'>Slide 7</CarouselSlide>
          </Carousel>
        </PreviewBlock>
      </div>
    </div>
  )
}
