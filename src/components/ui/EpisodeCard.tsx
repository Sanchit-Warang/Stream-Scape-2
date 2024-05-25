'use client'
import { Card, CardProps, Image, Badge } from '@nextui-org/react'
import { cn } from '@/utils/tw'
import { Episode } from '@/types'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { useParams } from 'next/navigation'
type EpisodeCardProps = {
  episode: Episode
} & CardProps

const EpisodeCard = ({ className, episode, ...props }: EpisodeCardProps) => {
  const {episode: e} = useParams()
  const {season: s} = useParams()
  const episodeNumber = +e
  const seasonNumber = +s
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (episodeNumber === episode.episode_number && seasonNumber === episode.season_number && ref.current) {
      // ref.current.focus();
      ref.current.scrollIntoView({ inline: 'start' , block: 'nearest' });
    }
  }, [episodeNumber, episode.episode_number, seasonNumber, episode.season_number]);

  return (
    // <Badge content={episode.vote_average.toFixed(1)} color="warning">
    <Link
      href={`/tv/${episode.show_id}/${episode.season_number}/${episode.episode_number}`}
    >
      <Card
        ref={ref}
        tabIndex={-1}
        {...props}
        className={cn(
          'min-w-[17rem] bg-background/70 overflow-visible',
          className
        )}
      >
        <Badge content={episode.vote_average.toFixed(1)} color="warning">
          <Image
            isBlurred
            isZoomed
            src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`}
            alt={episode.name}
          />
        </Badge>
        <div className="px-3 pt-2 space-y-2 flex flex-col">
          <p className="text-primary">EPISODE {episode.episode_number}</p>
          <p className="w-full flex justify-between">
            {episode.name}{' '}
            <span className="ml-auto text-sm text-copy-light">
              {episode.runtime} min
            </span>{' '}
          </p>
          <p className="text-copy-lighter text-xs flex-grow overflow-y-hidden">{episode.overview}</p>
        </div>
      </Card>
    </Link>
    // </Badge>
  )
}

export default EpisodeCard
