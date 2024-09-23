'use client'
import { Tabs, Tab } from '@nextui-org/react'
import { cn } from '@/utils/tw'
import { TVSeasonDeatail, AnimeEpisode, Anime } from '@/types'
import { motion } from 'framer-motion'
import EpisodeCarousel from '../EpisodeCarousel'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import RelatedAnimeCarousel from '../RelatedAnimeCarousel'

type EpisodeListProps = {
  seasonList?: TVSeasonDeatail[]
  animeEpisodeList?: AnimeEpisode[]
  totalAnimeEpisodes?: number
  relatedAnime?: Anime[]
} & React.HTMLAttributes<HTMLDivElement>
const EpisodeList = ({
  className,
  seasonList,
  animeEpisodeList,
  totalAnimeEpisodes,
  relatedAnime,
  ...props
}: EpisodeListProps) => {
  const { season } = useParams()
  const seasonNumber = +season
  let InitialSelected = '1'

  if (seasonList) {
    InitialSelected = seasonList[seasonNumber - 1]._id
  }

  const [selected, setSelected] = useState<any>(InitialSelected)
  return (
    <div {...props} className={cn('flex w-full flex-col', className)}>
      <Tabs
        size="lg"
        color="secondary"
        aria-label="Options"
        className="mx-10"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        {seasonList?.map((season) => (
          <Tab key={season._id} title={season.name}>
            <motion.div
              className="mx-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <EpisodeCarousel episodes={season.episodes} />
            </motion.div>
          </Tab>
        ))}
        {animeEpisodeList && (
          <Tab title="Episodes">
            <motion.div
              className="mx-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <EpisodeCarousel
                episodes={animeEpisodeList}
                totalAnimeEpisodes={totalAnimeEpisodes}
              />
            </motion.div>
          </Tab>
        )}
        {relatedAnime && (
          <Tab title="Related Anime">
            <motion.div
              className="mx-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {<RelatedAnimeCarousel relatedAnime={relatedAnime} />}
            </motion.div>
          </Tab>
        )}
      </Tabs>
    </div>
  )
}

export default EpisodeList
