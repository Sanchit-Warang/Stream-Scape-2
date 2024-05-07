'use server'
import { Movie, SingleMovie, SingleTVShow, MediaData, TVShow, TVSeasonDeatail } from '@/types'
export const fetchTrendingMoviesDay = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`,
    { next: { tags: ['trending', 'movie', 'day'], revalidate: 60 * 60 * 24 } }
  )
  return (await res.json()) as MediaData<Movie>
}

export const fetchTrendingTVDay = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.TMDB_API_KEY}`,
    { next: { tags: ['trending', 'tv', 'day'], revalidate: 60 * 60 * 24 } }
  )
  return (await res.json()) as MediaData<Movie>
}

export const fetchTopRatedMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`,
    { next: { tags: ['top rated', 'movie'], revalidate: 60 * 5 } }
  )
  return (await res.json()) as MediaData<Movie>
}

export const fetchTopRatedTVShows = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API_KEY}`,
    { next: { tags: ['top rated', 'tv'], revalidate: 60 * 5 } }
  )
  return (await res.json()) as MediaData<TVShow>
}

export const fetchMovieById = async (id: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,
    { next: { tags: ['movie', `${id}`], revalidate: 60 * 60 * 24 } }
  )
  return (await res.json()) as SingleMovie
}

export const fetchTVShowById = async (id: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}`,
    { next: { tags: ['tv', `${id}`], revalidate: 60 * 60 * 24 } }
  )
  return (await res.json()) as SingleTVShow
}

export const fetchQuickSearch = async (query: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${query}`,
    { next: { tags: ['quicksearch', `${query}`], revalidate: 60 * 5 } }
  )
  return (await res.json()) as MediaData<Movie | TVShow>
}

export const fetchSeasonDetails = async (tvId: number, seasonNumber: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${process.env.TMDB_API_KEY}`
  )
  return (await res.json()) as TVSeasonDeatail
}
