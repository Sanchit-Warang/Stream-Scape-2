import { fetchTrendingTVDay } from '@/server/data/tmdb'
import Carousel from '@/components/Carousel/Carousel'
import SkeletonCarousel from '../ui/Skeletons/SkeletonCarousel'
import { Suspense } from 'react'
const DataTrendingTVCarousel = async () => {
  const trendingTVShows = await fetchTrendingTVDay()
  return (
    <Carousel
      category="trending_tv_day"
      queryKey={['trending', 'tv', 'day']}
      moviesOrTVShowsMediaData={trendingTVShows}
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
