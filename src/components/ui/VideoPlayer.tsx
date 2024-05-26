'use client'
import { cn } from '@/utils/tw'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import { useAddMovieToWatchHistoryMutation } from '@/hooks/watchHistory/watchHistorySlice'

type VideoPlayerProps = {
  url: string
  backdrop_path: string
  poster_path: string
  tmdbId: number
  type: 'movie' | 'tv'
}

const VideoPlayer = ({
  url,
  backdrop_path,
  poster_path,
  tmdbId,
  type,
}: VideoPlayerProps) => {
  const addMovieToWatchHistory = useAddMovieToWatchHistoryMutation(`${tmdbId}`)
  const matches = useMediaQuery('(max-width: 640px)')
  const [showPlayer, setShowPlayer] = useState(false)
  const bgimage = matches ? poster_path : backdrop_path

  const onPlayButtonClick = async() => {
    setShowPlayer(true)
    if(type === 'movie'){
      await addMovieToWatchHistory.mutateAsync()
    }
  }

  return (
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
          // src={`${process.env.STREAM_URL}/embed/movie/${params.movieid}`}
          src={`${process.env.NEXT_PUBLIC_STREAM_URL}${url}`}
          allowFullScreen
          className="w-full h-full"
          title="Video Player"
        />
      )}
    </div>
  )
}

export default VideoPlayer
