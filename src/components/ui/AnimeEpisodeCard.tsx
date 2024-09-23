'use client'
import { Card, CardProps, Image, Badge } from '@nextui-org/react'
import { cn } from '@/utils/tw'
import { AnimeEpisode} from '@/types'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { useParams } from 'next/navigation'


type AnimeEpisodeCardProps = {
  episode?: AnimeEpisode 
  episodeNum: number
} & CardProps

const AnimeEpisodeCard = ({ className, episode, episodeNum,  ...props }: AnimeEpisodeCardProps) => {
  const {episode: e} = useParams()
  const {animeId} = useParams()
  const {type} = useParams()
  const episodeNumber = +e

  const isHighligthted = episodeNumber === episodeNum

  const ref = useRef<HTMLDivElement>(null);



  useEffect(() => {
    if (episodeNumber === episodeNum && ref.current) {
      // ref.current.focus();
      ref.current.scrollIntoView({ inline: 'start' , block: 'nearest' });
    }
  }, [episodeNumber, episodeNum, episode]);

  return (
    // <Badge content={episode.vote_average.toFixed(1)} color="warning">
    <Link
      href={`/anime/${animeId}/${episodeNum}/${type}`}
      className='flex flex-col'
    >
      <Card
        ref={ref}
        tabIndex={-1}
        {...props}
        className={cn(
          'min-w-[17rem] bg-background/70 flex-grow max-w-[17rem]',
          isHighligthted ? 'bg-card-background': '',
          className
        )}
      >
          <Image
            isBlurred
            isZoomed
            src={`${episode? episode.thumbnail : ''}`}
            alt={'Episode number'+episodeNum}
          />
        <div className="px-3 pt-2 space-y-2 flex flex-col">
          <p className="text-primary">EPISODE {episodeNum}</p>
          <p className="w-full flex justify-between">
            {episode?.title}
          </p>
        </div>
      </Card>
    </Link>
    // </Badge>
  )
}

export default AnimeEpisodeCard
