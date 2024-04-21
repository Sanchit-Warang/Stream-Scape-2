'use client'
import useGetTrailer from '@/hooks/tmdb/useGetTrailer'
import { CircularProgress } from '@nextui-org/react'
import ReactPlayer from 'react-player'
import CloseButton from './ui/CloseButton'
import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faPause,
  faVolumeMute,
  faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons'

type TrailerProps = {
  id: number
  onClose: () => void
  type: 'movie' | 'tv'
}
const Trailer = ({ id, onClose, type }: TrailerProps) => {
  const trailer = useGetTrailer(id, type)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  if (trailer.isLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <CircularProgress />
      </div>
    )
  } else if (trailer.data) {
    return (
      <div className="relative">
        <CloseButton
          className="absolute top-2 right-2 z-10"
          onClick={onClose}
        />
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer.data.key}`}
          className="w-full"
          width={'100%'}
          playing={playing}
          controls={false}
          muted={muted}
        />
        <div className="p-2 flex w-full gap-2 justify-between absolute bottom-0 z-10">
          <Button
            color="primary"
            variant="shadow"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? (
              <>
                <FontAwesomeIcon icon={faPause} /> Pause
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlay} /> Trailer
              </>
            )}
          </Button>
          <Button
            onClick={() => setMuted(!muted)}
            variant="shadow"
            color="primary"
            isIconOnly
          >
            {muted ? (
              <FontAwesomeIcon icon={faVolumeMute} />
            ) : (
              <FontAwesomeIcon icon={faVolumeHigh} />
            )}
          </Button>
        </div>
      </div>
    )
  }
}

export default Trailer
