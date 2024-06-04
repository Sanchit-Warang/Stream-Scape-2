'use client'
import { cn } from '@/utils/tw'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import {
  useAddMovieToWatchHistoryMutation,
  useAddTVShowToWatchHistoryMutation,
} from '@/hooks/watchHistory'
import { useSession } from 'next-auth/react'
import { Tabs, Tab } from '@nextui-org/react'

type VideoPlayerPropsBase = {
  url: string
  backdrop_path: string
  poster_path: string
  tmdbId: number
}

type MovieVideoPlayerProps = VideoPlayerPropsBase & {
  type: 'movie'
}

type TVVideoPlayerProps = VideoPlayerPropsBase & {
  type: 'tv'
  season: number
  episode: number
}

type VideoPlayerProps = MovieVideoPlayerProps | TVVideoPlayerProps

const VideoPlayer = ({
  url,
  backdrop_path,
  poster_path,
  tmdbId,
  type,
  ...props
}: VideoPlayerProps) => {
  const [selected, setSelected] = useState<any>(`${process.env.NEXT_PUBLIC_STREAM_URL_1}`);
  const session = useSession()
  const userId = session.data?.user.id ? session.data?.user.id : ''
  const addMovieToWatchHistory = useAddMovieToWatchHistoryMutation()
  const addTVShowToWatchHistory = useAddTVShowToWatchHistoryMutation()
  const matches = useMediaQuery('(max-width: 640px)')
  const [showPlayer, setShowPlayer] = useState(false)
  const bgimage = matches ? poster_path : backdrop_path

  const onPlayButtonClick = async () => {
    setShowPlayer(true)
    if (type === 'movie') {
      await addMovieToWatchHistory.mutateAsync({ userId, tmdbId: `${tmdbId}` })
    }
    if (type == 'tv') {
      const { season, episode } = props as TVVideoPlayerProps
      await addTVShowToWatchHistory.mutateAsync({
        userId,
        tmdbId: `${tmdbId}`,
        season,
        episode,
      })
    }
  }

  return (
    <>
      <div className="w-full h-[80vh]">
        {!showPlayer ? (
          <div className="relative w-full h-full ">
            <div
              className={cn(`w-full h-full  bg-center bg-cover bg-no-repeat `)}
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original${bgimage}')`,
              }}
            ></div>
            <div className="absolute top-0 z-10 bg-gradient-to-t from-background to-background/30 w-full h-full flex justify-center items-center">
              <div>
                <FontAwesomeIcon
                  onClick={() => onPlayButtonClick()}
                  icon={faPlay}
                  className="h-10 w-10"
                  beatFade
                />
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={`${selected}${url}`}
            allowFullScreen
            className="w-full h-full"
            title="Video Player"
          />
        )}
      </div>
      <div className='w-full flex justify-center'>
      <Tabs 
        aria-label="Options"
        className='my-5'    
        size='lg'
        color='primary'     
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key={`${process.env.NEXT_PUBLIC_STREAM_URL_1}`} title="Server 1">
        </Tab>
        <Tab key={`${process.env.NEXT_PUBLIC_STREAM_URL_2}`} title="Server 2"> 
        </Tab>
      </Tabs>
      </div>
    </>
  )
}

export default VideoPlayer
