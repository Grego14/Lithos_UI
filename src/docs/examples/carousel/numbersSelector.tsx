import { Carousel, CarouselSlide } from '../../../components/ui/Carousel'

const slides = Array.from({ length: 7 }, (_, index) => <CarouselSlide key={index}>Slide {index + 1}</CarouselSlide>)

export const NumbersSelectorCarouselExample = () => (
  <Carousel title="Carousel using the numbers sliders selector!" slideSelector="numbers">
    {slides}
  </Carousel>
)
