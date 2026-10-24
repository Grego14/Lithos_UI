import { Carousel, CarouselSlide } from '../../../components/ui/Carousel'

const slides = Array.from({ length: 7 }, (_, index) => <CarouselSlide key={index}>Slide {index + 1}</CarouselSlide>)

export const BottomControlsCarouselExample = () => (
  <Carousel title="Carousel with the controls at the bottom!" controlsPosition="bottom">
    {slides}
  </Carousel>
)
