import { fetchTrendingMoviesDay } from '@/server/actions/tmdb'

export const useFetchMovies = () => {
  return {
    queryKey: ['movies'],
    queryFn: async () => fetchTrendingMoviesDay(),
  }
}
