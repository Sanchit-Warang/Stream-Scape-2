import { fetchMovieById } from '@/server/data/tmdb'
import { Image } from '@nextui-org/image'
import { Chip } from '@nextui-org/chip'
import { Card } from '@nextui-org/card'
import VideoPlayer from '@/components/ui/VideoPlayer'
import NextImage from 'next/image'

const MoviePage = async ({ params }: { params: { movieid: string } }) => {
  const movie = await fetchMovieById(+params.movieid)
  return (
    <>
      <VideoPlayer
        url={`/embed/movie/${movie.id}`}
        backdrop_path={movie.backdrop_path}
        poster_path={movie.poster_path}
        tmdbId={movie.id}
        type='movie'
      />
      <div className="m-10 flex gap-5 flex-wrap">
        <div className="w-[100%] md:w-[20%]">
          <Image
            as={NextImage}
            width={20 * 16}
            height={10 * 16}
            isBlurred
            isZoomed
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="Movie Poster"
          />
        </div>
        <Card className="space-y-3 w-[100%] md:w-[78%] bg-temp rounded-lg p-5">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <div className="flex items-center gap-2  ">
            <p className=" font-semibold text-success">
              {movie.vote_average} Average Votes
            </p>
            <span>{'release_date' in movie ? movie.release_date : ''}</span>
          </div>
          <p className="text-copy-lighter">{movie.overview}</p>
          <p>Tag Line: {movie.tagline}</p>
          <p>Runtime: {movie.runtime} minutes</p>
          <div>
            Language :{' '}
            <Chip color="warning" variant="shadow">
              {movie.original_language}
            </Chip>
          </div>
        </Card>
      </div>
    </>
  )
}

export default MoviePage
