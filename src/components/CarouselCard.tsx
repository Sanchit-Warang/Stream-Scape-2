import { Movie, TVShow } from '@/types'
import { Card, Image, Badge, CardFooter } from '@nextui-org/react'
import Trailer from './Trailer'

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'

type CarousalCardProps = {
  entry: Movie | TVShow
}

const CarouselCard = ({ entry }: CarousalCardProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Card
        onClick={onOpen}
        isPressable
        className="overflow-visible min-w-[17rem]"
        isFooterBlurred
      >
        <Badge content={entry.vote_average.toFixed(1)} color="primary">
          <Image
            isBlurred
            isZoomed
            src={`https://image.tmdb.org/t/p/w780${entry.backdrop_path}`}
            alt={`Banner Image of ${
              'title' in entry ? 'TV show' : 'Movie'
            }  : ${'title' in entry ? entry.title : entry.name}`}
          />
        </Badge>
        <CardFooter className="justify-center bg-black/40 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small  z-10">
          <p className="text-xs font-semibold text-white">
            {'title' in entry ? entry.title : entry.name}
          </p>
        </CardFooter>
      </Card>
      <Modal
        className="p-0"
        backdrop="blur"
        size="3xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        closeButton={<></>}
      >
        <ModalContent className="p-0">
          {(onClose) => (
            <>
              <ModalBody className="p-0">
                {isOpen && (
                  <Trailer
                    onClose={onClose}
                    id={entry.id}
                    type={'title' in entry ? 'movie' : 'tv'}
                  />
                )}
                <p className="p-3">{entry.overview}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default CarouselCard
