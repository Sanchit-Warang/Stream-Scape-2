'use client'
import { SingleMovie, Movie, SingleTVShow, TVShow } from '@/types'
import { Card } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import { Chip } from '@nextui-org/chip'
import { Badge } from '@nextui-org/badge'
import { isMovie } from '@/utils/custom/typeGuard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { cn } from '@/utils/tw'
import {
  useDeleteMovieFromWatchHistoryMutation,
  useDeleteTVShowFromWatchHistoryMutation,
} from '@/hooks/watchHistory'
import { useSession } from 'next-auth/react'

type MediaCardProps =
  | { movie: Movie | SingleMovie; page?: number; tv?: never }
  | {
      tv:
        | TVShow
        | SingleTVShow
        | SingleTVShow
        | (SingleTVShow & {
            seasonNumber: number
            episodeNumber: number
          })
      page?: number
      movie?: never
    }

const MediaCard = ({ movie, tv, page = 0 }: MediaCardProps) => {
  const item = movie || tv

  const session = useSession()
  const userId = session.data?.user?.id ? session.data?.user?.id : ''

  const deleteMovieFromWatchHistoryMutation =
    useDeleteMovieFromWatchHistoryMutation()

  const deleteTVShowFromWatchHistoryMutation =
    useDeleteTVShowFromWatchHistoryMutation()

  if (!item) {
    return null
  }

  const link = isMovie(item)
    ? `/movie/${item.id}`
    : 'seasonNumber' in item && 'episodeNumber' in item
    ? `/tv/${item.id}/${item.seasonNumber}/${item.episodeNumber}`
    : `/tv/${item.id}/1/1`

  const onDelete = async () => {
    if (isMovie(item)) {
      await deleteMovieFromWatchHistoryMutation.mutateAsync({
        tmdbId: `${item.id}`,
        userId,
        page
      })
    } else {
      await deleteTVShowFromWatchHistoryMutation.mutateAsync({
        tmdbId: `${item.id}`,
        userId,
        page
      })
    }
  }

  return (
    <Link href={link}>
      <Card
        className={cn(
          'bg-card-background w-full p-0 overflow-visible relative',
          isMovie(item) ? 'hover:bg-primary' : 'hover:bg-secondary'
        )}
      >
        {!isMovie(item) &&
          'seasonNumber' in item &&
          'episodeNumber' in item && (
            <>
              <Chip
                size="sm"
                color="success"
                className="absolute z-[11] -bottom-[6px] -right-[10px]"
              >
                {`${item.seasonNumber}`}/{`${item.episodeNumber}`}
              </Chip>
            </>
          )}
        <Button
          isIconOnly
          color="danger"
          size="sm"
          className="rounded-full absolute z-[11] -top-[6px] -left-[10px]"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Badge
          content={`${item.vote_average ? item.vote_average.toFixed(1) : 0}`}
          color="warning"
        >
          <Image
            isBlurred
            isZoomed
            alt={isMovie(item) ? item.title : item.name}
            src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
          />
        </Badge>
        <div className="m-2 text-center">
          <p className="truncate">{isMovie(item) ? item.title : item.name}</p>
        </div>
      </Card>
    </Link>
  )
}

export default MediaCard
