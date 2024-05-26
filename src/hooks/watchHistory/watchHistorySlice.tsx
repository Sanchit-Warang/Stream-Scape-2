'use client'
import { useMutation } from '@tanstack/react-query'
import { addMovieToWatchHistory } from '@/server/actions/watchHistory'

export const useAddMovieToWatchHistoryMutation = (tmdbId: string) => {
  return useMutation({
    mutationFn: () => {
      return addMovieToWatchHistory(tmdbId)
    },
  })
}
