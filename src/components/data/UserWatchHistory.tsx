'use client'
import { useGetUserWatchHistoryQuery } from '@/hooks/watchHistory'
import MovieCard from '../ui/MovieCard'
import { useSession } from 'next-auth/react'
import { CircularProgress } from '@nextui-org/react'
import { Pagination } from '@nextui-org/pagination'
import { useState, useEffect } from 'react'

const UserWatchHistory = () => {
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const session = useSession()
  const userId = session.data?.user?.id ? session.data?.user?.id : ''
  const getUserWatchHistoryMovies = useGetUserWatchHistoryQuery(
    userId,
    currentPage
  )

  useEffect(() => {
    if (getUserWatchHistoryMovies.data) {
      if (totalPages !== getUserWatchHistoryMovies.data.pagination.totalPages) {
        setTotalPages(getUserWatchHistoryMovies.data.pagination.totalPages)
      }
    }
  }, [getUserWatchHistoryMovies.data, totalPages])

  const MovieHistoryJSX = () => {
    if (getUserWatchHistoryMovies.isLoading) {
      return (
        <div className="w-full flex justify-center">
          <CircularProgress />
        </div>
      )
    }
    if (getUserWatchHistoryMovies.error) {
      return <>{getUserWatchHistoryMovies.error}</>
    }
    if (getUserWatchHistoryMovies.data) {
      return (
        <div className="w-full flex gap-3  md:gap-6 flex-wrap">
          {getUserWatchHistoryMovies.data.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )
    }
  }

  return (
    <div className="space-y-2">
      <p className='text-2xl'>Movie Watch History</p>
      <div className="w-full flex justify-center">
        <Pagination
          total={totalPages}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
      {MovieHistoryJSX()}
      <div className="w-full flex justify-center">
        <Pagination
          total={totalPages}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default UserWatchHistory
