import { Movie, TVShow } from '@/types'
import { cn } from '@/utils/tw'
import { Image } from '@nextui-org/image'
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
      className={cn('w-full flex gap-5 items-center', className)}
      onClick={() => onClose()}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w92${entry.poster_path}`}
        alt={'title' in entry ? entry.title : entry.name}
        className="w-12"
      />
      <p>{'title' in entry ? entry.title : entry.name}</p>
    </Link>
  )
}

export default QuickSearchListItem
