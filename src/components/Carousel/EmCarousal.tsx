'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, Image, CardFooter, Badge, Button } from '@nextui-org/react'
import { Movie } from '@/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPaginatedTrendingMoviesDay } from '@/api/tmdb'
import { MediaData } from '@/types'
import { useInViewport } from '@mantine/hooks'

type CarousalProps = {
  moviesMediaData: MediaData<Movie>
}
const Carousal = ({ moviesMediaData }: CarousalProps) => {
  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ['trending', 'movie', 'day'],
    queryFn: fetchPaginatedTrendingMoviesDay,
    initialPageParam: 2,
    getNextPageParam: (lastPage) => {
      if (lastPage.page === lastPage.total_pages) return null
      return lastPage.page + 1
    },
    initialData: { pages: [moviesMediaData], pageParams: [1] },
    // staleTime: Infinity,
  })

  const { ref, inViewport } = useInViewport()

  useEffect(() => {
    if (inViewport) fetchNextPage()
  }, [fetchNextPage, inViewport])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 9,
    dragFree: false,
    // containScroll: 'keepSnaps',
  })
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <>{JSON.stringify(error)}</>
  ) : data ? (
    <div className="group flex  items-center  relative">
      <Button
        isDisabled={!emblaApi?.canScrollPrev()}
        onClick={scrollPrev}
        variant="ghost"
        color="secondary"
        isIconOnly
        className="absolute z-[40]  h-[11rem] bg-secondary/50 hidden group-hover:block "
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
      <Button
        isDisabled={!emblaApi?.canScrollNext()}
        onClick={scrollNext}
        variant="ghost"
        color="secondary"
        isIconOnly
        className="absolute z-[40] right-0 h-[11rem] bg-secondary/50 hidden group-hover:block"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {data.pages.map((page) =>
            page.results.map((movie) => (
              <motion.div
                className="embla__slide px-1"
                key={movie.id}
                // transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.15, zIndex: 20, position: 'relative' }}
              >
                <Card className=" overflow-visible" isFooterBlurred>
                  <Badge
                    content={movie.vote_average.toFixed(1)}
                    color="primary"
                  >
                    <Image
                      isBlurred
                      isZoomed
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={`Banner Image of movie : ${movie.title}`}
                    />
                  </Badge>
                  <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small  z-10">
                    <p className="text-xs font-semibold text-white">
                      {movie.title}
                    </p>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
          <div className="embla__slide" ref={ref}>
            <Card>Loading...</Card>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default Carousal
