import { Carousel, CarouselSlide } from '../../../components/ui/Carousel'

const slides = Array.from({ length: 7 }, (_, index) => <CarouselSlide key={index}>Slide {index + 1}</CarouselSlide>)

export const NoControlsCarouselExample = () => (
  <Carousel title="Headless Carousel!" hideControls>
    {slides}
  </Carousel>
)
