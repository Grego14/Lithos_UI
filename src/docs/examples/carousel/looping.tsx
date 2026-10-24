import { Carousel, CarouselSlide } from '../../../components/ui/Carousel'

const slides = Array.from({ length: 7 }, (_, index) => <CarouselSlide key={index}>Slide {index + 1}</CarouselSlide>)

export const LoopingCarouselExample = () => (
  <Carousel title="Carousel with looping!" loop>
    {slides}
  </Carousel>
)
