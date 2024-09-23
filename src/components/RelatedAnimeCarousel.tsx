'use client'
import { Anime } from '@/types'
import CarouselWrapper from './ui/CarouselWrapper'
import { CarouselWrapperProps } from './ui/CarouselWrapper'
import AnimeCard from './ui/AnimeCard'

type RelatedAnimeCarouselProps = {
  relatedAnime: Anime[]
} & Omit<CarouselWrapperProps, 'children'>

const RelatedAnimeCarousel = ({
  relatedAnime,
  className,
  ...props
}: RelatedAnimeCarouselProps) => {
  return (
    <CarouselWrapper className='px-10' {...props}>
      {relatedAnime.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} className='max-w-[11rem] max-h-[25rem]' />
      ))}
    </CarouselWrapper>
  )
}

export default RelatedAnimeCarousel
