'use server'
import { db } from '@/lib/db'
import { auth } from '@/auth'
import wait from '@/utils/custom/wait'

export const addMovieToWatchHistory = async (
  userId: string,
  tmdbId: string
) => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    throw new Error('You Need to login')
  }

  if (user.id !== userId) {
    throw new Error('Unauthorized')
  }

  const movie = await db.movieWatchHistory.findFirst({
    where: {
      tmdbId: tmdbId,
      userId: user.id,
    },
  })

  if (movie) {
    throw new Error('Movie Already Added to Watch History')
  }

  await db.movieWatchHistory.create({
    data: {
      tmdbId: tmdbId,
      userId: user.id ? user.id : '',
    },
  })

  return {
    msg: 'Movie Added to Watch History',
  }
}

export const addTVShowToWatchHistory = async (
  userId: string,
  tmdbId: string,
  season: number,
  episode: number
) => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    throw new Error('You Need to login')
  }

  if (user.id !== userId) {
    throw new Error('Unauthorized')
  }

  let tvShow = await db.tVWatchHistory.findFirst({
    where: {
      tmdbId: tmdbId,
      seasonNumber: season,
      episodeNumber: episode,
      userId: user.id,
    },
  })

  if (tvShow) {
    throw new Error('TV Show Already in to Watch History')
  }

  tvShow = await db.tVWatchHistory.findFirst({
    where: {
      tmdbId: tmdbId,
      userId: user.id,
    },
  })

  if (tvShow) {
    await db.tVWatchHistory.update({
      where: {
        id: tvShow.id,
      },
      data: {
        seasonNumber: season,
        episodeNumber: episode,
      },
    })
    return {
      msg: 'TV Show Watch History Updated',
    }
  }

  // If the TV show does not exist, create a new record
  await db.tVWatchHistory.create({
    data: {
      tmdbId: tmdbId,
      userId: user.id ? user.id : '',
      seasonNumber: season,
      episodeNumber: episode,
    },
  })
  return {
    msg: 'TV Show Added to Watch History',
  }
}

export const deleteMovieFromWatchHistory = async (
  userId: string,
  tmdbId: string
) => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    throw new Error('You Need to login')
  }

  if (user.id !== userId) {
    throw new Error('Unauthorized')
  }

  const movie = await db.movieWatchHistory.findFirst({
    where: {
      tmdbId: tmdbId,
      userId: user.id,
    },
  })

  if (!movie) {
    throw new Error('Movie Not Found in Watch History')
  }

  await wait(1000)

  await db.movieWatchHistory.delete({
    where: {
      id: movie.id,
    },
  })

  return {
    msg: 'Movie Removed from Watch History',
  }
}

export const deleteTVShowFromWatchHistory = async (
  userId: string,
  tmdbId: string
) => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    throw new Error('You Need to login')
  }

  if (user.id !== userId) {
    throw new Error('Unauthorized')
  }

  const tvShow = await db.tVWatchHistory.findFirst({
    where: {
      tmdbId: tmdbId,
      userId: user.id,
    },
  })

  if (!tvShow) {
    throw new Error('TV Show Not Found in Watch History')
  }

  await db.tVWatchHistory.delete({
    where: {
      id: tvShow.id,
    },
  })

  return {
    msg: 'TV Show Removed from Watch History',
  }
}
