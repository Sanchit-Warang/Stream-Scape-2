'use client'
import { AnimeEpisode, Episode } from '@/types'
import EpisodeCard from './ui/EpisodeCard'
import CarouselWrapper from './ui/CarouselWrapper'
import AnimeEpisodeCard from './ui/AnimeEpisodeCard'

type EpisodeCarouselProps = {
  episodes: Episode[] | AnimeEpisode[]
  totalAnimeEpisodes?: number
}
const EpisodeCarousel = ({
  episodes,
  totalAnimeEpisodes,
}: EpisodeCarouselProps) => {
  return (
    <CarouselWrapper>
      {episodes.map((episode, i) => (
        <>
          {'id' in episode ? (
            <EpisodeCard episode={episode} key={episode.id} />
          ) : (
            <AnimeEpisodeCard episode={episode} key={i} episodeNum={i + 1} />
          )}
        </>
      ))}
      {episodes.length === 0 && totalAnimeEpisodes && (
        <>
          {[...Array(totalAnimeEpisodes)].map((_, i) => (
            <AnimeEpisodeCard episodeNum={i + 1} key={i} />
          ))}
        </>
      )}
    </CarouselWrapper>
  )
}

export default EpisodeCarousel
