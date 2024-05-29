'use server'
import { db } from '@/lib/db'
import { auth } from '@/auth'
import { fetchMovieById } from './tmdb'
import { SingleMovie } from '@/types'

export const getUserWatchHistoryMovies = async (userId: string) => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    throw new Error('You Need to login')
  }

  if (user.id !== userId) {
    throw new Error('Unauthorized')
  }

  const movies = await db.movieWatchHistory.findMany({
    where: {
      userId: userId,
    },
  })

  return movies
}

export const getUserWatchHistoryMoviesResponse = async (userId: string) => {
  const movies = await getUserWatchHistoryMovies(userId)
  const moviesPromises: Promise<SingleMovie>[] = []
  movies.map((movie) => {
    moviesPromises.push(fetchMovieById(+movie.tmdbId))
  })
  const response = await Promise.all(moviesPromises)
  return response
}
