import { SingleMovie, Movie } from '@/types'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Badge } from '@nextui-org/badge'
import Link from 'next/link'

type MovieCardProps = {
  movie: Movie | SingleMovie
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      {/* <Card className="bg-card-background w-[11rem] p-0 hover:bg-primary overflow-visible"> */}
      <Card className="bg-card-background w-[11rem] p-0 hover:bg-primary overflow-visible">
        <Badge content={movie.vote_average.toFixed(1)} color="warning">
          <Image
            // fallbackSrc="https://via.placeholder.com/300x200"
            isBlurred
            isZoomed
            alt={movie.title}
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          />
        </Badge>
        <div className="m-2 text-center">
          <p className="truncate">{movie.title}</p>
        </div>
      </Card>
      {/* </Card> */}
    </Link>
  )
}

export default MovieCard
