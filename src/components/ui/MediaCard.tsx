import { SingleMovie, Movie, SingleTVShow, TVShow } from '@/types'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Chip } from '@nextui-org/chip'
import { Badge } from '@nextui-org/badge'
import { isMovie } from '@/utils/custom/typeGuard'
import Link from 'next/link'
import { cn } from '@/utils/tw'

type MediaCardProps =
  | { movie: Movie | SingleMovie; tv?: never }
  | {
      tv:
        | TVShow
        | SingleTVShow
        | SingleTVShow
        | (SingleTVShow & {
            seasonNumber: number
            episodeNumber: number
          })
      movie?: never
    }

const MediaCard = ({ movie, tv }: MediaCardProps) => {
  const item = movie || tv

  if (!item) {
    return null
  }

  const link = isMovie(item)
    ? `/movie/${item.id}`
    : 'seasonNumber' in item && 'episodeNumber' in item
    ? `/tv/${item.id}/${item.seasonNumber}/${item.episodeNumber}`
    : `/tv/${item.id}/1/1`

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
            // <div className="absolute z-[11] w-full h-full flex justify-end items-center left-3">
              <Chip size='sm' color="success" className="absolute z-[11] bottom-[-6] right-[-10]">
                {`${item.seasonNumber}`}/{`${item.episodeNumber}`}
              </Chip>
            // </div>
          )}
        <Badge content={`${item.vote_average.toFixed(1)}`} color="warning">
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

// import { SingleMovie, Movie } from '@/types'
// import { Card } from '@nextui-org/card'
// import { Image } from '@nextui-org/image'
// import { Badge } from '@nextui-org/badge'
// import { SingleTVShow, TVShow } from '@/types'
// import Link from 'next/link'

// type MovieCardProps = {
//   movie: Movie | SingleMovie
// } | {
//   tv: TVShow | SingleTVShow
// }

// const MovieCard = ({ movie, tv }: MovieCardProps) => {
//   return (
//     <Link href={`/movie/${movie.id}`}>
//       <Card className="bg-card-background w-[11rem] p-0 hover:bg-primary overflow-visible">
//         <Badge content={movie.vote_average.toFixed(1)} color="warning">
//           <Image
//             // fallbackSrc="https://via.placeholder.com/300x200"
//             isBlurred
//             isZoomed
//             alt={movie.title}
//             src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
//           />
//         </Badge>
//         <div className="m-2 text-center">
//           <p className="truncate">{movie.title}</p>
//         </div>
//       </Card>
//     </Link>
//   )
// }

// export default MovieCard
