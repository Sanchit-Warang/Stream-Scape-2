'use client'
import { Episode } from '@/types'
import { Card, Image } from '@nextui-org/react'
import EpisodeCard from './ui/EpisodeCard'
import CarouselWrapper from './ui/CarouselWrapper'

type EpisodeCarouselProps = {
  episodes: Episode[]
}
const EpisodeCarousel = ({ episodes }: EpisodeCarouselProps) => {
  return (
    <CarouselWrapper>
      {episodes.map((episode) => (
        <EpisodeCard episode={episode} key={episode.id} />
      ))}
    </CarouselWrapper>
  )
}

export default EpisodeCarousel
