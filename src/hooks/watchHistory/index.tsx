'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getUserWatchHistoryMoviesResponse } from '@/server/data/watchHistory'
import {
  addMovieToWatchHistory,
  addTVShowToWatchHistory,
} from '@/server/actions/watchHistory'


export const useGetUserWatchHistoryQuery = (userId: string, page: number) => {
  return useQuery({
    queryKey: ['watchHistory', userId, page],
    queryFn: () => {
      return getUserWatchHistoryMoviesResponse(userId, page)
    },
  })
}

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
