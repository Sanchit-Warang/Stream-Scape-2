import { Movie, TVShow } from '@/types'
import {
  Card,
  Image,
  Badge,
  CardFooter,
  useDisclosure,
} from '@nextui-org/react'
import TrailerModal from '../ui/TrailerModal'

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
        <Badge
          content={entry.vote_average.toFixed(1)}
          color="warning"
          variant="shadow"
        >
          <Image
            // as={NextImage}
            isBlurred
            isZoomed
            // width={17 * 16}
            // height={9.5 * 16}
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
      <TrailerModal isOpen={isOpen} onOpenChange={onOpenChange} entry={entry} />
    </>
  )
}

export default CarouselCard
