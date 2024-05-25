import { fetchTopRatedTVShows } from '@/server/data/tmdb'
import Carousel from '@/components/Carousel/Carousel'
import SkeletonCarousel from '../ui/Skeletons/SkeletonCarousel'
import { Suspense } from 'react'
const DataTrendingTVCarousel = async () => {
  const topRatedTVShows = await fetchTopRatedTVShows()
  return (
    <Carousel
      category="top_rated_tv"
      queryKey={['top rated', 'tv']}
      moviesOrTVShowsMediaData={topRatedTVShows}
    />
  )
}

const TrendingTVCarousel = () => {
  return (
    <div>
      <p className="text-lg font-semibold">Trending TV</p>
      <Suspense fallback={<SkeletonCarousel />}>
        <DataTrendingTVCarousel />
      </Suspense>
    </div>
  )
}
export default TrendingTVCarousel
