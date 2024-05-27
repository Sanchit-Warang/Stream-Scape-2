'use server'
import { db } from '@/lib/db'
import { auth } from '@/auth'

export const addMovieToWatchHistory = async (tmdbId: string) => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    throw new Error('You Need to login')
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
  tmdbId: string,
  season: number,
  episode: number
) => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    throw new Error('You Need to login')
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
