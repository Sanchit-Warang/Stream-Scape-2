'use client'
import { useMutation } from '@tanstack/react-query'
import {
  addMovieToWatchHistory,
  addTVShowToWatchHistory,
} from '@/server/actions/watchHistory'

export const useAddMovieToWatchHistoryMutation = () => {
  return useMutation({
    mutationFn: ({tmdbId}:{tmdbId: string}) => {
      return addMovieToWatchHistory(tmdbId)
    },
  })
}

export const useAddTVShowToWatchHistoryMutation = () => {
  return useMutation({
    mutationFn: ({
      tmdbId,
      season,
      episode,
    }: {
      tmdbId: string
      season: number
      episode: number
    }) => {
      return addTVShowToWatchHistory(tmdbId, season, episode)
    },
  })
}
