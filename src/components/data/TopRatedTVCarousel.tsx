import { fetchTopRatedTVShows } from '@/server/data/tmdb'
import Carousel from '@/components/Carousel/Carousel'
import SkeletonCarousel from '../ui/Skeletons/SkeletonCarousel'
import { Suspense } from 'react'
const DataTopRatedTVCarousel = async () => {
  const topRatedTVShows = await fetchTopRatedTVShows()
  return (
    <Carousel
      category="top_rated_tv"
      queryKey={['top rated', 'tv']}
      moviesOrTVShowsMediaData={topRatedTVShows}
    />
  )
}

const TopRatedTVCarousel = () => {
  return (
    <div>
      <p className="text-lg font-semibold">Top Rated TV Shows</p>
      <Suspense fallback={<SkeletonCarousel />}>
        <DataTopRatedTVCarousel />
      </Suspense>
    </div>
  )
}
export default TopRatedTVCarousel
