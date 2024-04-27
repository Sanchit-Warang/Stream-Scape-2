'use client'
import { cn } from '@/utils/tw'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

type VideoPlayerProps = {
  url: string
  backdrop_path: string
}

const VideoPlayer = ({ url, backdrop_path }: VideoPlayerProps) => {
  const [showPlayer, setShowPlayer] = useState(false)
  return (
    <div className="w-full h-[80vh]">
      {!showPlayer ? (
        <div className="relative w-full h-full ">
          <div
            className={cn(`w-full h-full  bg-center bg-cover bg-no-repeat `)}
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/original${backdrop_path}')`,
            }}
          ></div>
          <div className="absolute top-0 z-10 bg-gradient-to-t from-background to-background/30 w-full h-full flex justify-center items-center">
            <FontAwesomeIcon
              onClick={() => setShowPlayer(true)}
              icon={faPlay}
              className="h-10 w-10"
              beatFade
            />
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
