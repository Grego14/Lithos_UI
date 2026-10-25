import { Carousel, CarouselSlide } from '../../../components/ui/Carousel'

const slides = Array.from({ length: 7 }, (_, index) => <CarouselSlide key={index}>Slide {index + 1}</CarouselSlide>)

export const NoCounterCarouselExample = () => (
  <Carousel title="Carousel without the current slider identifier!" showCounter={false}>
    {slides}
  </Carousel>
)
