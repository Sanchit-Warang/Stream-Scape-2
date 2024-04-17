'use client'
import { MediaData, Movie, TVShow } from '@/types'
import { motion } from 'framer-motion'
import {
  Card,
  Image,
  CardFooter,
  Badge,
  Button,
  CircularProgress,
} from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRef, useEffect } from 'react'
import { fetchPaginatedTopRatedTVShows } from '@/api/tmdb'
//new import
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInViewport } from '@mantine/hooks'
import {
  fetchPaginatedTopRatedMovies,
  fetchPaginatedTrendingMoviesDay,
  fetchPaginatedTrendingTVDay,
} from '@/api/tmdb'

type CarousalProps = {
  moviesOrTVShowsMediaData: MediaData<Movie | TVShow>
  category: Category
  queryKey: (string | number)[]
  scrollToSlides?: number
}

type Category =
  | 'trending_movie_day'
  | 'top_rated_movie'
  | 'trending_tv_day'
  | 'top_rated_tv'

const functions = {
  trending_movie_day: fetchPaginatedTrendingMoviesDay,
  trending_tv_day: fetchPaginatedTrendingTVDay,
  top_rated_movie: fetchPaginatedTopRatedMovies,
  top_rated_tv: fetchPaginatedTopRatedTVShows,
}

const Carousel = ({
  moviesOrTVShowsMediaData,
  category,
  queryKey,
  scrollToSlides = 3,
}: CarousalProps) => {
  const showsRef = useRef<HTMLDivElement>(null)
  const { ref, inViewport } = useInViewport()
  // const [isScrollable, setIsScrollable] = useState(false)

  const scrollToDirection = (direction: 'left' | 'right') => {
    if (!showsRef.current) return
    // setIsScrollable(true)
    const { scrollLeft } = showsRef.current
    const scrollSlides = scrollToSlides * (17.5 * 16)
    const offset =
      direction === 'left'
        ? scrollLeft - scrollSlides
        : scrollLeft + scrollSlides
    showsRef.current.scrollTo({ left: offset, behavior: 'smooth' })

    if (scrollLeft === 0 && direction === 'left') {
      showsRef.current.scrollTo({
        left: showsRef.current.scrollWidth,
        behavior: 'smooth',
      })
    }
  }

  //nre Code
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: functions[category],
    initialPageParam: 2,
    getNextPageParam: (lastPage) => {
      if (lastPage.page === lastPage.total_pages) return null
      return lastPage.page + 1
    },
    initialData: { pages: [moviesOrTVShowsMediaData], pageParams: [1] },
    // staleTime: Infinity,
  })

  useEffect(() => {
    if (inViewport) {
      fetchNextPage()
    }
  }, [fetchNextPage, inViewport])

  return (
    <div className="group flex  items-center  relative">
      <Button
        onClick={() => scrollToDirection('left')}
        variant="ghost"
        color="secondary"
        isIconOnly
        className="absolute z-[40]  h-[11rem] bg-secondary/50 hidden md:group-hover:block"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
      <Button
        onClick={() => scrollToDirection('right')}
        variant="ghost"
        color="secondary"
        isIconOnly
        className="absolute z-[40] right-0 h-[11.5rem] bg-secondary/50 hidden md:group-hover:block"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
      <div
        ref={showsRef}
        className="no-scrollbar flex gap-2 overflow-x-auto  h-[12.1rem] items-center !scroll-smooth overflow-y-none "
      >
        {data.pages.map((page) =>
          page.results.map((entry) => (
            <motion.div
              className="item min-w-[17rem]"
              key={entry.id}
              whileHover={{ scale: 1.15, zIndex: 20 }}
            >
              <Card isPressable className="overflow-visible" isFooterBlurred>
                <Badge content={entry.vote_average.toFixed(1)} color="primary">
                  <Image
                    isBlurred
                    isZoomed
                    src={`https://image.tmdb.org/t/p/w1280${entry.backdrop_path}`}
                    alt={`Banner Image of ${
                      'title' in entry ? 'TV show' : 'Movie'
                    }  : ${'title' in entry ? entry.title : entry.name}`}
                  />
                </Badge>
                <CardFooter className="justify-center bg-black/40 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small  z-10">
                  <p className="text-xs font-semibold text-white">
                    {'title' in entry ? entry.title : entry.name}
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        )}
        <div
          className="item min-w-[17rem] flex justify-center h-[12.1rem]"
          ref={ref}
        >
          <CircularProgress />
        </div>
      </div>
    </div>
  )
}

export default Carousel
