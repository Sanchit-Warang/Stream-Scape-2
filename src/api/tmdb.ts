import axios from 'axios'
import { MediaData, Movie, TVShow } from '@/types'
import { PaginatedParameters } from '@/types'

export const fetchPaginatedTrendingMoviesDay = async ({
  pageParam,
}: PaginatedParameters) => {
  const { data } = await axios.get('api/tmdb', {
    params: {
      page: pageParam,
      tmdburl: 'trending/movie/day',
    },
  })
  return data as MediaData<Movie>
}

export const fetchPaginatedTopRatedMovies = async ({
  pageParam,
}: PaginatedParameters) => {
  const { data } = await axios.get('api/tmdb', {
    params: {
      page: pageParam,
      tmdburl: 'movie/top_rated',
    },
  })
  return data as MediaData<Movie>
}

export const fetchPaginatedTrendingTVDay = async ({
  pageParam,
}: PaginatedParameters) => {
  const { data } = await axios.get('api/tmdb', {
    params: {
      page: pageParam,
      tmdburl: 'trending/tv/day',
    },
  })
  return data as MediaData<Movie>
}

export const fetchPaginatedTopRatedTVShows = async ({
  pageParam,
}: PaginatedParameters) => {
  const { data } = await axios.get('api/tmdb', {
    params: {
      page: pageParam,
      tmdburl: 'tv/top_rated',
    },
  })
  return data as MediaData<TVShow>
}