'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getUserWatchHistoryMoviesResponse,
  getUserWatchHistoryTVShowsResponse,
  getIfTVShowIsInWatchHistory,
} from '@/server/data/watchHistory'
import {
  addMovieToWatchHistory,
  addTVShowToWatchHistory,
} from '@/server/actions/watchHistory'

export const useGetUserWatchHistoryMoviesQuery = (
  userId: string,
  page: number
) => {
  return useQuery({
    queryKey: ['watchHistoryMovies', userId, page],
    queryFn: () => {
      return getUserWatchHistoryMoviesResponse(userId, page)
    },
  })
}

export const useGetUserWatchHistoryTVShowsQuery = (
  userId: string,
  page: number
) => {
  return useQuery({
    queryKey: ['watchHistoryTVShows', userId, page],
    queryFn: () => {
      return getUserWatchHistoryTVShowsResponse(userId, page)
    },
  })
}

export const useGetIfTVShowIsInWatchHistoryQuery = (
  userId: string,
  tmdbId: string
) => {
  return useQuery({
    queryKey: ['ifTVShowIsInWatchHistory', userId, tmdbId],
    queryFn: () => {
      return getIfTVShowIsInWatchHistory(userId, tmdbId)
    },
  })
}

export const useAddMovieToWatchHistoryMutation = (userId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, tmdbId }: { tmdbId: string; userId: string }) => {
      return addMovieToWatchHistory(userId, tmdbId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchHistoryMovies'] })
    },
  })
}

export const useAddTVShowToWatchHistoryMutation = (userId: string, tmdbId:string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      userId,
      tmdbId,
      season,
      episode,
    }: {
      userId: string
      tmdbId: string
      season: number
      episode: number
    }) => {
      return addTVShowToWatchHistory(userId, tmdbId, season, episode)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchHistoryTVShows'] })
      queryClient.invalidateQueries({ queryKey: ['ifTVShowIsInWatchHistory'] })
    },
  })
}
