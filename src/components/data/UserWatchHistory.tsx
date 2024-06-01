'use client'
import {
  useGetUserWatchHistoryMoviesQuery,
  useGetUserWatchHistoryTVShowsQuery,
} from '@/hooks/watchHistory'
import MediaCard from '../ui/MediaCard'
import { useSession } from 'next-auth/react'
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'
import { Pagination } from '@nextui-org/pagination'
import { useState, useEffect } from 'react'

type UserWatchHistoryProps = {
  mediaType: 'movie' | 'tvShow'
}

const UserWatchHistory = ({ mediaType }: UserWatchHistoryProps) => {
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const session = useSession()
  const userId = session.data?.user?.id ? session.data?.user?.id : ''

  // Call both queries unconditionally
  const movieQuery = useGetUserWatchHistoryMoviesQuery(userId, currentPage)
  const tvShowQuery = useGetUserWatchHistoryTVShowsQuery(userId, currentPage)

  // Determine which query to use based on mediaType
  const data = mediaType === 'movie' ? movieQuery.data : tvShowQuery.data
  const isLoading =
    mediaType === 'movie' ? movieQuery.isLoading : tvShowQuery.isLoading
  const error = mediaType === 'movie' ? movieQuery.error : tvShowQuery.error

  useEffect(() => {
    if (data) {
      console.log(totalPages, data.pagination.totalPages)
      if (totalPages !== data.pagination.totalPages) {
        setTotalPages(data.pagination.totalPages)
      }
    }
  }, [data, totalPages])

  const WatchHistoryJSX = () => {
    if (isLoading) {
      const temp = Array.from({ length: 14 })
      return (
        <div className="w-full grid grid-cols-2 md:grid-cols-7 gap-3  md:gap-6">
          {temp.map((t, i) => (
            <Skeleton key={i} className='rounded-lg'>
              <Card className="w-full h-[19.93rem]"></Card>
            </Skeleton>
          ))}
        </div>
      )
    }
    if (error) {
      return <>{error}</>
    }
    if (data) {
      return (
        // <div className="w-full flex gap-3  md:gap-6 flex-wrap">
        <div className="w-full grid grid-cols-2 md:grid-cols-7 gap-3  md:gap-6 flex-wrap">
          {mediaType === 'movie' &&
            'movies' in data &&
            data.movies.map((movie) => (
              <MediaCard key={movie.id} movie={movie} />
            ))}
          {mediaType === 'tvShow' &&
            'tvShows' in data &&
            data.tvShows.map((tvShow) => (
              <MediaCard key={tvShow.id} tv={tvShow} />
            ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-2">
      <p className="text-2xl font-semibold">
        {mediaType === 'movie' ? 'Movie' : 'TV Show'} Watch History
      </p>
      <div className="w-full flex justify-center">
        <Pagination
          color={mediaType === 'movie' ? 'primary' : 'secondary'}
          total={totalPages}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
      {WatchHistoryJSX()}
      <div className="w-full flex justify-center">
        <Pagination
          color={mediaType === 'movie' ? 'primary' : 'secondary'}
          total={totalPages}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default UserWatchHistory
