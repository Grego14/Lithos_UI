import { Carousel, CarouselSlide } from '../../../components/ui/Carousel'

const slides = Array.from({ length: 7 }, (_, index) => <CarouselSlide key={index}>Slide {index + 1}</CarouselSlide>)

export const VerticalCarouselExample = () => (
  <Carousel title="Carousel with vertical sliding!" mode="vertical">
    {slides}
  </Carousel>
)
