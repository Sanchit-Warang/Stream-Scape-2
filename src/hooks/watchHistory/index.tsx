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
  deleteMovieFromWatchHistory,
  deleteTVShowFromWatchHistory,
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

export const useAddMovieToWatchHistoryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, tmdbId }: { tmdbId: string; userId: string }) => {
      return addMovieToWatchHistory(userId, tmdbId)
    },
    onSuccess: (_error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['watchHistoryMovies', variables.userId],
      })
    },
  })
}

export const useAddTVShowToWatchHistoryMutation = (
) => {
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
    onSuccess: (_err, variables) => {
      queryClient.invalidateQueries({ queryKey: ['watchHistoryTVShows'] })
      queryClient.invalidateQueries({
        queryKey: ['ifTVShowIsInWatchHistory', variables.userId, variables.tmdbId],
      })
    },
  })
}

export const useDeleteMovieFromWatchHistoryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, tmdbId }: { tmdbId: string; userId: string, page:number }) => {
      return deleteMovieFromWatchHistory(userId, tmdbId)
    },
    onMutate: async ({ userId, tmdbId, page }) => {
      await queryClient.cancelQueries({
        queryKey: ['watchHistoryMovies', userId],
      })
      const previousData = queryClient.getQueryData([
        'watchHistoryMovies',
        userId,
        page
      ])
      queryClient.setQueryData(['watchHistoryMovies', userId, page], (old: any) => {
        console.log('Sanchit', old)
        return {
          ...old,
          movies: old.movies.filter((movie: any) => movie.tmdbId !== tmdbId),
        }
      })
      return { previousData }
    },
    onError: (_err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['watchHistoryMovies', variables.userId, variables.page],
          context.previousData
        )
      }
    },
    onSettled: (_res, _err, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['watchHistoryMovies', variables.userId],
      })
    },
  })
}






export const useDeleteTVShowFromWatchHistoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, tmdbId }: { tmdbId: string; userId: string, page:number }) => {
      return deleteTVShowFromWatchHistory(userId, tmdbId)
    },
    onMutate: async ({ userId, tmdbId, page }) => {
      // Cancel any ongoing queries for watch history TV shows
      await queryClient.cancelQueries({
        queryKey: ['watchHistoryTVShows', userId],
      })

      // Get the previous watch history TV shows data
      const previousData = queryClient.getQueryData([
        'watchHistoryTVShows',
        userId,
        page
      ])

      // Optimistically remove the TV show from the watch history list
      queryClient.setQueryData(
        ['watchHistoryTVShows', userId, page],
        (oldData: any) => {
          if (!oldData) return null
          return {
            ...oldData,
            tvShows: oldData.tvShows.filter(
              (tvShow: any) => tvShow.tmdbId !== tmdbId
            ),
          }
        }
      )

      // Return the previous data for rollback in case of failure
      return { previousData }
    },
    onError: (_err, variables, context) => {
      // Rollback to the previous data on error
      if (context?.previousData) {
        queryClient.setQueryData(
          ['watchHistoryTVShows', variables.userId, variables.page],
          context.previousData
        )
      }
    },
    onSettled: (_res, _err, variables) => {
      // Invalidate the query to refetch the updated watch history TV shows
      queryClient.invalidateQueries({
        queryKey: ['watchHistoryTVShows', variables.userId],
      })

      // Invalidate the query for checking if the TV show is in the watch history
      queryClient.invalidateQueries({
        queryKey: ['ifTVShowIsInWatchHistory', variables.userId, variables.tmdbId],
      })
    },
  })
}
