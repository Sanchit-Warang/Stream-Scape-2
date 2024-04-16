'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Movie } from '@/types'
import { cn } from '@/utils/tw'
import { useState } from 'react'
import { Button } from '@nextui-org/react'

type BannerProps = {
  movies: Movie[]
}

const Banner = ({ movies }: BannerProps) => {
  const [emblaRef1] = useEmblaCarousel({ loop: true, watchDrag: false }, [
    Autoplay({
      delay: 8000,
    }),
  ])
  const [emblaRef2] = useEmblaCarousel({ loop: true, watchDrag: false }, [
    Autoplay({
      delay: 8000,
    }),
  ])
  const [show, setShow] = useState(true)
  return (
    <>
      <div
        className={cn(
          'h-[100vh] w-full absolute top-0 left-0 -z-50',
          show ? '' : 'hidden'
        )}
      >
        <div className="overflow-hidden h-full" ref={emblaRef1}>
          <div className="flex h-full">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="flex-grow-0 flex-shrink-0 w-full min-w-0"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={`Banner Image of ${movie.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="banner-gradient h-[100vh] w-full absolute top-0 left-0 -z-30"></div>
      <div
        className={cn('overflow-hidden', show ? '' : 'hidden')}
        ref={emblaRef2}
      >
        <div className="flex">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-grow-0 flex-shrink-0 w-full min-w-0"
            >
              {movie.title}
            </div>
          ))}
        </div>
      </div>
      <Button onClick={() => setShow(!show)}>Show</Button>
    </>
  )
}

export default Banner
