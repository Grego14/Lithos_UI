import {
  Carousel,
  CarouselSlide,
  CarouselPrev,
  CarouselNext,
  CarouselTrack,
  CarouselPagination,
  useCarousel,
} from '../../../components/ui/Carousel'

const CarouselCustomContent = () => {
  const { title } = useCarousel()
  const slides = Array.from({ length: 7 }, (_, index) => <CarouselSlide key={index}>Slide {index + 1}</CarouselSlide>)

  return (
    <>
      <h4 className="text-(--lithos-text) text-md">{title}</h4>
      <div className="flex items-center space-x-4 justify-center">
        <CarouselPrev>Prev</CarouselPrev>
        <CarouselTrack className="w-40 h-25">{slides}</CarouselTrack>
        <CarouselNext>Next</CarouselNext>
      </div>
      <CarouselPagination className="mt-0" />
    </>
  )
}

export const CustomLayoutCarouselExample = () => (
  <Carousel title="Carousel with a custom layout!" asChild className="flex flex-col space-y-4 items-center py-4">
    <CarouselCustomContent />
  </Carousel>
)
