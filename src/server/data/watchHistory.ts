'use server'
import { db } from '@/lib/db'
import { auth } from '@/auth'
import { fetchMovieById, fetchTVShowById } from './tmdb'
import { SingleMovie, SingleTVShow } from '@/types'

//Movies

export const getUserWatchHistoryMovies = async (
  userId: string,
  page: number
) => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    throw new Error('You Need to login')
  }

  if (user.id !== userId) {
    throw new Error('Unauthorized')
  }

  const pageSize = 14

  // Calculate offset and limit for pagination
  const offset = (page - 1) * pageSize

  const movies = await db.movieWatchHistory.findMany({
    where: {
      userId: userId,
    },
    skip: offset,
    take: pageSize,
  })

  // Optional: Get the total count of movies for the user to return with the response
  const totalCount = await db.movieWatchHistory.count({
    where: {
      userId: userId,
    },
  })

  return {
    movies,
    pagination: {
      totalItems: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
      pageSize: pageSize,
    },
  }
}

export const getUserWatchHistoryMoviesResponse = async (
  userId: string,
  page: number
) => {
  const data = await getUserWatchHistoryMovies(userId, page)
  const moviesPromises: Promise<SingleMovie>[] = []
  data.movies.map((movie) => {
    moviesPromises.push(fetchMovieById(+movie.tmdbId))
  })
  const response = await Promise.all(moviesPromises)

  return {
    movies: response,
    pagination: data.pagination,
  }
}

//TVShows

export const getUserWatchHistoryTVShows = async (
  userId: string,
  page: number
) => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    throw new Error('You need to login')
  }

  if (user.id !== userId) {
    throw new Error('Unauthorized')
  }

  const pageSize = 14

  // Calculate offset and limit for pagination
  const offset = (page - 1) * pageSize

  const tvShows = await db.tVWatchHistory.findMany({
    where: {
      userId: userId,
    },
    skip: offset,
    take: pageSize,
  })

  // Optional: Get the total count of TV shows for the user to return with the response
  const totalCount = await db.tVWatchHistory.count({
    where: {
      userId: userId,
    },
  })

  return {
    tvShows,
    pagination: {
      totalItems: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
      pageSize: pageSize,
    },
  }
}

export const getUserWatchHistoryTVShowsResponse = async (
  userId: string,
  page: number
) => {
  const data = await getUserWatchHistoryTVShows(userId, page)
  const tvShowsPromises: Promise<SingleTVShow>[] = []
  data.tvShows.map((tvShow) => {
    tvShowsPromises.push(fetchTVShowById(+tvShow.tmdbId))
  })
  const response = await Promise.all(tvShowsPromises)

  const tvShowsWithDetails = response.map((tvShow, index) => ({
    ...tvShow,
    seasonNumber: data.tvShows[index].seasonNumber,
    episodeNumber: data.tvShows[index].episodeNumber,
  }))

  return {
    tvShows: tvShowsWithDetails,
    pagination: data.pagination,
  }
}

export const getIfTVShowIsInWatchHistory = async (
  userId: string,
  tvShowId: string
) => {
  const session = await auth()
  const user = session?.user
  if (!user) {
    throw new Error('You need to login')
  }

  if (user.id !== userId) {
    throw new Error('Unauthorized')
  }

  const tvShow = await db.tVWatchHistory.findFirst({
    where: {
      userId: userId,
      tmdbId: `${tvShowId}`,
    },
  })

  if (!tvShow) {
    return {
      isInWatchHistory: false,
      seasonNumber: 1,
      episodeNumber: 1,
    }
  }

  return {
    isInWatchHistory: true,
    seasonNumber: tvShow.seasonNumber,
    episodeNumber: tvShow.episodeNumber,
  }

}
