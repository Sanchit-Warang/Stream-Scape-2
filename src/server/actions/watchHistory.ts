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
    return {
      msg: 'Movie Already Added to Watch History',
    }
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
