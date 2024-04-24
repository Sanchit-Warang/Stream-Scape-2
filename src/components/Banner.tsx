'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Movie } from '@/types'
import { cn } from '@/utils/tw'
import { useState } from 'react'
import PlayButton from './ui/PlayButton'
import { useMediaQuery } from '@mantine/hooks'
import InfoButton from './ui/InfoButton'
import Image from 'next/image'

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
  const [show] = useState(true)
  const matches = useMediaQuery('(max-width: 640px)')
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
                <Image
                  // src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  src={`https://image.tmdb.org/t/p/original${
                    matches ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={`Banner Image of ${movie.title}`}
                  className="w-full h-full object-cover"
                  width={1920}
                  height={1080}
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
              <div className="md:w-[50%] rounded-lg space-y-3">
                <div className="font-bold text-3xl ">{movie.title}</div>
                <div className="flex items-center gap-2 text-sm ">
                  <p className=" font-semibold text-success ">
                    {movie.vote_average} Average Votes
                  </p>
                  <span>{movie.release_date}</span>
                </div>
                <div className="text-sm truncate-3-lines">{movie.overview}</div>
                <div className="flex gap-3">
                  <PlayButton size="sm" />
                  <InfoButton size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Banner
