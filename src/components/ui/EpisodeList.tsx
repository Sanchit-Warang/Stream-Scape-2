'use client'
import { Tabs, Tab } from '@nextui-org/react'
import { cn } from '@/utils/tw'
import { TVSeasonDeatail } from '@/types'
import { motion } from 'framer-motion'
import EpisodeCarousel from '../EpisodeCarousel'
import { useState } from 'react'
import { useParams } from 'next/navigation'

type EpisodeListProps = {
  seasonList: TVSeasonDeatail[]
} & React.HTMLAttributes<HTMLDivElement>
const EpisodeList = ({ className, seasonList, ...props }: EpisodeListProps) => {
  const { season } = useParams()
  const seasonNumber = +season
  const [selected, setSelected] = useState<any>(seasonList[seasonNumber - 1]._id)
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
        {seasonList.map((season) => (
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
      </Tabs>
    </div>
  )
}

export default EpisodeList
