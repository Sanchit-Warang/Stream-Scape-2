'use server'
import { db } from '@/lib/db'
import { auth } from '@/auth'
import { fetchMovieById } from './tmdb'
import { SingleMovie } from '@/types'

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
