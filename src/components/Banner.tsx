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
import Trailer from './Trailer'
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react'
import Link from 'next/link'

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
      <div className="bg-gradient-to-t from-background to-background/40 h-[100vh] w-full absolute top-0 left-0 -z-30"></div>
      <div
        className={cn('overflow-hidden', show ? '' : 'hidden')}
        ref={emblaRef2}
      >
        <div className="flex">
          {movies.map((movie) => (
            <MovieDataBanner key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Banner

type MovieDataBanner = {
  movie: Movie
  key: number
}

export const MovieDataBanner = ({ movie }: MovieDataBanner) => {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <div className="flex-grow-0 flex-shrink-0 w-full min-w-0">
        <div className="md:w-[50%] rounded-lg space-y-3 mb-3">
          <div className="font-bold text-3xl ">{movie.title}</div>
          <div className="flex items-center gap-2 text-sm ">
            <p className=" font-semibold text-success ">
              {movie.vote_average.toFixed(1)} Average Votes
            </p>
            <span>{movie.release_date}</span>
          </div>
          <div className="text-sm">
            <p className="line-clamp-3">{movie.overview}</p>
          </div>
          <div className="flex gap-3">
            <PlayButton as={Link} to={`/movie/${movie.id}`} size="sm"/>
            {/* <InfoButton onClick={onOpen} size="sm" /> */}
          </div>
        </div>
      </div>
      {/* <Modal
        className="p-0"
        backdrop="blur"
        size="3xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        closeButton={<></>}
      >
        <ModalContent className="p-0 bg-background">
          {(onClose) => (
            <>
              <ModalBody className="p-0">
                {isOpen && (
                  <Trailer
                    onClose={onClose}
                    id={movie.id}
                    type={'title' in movie ? 'movie' : 'tv'}
                  />
                )}
                <div className="p-3 space-y-3">
                  <p className="text-2xl font-bold">
                    {'title' in movie ? movie.title : ''}
                  </p>
                  <div className="flex items-center gap-2 text-sm ">
                    <p className=" font-semibold text-success ">
                      {movie.vote_average} Average Votes
                    </p>
                    <span>
                      {'release_date' in movie ? movie.release_date : ''}
                    </span>
                  </div>
                  <p className="text-xs">{movie.overview}</p>
                  <PlayButton to={`/movie/${movie.id}`} size="sm" />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </>
  )
}
