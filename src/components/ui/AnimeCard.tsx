'use client'
import { Badge, Card, CardProps, Image } from '@nextui-org/react'
import Link from 'next/link'
import { cn } from '@/utils/tw'
import { Anime } from '@/types'

export type AnimeCardProps = {
  anime: Anime
} & CardProps

const AnimeCard = ({ anime, className, ...props }: AnimeCardProps) => {
  const link = `/anime/${anime.id}/1/0`

  return (
    <Link href={link} className='flex flex-col'>
      <Card
        {...props}
        className={cn(
          'bg-card-background w-full p-0 overflow-visible relative hover:bg-success', className
        )}
      >
        <Badge
          content={`${anime.vote_average ? anime.vote_average.toFixed(1) : 0}`}
          color="warning"
        >
          <Image isBlurred isZoomed alt={anime.title} src={anime.posterImage} />
        </Badge>
        <div className="m-2 text-center">
          <p className="truncate">{anime.title}</p>
        </div>
        <div className="m-2 text-center">
          <p className="truncate">{anime.relationType}</p>
        </div>
      </Card>
    </Link>
  )
}

export default AnimeCard
