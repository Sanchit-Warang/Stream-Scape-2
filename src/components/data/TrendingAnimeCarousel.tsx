import { fetchTrendingAnimeDay } from '@/server/data/tmdb'
import Carousel from '@/components/Carousel/Carousel'
import SkeletonCarousel from '../ui/Skeletons/SkeletonCarousel'
import { Suspense } from 'react'
const DataTrendingAnimeCarousel = async () => {
  const trendingAnimeShows = await fetchTrendingAnimeDay()
  return (
    <Carousel
      category="trending_anime_day"
      queryKey={['trending', 'anime', 'day']}
      moviesOrTVShowsMediaData={trendingAnimeShows}
    />
  )
}

const TrendingAnimeCarousel = () => {
  return (
    <div>
      <p className="text-lg font-semibold">Trending Anime</p>
      <Suspense fallback={<SkeletonCarousel />}>
        <DataTrendingAnimeCarousel />
      </Suspense>
    </div>
  )
}
export default TrendingAnimeCarousel
