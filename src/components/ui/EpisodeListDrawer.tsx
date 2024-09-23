'use client'
import { Button } from '@nextui-org/react'
import { motion, useAnimate } from 'framer-motion'
import { AnimeEpisode, TVSeasonDeatail, Anime } from '@/types'
import EpisodeList from './EpisodeList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useClickOutside } from '@mantine/hooks'
import { useState } from 'react'

type EpisodeListDrawerProps = {
  name: string
  seasonList?: TVSeasonDeatail[]
  animeEpisodeList?: AnimeEpisode[]
  relatedAnime?: Anime[]
  totalAnimeEpisodes?: number
}

const EpisodeListDrawer = ({
  name,
  seasonList,
  animeEpisodeList,
  relatedAnime,
  totalAnimeEpisodes,
}: EpisodeListDrawerProps) => {
  const [scope, animate] = useAnimate()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutside(() => {
    if (isOpen) {
      CloseAnimate()
    }
  })

  const OpenAnimate = async () => {
    await animate('#openButton', { display: 'none' }, { duration: 0.3 })
    await animate(
      '#drawer',
      { width: document.documentElement.clientWidth },
      { duration: 0.3 }
    )
    await animate('#drawerContent', { opacity: 1 }, { duration: 0.3 })
    setIsOpen(true)
  }

  const CloseAnimate = async () => {
    await animate('#drawerContent', { opacity: 0 }, { duration: 0.3 })
    await animate('#drawer', { width: '0' }, { duration: 0.3 })
    await animate('#openButton', { display: 'block' }, { duration: 0.3 })
    setIsOpen(false)
  }
  return (
    <div ref={ref}>
      <div
        ref={scope}
        id="drawerContainer"
        className="fixed bottom-0 h-[50vh] md:h-[70vh] z-50 flex"
      >
        <motion.div
          initial={{
            width: 0,
          }}
          className="bg-background/70  overflow-y-hidden"
          id="drawer"
        >
          <div id="drawerContent" className="opacity-0 space-y-3 w-full">
            <div className="w-full flex">
              <p className="ml-2 text-3xl font-semibold mt-3">{name}</p>
              <Button
                className="ml-auto rounded-r-none"
                isIconOnly
                color="danger"
                variant="shadow"
                onClick={() => CloseAnimate()}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
            </div>
            {seasonList ? <EpisodeList seasonList={seasonList} /> : null}
            {animeEpisodeList ? (
              <EpisodeList
                animeEpisodeList={animeEpisodeList}
                totalAnimeEpisodes={totalAnimeEpisodes}
                relatedAnime={relatedAnime}
              />
            ) : null}
          </div>
        </motion.div>
        <Button
          id="openButton"
          className="rounded-l-none"
          color="primary"
          variant="shadow"
          isIconOnly
          onClick={() => OpenAnimate()}
        >
          <FontAwesomeIcon icon={faTable} />
        </Button>
      </div>
    </div>
  )
}

export default EpisodeListDrawer
