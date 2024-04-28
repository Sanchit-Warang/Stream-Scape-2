import { Modal, ModalBody, ModalContent, ModalProps } from '@nextui-org/modal'
import Trailer from '../Trailer'
import PlayButton from './PlayButton'
import { cn } from '@/utils/tw'
import { Movie, TVShow } from '@/types'
import { title } from 'process'

type TrailerModalProps = {
  entry: Movie | TVShow
} & Omit<ModalProps, 'children' | 'backdrop' | 'closeButton' | 'size'>

const TrailerModal = ({ className, entry, ...props }: TrailerModalProps) => {
  const navigationLink =
    'title' in entry ? `/movie/${entry.id}` : `/tv/${entry.id}/1/1`

  return (
    <Modal
      className={cn('p-0')}
      backdrop="blur"
      size="3xl"
      closeButton={<></>}
      {...props}
    >
      <ModalContent className="p-0 bg-temp">
        {(onClose) => (
          <>
            <ModalBody className="p-0">
              {props.isOpen && (
                <Trailer
                  onClose={onClose}
                  id={entry.id}
                  type={'title' in entry ? 'movie' : 'tv'}
                />
              )}
              <div className="p-3 space-y-4">
                <p className="text-2xl font-bold">
                  {'title' in entry ? entry.title : entry.name}
                </p>
                <div className="flex items-center gap-2 text-sm ">
                  <p className=" font-semibold text-success ">
                    {entry.vote_average.toFixed(1)} Average Votes
                  </p>
                  <span>
                    {'release_date' in entry
                      ? entry.release_date
                      : entry.first_air_date}
                  </span>
                </div>
                <p className="text-xs text-copy-lighter">{entry.overview}</p>
                <PlayButton to={navigationLink} size="sm" />
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default TrailerModal
