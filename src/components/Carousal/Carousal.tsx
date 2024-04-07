'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { Card, Image, CardFooter } from '@nextui-org/react'
import { Movie } from '@/types'
type CarousalProps = {
  movies: Movie[]
}

const Carousal = ({ movies }: CarousalProps) => {
  const [emblaRef] = useEmblaCarousel({
    containScroll: 'trimSnaps',
    align: 'start',
  })
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container overflow-y-visible">
        <motion.div
          className="embla__slide group h-[600px]"
          key={movies[5].id}
          // whileHover={{ scale: 1.15, zIndex: 20, position: 'relative' }}
        >
          <Card>
            <Image
              isBlurred
              src={`https://image.tmdb.org/t/p/original${movies[5].backdrop_path}`}
              alt={`Banner Image of movie : ${movies[5].title}`}
            />
            <CardFooter className="hidden group-hover:block">
              Sanchit
            </CardFooter>
          </Card>
        </motion.div>
        {movies.map((movie) => (
          <motion.div
            className="embla__slide group z-20 relative"
            key={movie.id}
            // whileHover={{ scale: 1.15, zIndex: 20, position: 'relative' }}
          >
            <Card>
              <Image
                isBlurred
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={`Banner Image of movie : ${movie.title}`}
              />
              <CardFooter className="hidden group-hover:block">
                Sanchit
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Carousal
