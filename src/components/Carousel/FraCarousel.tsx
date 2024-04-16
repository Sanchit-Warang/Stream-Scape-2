'use client'
import { MediaData, Movie } from '@/types'
import { motion } from 'framer-motion'
import { Card, Image, CardFooter, Badge, Button } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPaginatedTrendingMoviesDay } from '@/api/tmdb'
import { useInViewport } from '@mantine/hooks'

type CarousalProps = {
  moviesMediaData: MediaData<Movie>
}

const MyCarousel = ({ moviesMediaData }: CarousalProps) => {
  const movies = moviesMediaData.results
  const [offsetWidth, setOffsetWidth] = useState(0)
  const [width, setWidth] = useState(0)
  const [scroll, setScoll] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)

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
    if (inViewport) {
      fetchNextPage()
    }
    if (carousel.current) {
      setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
    }
  }, [fetchNextPage, inViewport])

  useEffect(() => {
    if (carousel.current) {
      setOffsetWidth(carousel.current?.offsetWidth)
    }
    if (carousel.current) {
      setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
    }
  }, [])

  return (
    <>
      <motion.div
        ref={carousel}
        className="carousel overflow-x-hidden bg-black"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          animate={{
            x: -scroll,
          }}
          transition={{ duration: 1 }}
          className="inner-carousel flex bg-white h-[12.2rem] items-center"
        >
          {data.pages.map((page) =>
            page.results.map((movie) => (
              <motion.div
                className="item min-w-[17rem]"
                key={movie.id}
                whileHover={{ scale: 1.15, zIndex: 20 }}
              >
                <Card className="overflow-visible" isFooterBlurred>
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
          {/* {movies.map((movie) => (
            <motion.div
              className="item min-w-[17rem]"
              key={movie.id}
              whileHover={{ scale: 1.15, zIndex: 20 }}
            >
              <Card className="overflow-visible" isFooterBlurred>
                <Badge content={movie.vote_average.toFixed(1)} color="primary">
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
          ))} */}
          <div className="item min-w-[17rem]" ref={ref}>
            <Card>Loading...</Card>
          </div>
        </motion.div>
      </motion.div>
      <button onClick={() => setScoll(Math.min(scroll + offsetWidth, width))}>
        next
      </button>
      <button onClick={() => setScoll(Math.max(scroll - offsetWidth, 0))}>
        prev
      </button>
    </>
  )
}

export default MyCarousel
