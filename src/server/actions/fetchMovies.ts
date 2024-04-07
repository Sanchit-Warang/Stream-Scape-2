'use server'
import { Movie, MediaData } from '@/types'
export const fetchTrendingMoviesDay = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`,
    { next: { tags: ['trending', 'movie', 'day'], revalidate: 60 * 60 * 24 } }
  )
  return (await res.json()) as MediaData<Movie>
}
