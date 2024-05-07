'use client'
import { Button } from '@nextui-org/react'
import { motion, useAnimate } from 'framer-motion'
import { TVSeasonDeatail } from '@/types'
import EpisodeList from './EpisodeList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

type EpisodeListDrawerProps = {
  name: string
  seasonList: TVSeasonDeatail[]
}

const EpisodeListDrawer = ({ name, seasonList }: EpisodeListDrawerProps) => {
  const [scope, animate] = useAnimate()

  const OpenAnimate = async () => {
    await animate('#openButton', { display: 'none' }, { duration: 0.3 })
    await animate(
      '#drawer',
      { width: document.documentElement.clientWidth },
      { duration: 0.3 }
    )
    await animate('#drawerContent', { opacity: 1 }, { duration: 0.3 })
  }

  const CloseAnimate = async () => {
    await animate('#drawerContent', { opacity: 0 }, { duration: 0.3 })
    await animate('#drawer', { width: '0' }, { duration: 0.3 })
    await animate('#openButton', { display: 'block' }, { duration: 0.3 })
  }
  return (
    <div
      ref={scope}
      id="drawerContainer"
      className="fixed bottom-0 h-[70vh] z-50 flex"
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
          <EpisodeList seasonList={seasonList} />
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
  )
}

export default EpisodeListDrawer
