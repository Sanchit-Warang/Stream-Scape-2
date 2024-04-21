import axios from 'axios'
import { MediaData, Movie, TVShow, Trailer } from '@/types'
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

export const fetchTrailer = async (id: number, type: 'movie' | 'tv') => {
  const { data } = await axios.get('api/tmdb', {
    params: {
      tmdburl: `${type}/${id}/videos`,
    },
  })
  const videos = data.results
  let trailer = null
  if (videos) {
    trailer = videos.find((video: any) => video.type === 'Trailer')
    if (!trailer) {
      trailer = videos[0]
    }
  }

  return trailer as Trailer
}
