'use client'
import PlayButton from '../ui/PlayButton'
import { useGetIfTVShowIsInWatchHistoryQuery } from '@/hooks/watchHistory'
import { useSession } from 'next-auth/react'

type TvShowWatchButtonProps = {
  tvid: number
}

const TvShowWatchButton = ({ tvid }: TvShowWatchButtonProps) => {
  const session = useSession()
  const userId = session.data?.user.id ? session.data?.user.id : ''
  const query = useGetIfTVShowIsInWatchHistoryQuery(userId, `${tvid}`)

  if (query.isLoading && !query.data) {
    return <PlayButton to={`/tv/${tvid}`} size="sm" isDisabled={true} />
  }
  return (
    <PlayButton
      to={`/tv/${tvid}/${query.data?.seasonNumber}/${query.data?.episodeNumber}`}
      size="sm"
    />
  )
}

export default TvShowWatchButton
