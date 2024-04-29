import { Movie, TVShow } from '@/types'
import { cn } from '@/utils/tw'
import { Image } from '@nextui-org/image'
import { Chip } from '@nextui-org/chip'
import Link from 'next/link'
import { LinkProps } from 'next/link'

type QuickSearchListItemProps = {
  entry: Movie | TVShow
  className?: string
  onClose: () => void
} & Omit<LinkProps, 'href'>

const QuickSearchListItem = ({
  entry,
  className = '',
  onClose,
  ...props
}: QuickSearchListItemProps) => {
  const navigationLink =
    'title' in entry ? `/movie/${entry.id}` : `/tv/${entry.id}/1/1`
  return (
    <Link
      href={navigationLink}
      {...props}
      className={cn(
        'w-full flex gap-3 items-center  p-2 rounded-lg border-1 ',
        'title' in entry ? 'bg-primary/20 border-primary' : 'bg-secondary/20 border-secondary',
        className
      )}
      onClick={() => onClose()}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w92${entry.poster_path}`}
        alt={'title' in entry ? entry.title : entry.name}
        className="min-w-14 max-w-14"
      />
      <p className='truncate text-lg text-copy-light'>{'title' in entry ? entry.title : entry.name}</p>
      <Chip
        size="sm"
        className='ml-auto'
        color={'title' in entry ? 'primary' : 'secondary'}
        variant="shadow"
      >
        {'title' in entry ? 'Movie' : 'TV Show'}
      </Chip>
    </Link>
  )
}

export default QuickSearchListItem
