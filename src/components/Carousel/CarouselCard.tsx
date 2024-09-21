import { Anime, Movie, TVShow } from '@/types'
import {
  Card,
  Image,
  Badge,
  CardFooter,
  useDisclosure,
} from '@nextui-org/react'
import TrailerModal from '../ui/TrailerModal'

type CarousalCardProps = {
  entry: Movie | TVShow | Anime
}

const CarouselCard = ({ entry }: CarousalCardProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const backdrop =
    'backdrop_path' in entry
      ? `https://image.tmdb.org/t/p/w780${entry.backdrop_path}`
      : entry.bannerImage
      ? entry.bannerImage
      : 'https://www.beautylabinternational.com/wp-content/uploads/2020/03/Hero-Banner-Placeholder-Light-1024x480-1.png'

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
            src={backdrop}
            alt={`Banner Image of  ${
              'title' in entry ? entry.title : entry.name
            }`}
            className="aspect-video"
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
