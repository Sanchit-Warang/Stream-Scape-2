import { fetchMovieById } from '@/server/data/tmdb'
import { Image } from '@nextui-org/image'
import NextImage from 'next/image'

const MoviePage = async ({ params }: { params: { movieid: string } }) => {
  const movie = await fetchMovieById(+params.movieid)
  return (
    <>
      <iframe
        src={`${process.env.STREAM_URL}/embed/movie/${params.movieid}`}
        allowFullScreen
        className="w-full h-[80vh]"
        title="Video Player"
      />
      <div className="m-10 flex gap-5">
        <Image
          as={NextImage}
          width={20 * 16}
          height={10 * 16}
          isBlurred
          isZoomed
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          className="w-[20rem]"
          alt="Movie Poster"
        />
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>{movie.tagline}</p>
          <p>{movie.release_date}</p>
          <p>{movie.runtime}</p>
          <p>{movie.original_language}</p>
          <p>{movie.vote_average}</p>
        </div>
      </div>
    </>
  )
}

export default MoviePage
