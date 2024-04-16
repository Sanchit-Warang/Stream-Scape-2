import axios from 'axios'
import { MediaData, Movie } from '@/types'
export const fetchPaginatedTrendingMoviesDay = async ({
  pageParam,
}: {
  pageParam: number
}) => {
  const { data } = await axios.get('api/tmdb', {
    params: {
      page: pageParam,
    },
  })
  return data as MediaData<Movie>
}
