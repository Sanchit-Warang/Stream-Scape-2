'use client'
import { useGetUserWatchHistoryQuery } from '@/hooks/watchHistory'
import { useSession } from 'next-auth/react'

const UserWatchHistory = () => {
  const session = useSession()
  const userId = session.data?.user?.id ? session.data?.user?.id : ''
  const getUserWatchHistoryMovies = useGetUserWatchHistoryQuery(userId)
  return (
    <div>
      {getUserWatchHistoryMovies.data
        ? JSON.stringify(getUserWatchHistoryMovies.data)
        : 'No Data'}
    </div>
  )
}

export default UserWatchHistory
