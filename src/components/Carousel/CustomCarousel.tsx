'use client'
import { MediaData, Movie } from '@/types'
import { motion } from 'framer-motion'
import { Card, Image, CardFooter, Badge, Button } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'

type CarousalProps = {
  moviesMediaData: MediaData<Movie>
}

const CustomCarousel = ({ moviesMediaData }: CarousalProps) => {
  const movies = moviesMediaData.results
  const showsRef = useRef<HTMLDivElement>(null)
  // const [isScrollable, setIsScrollable] = useState(false)

  const scrollToDirection = (direction: 'left' | 'right') => {
    if (!showsRef.current) return

    // setIsScrollable(true)
    const { scrollLeft, clientWidth } = showsRef.current
    const offset =
      direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
    showsRef.current.scrollTo({ left: offset, behavior: 'smooth' })

    if (scrollLeft === 0 && direction === 'left') {
      showsRef.current.scrollTo({
        left: showsRef.current.scrollWidth,
        behavior: 'smooth',
      })
    }
  }

  

  return (
    <div className="group flex  items-center  relative">
      <Button
        onClick={() => scrollToDirection('left')}
        variant="ghost"
        color="secondary"
        isIconOnly
        className="absolute z-[40]  h-[11rem] bg-secondary/50 hidden group-hover:block "
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
      <Button
        onClick={() => scrollToDirection('right')}
        variant="ghost"
        color="secondary"
        isIconOnly
        className="absolute z-[40] right-0 h-[11.5rem] bg-secondary/50 hidden group-hover:block"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
      <div
        ref={showsRef}
        className="no-scrollbar flex gap-2 overflow-x-auto  h-[12.1rem] items-center !scroll-smooth"
      >
        {movies.map((movie) => (
          <motion.div
            className="item min-w-[17rem]"
            key={movie.id}
            whileHover={{ scale: 1.15, zIndex: 20, position: 'relative' }}
          >
            <Card className="overflow-visible" isFooterBlurred>
              <Badge content={movie.vote_average.toFixed(1)} color="primary">
                <Image
                  isBlurred
                  isZoomed
                  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
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
        ))}
      </div>
    </div>
  )
}

export default CustomCarousel
