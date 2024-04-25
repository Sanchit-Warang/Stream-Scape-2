import { fetchTrendingMoviesDay } from '@/server/data/tmdb'

export const useFetchMovies = () => {
  return {
    queryKey: ['movies'],
    queryFn: async () => fetchTrendingMoviesDay(),
  }
}
