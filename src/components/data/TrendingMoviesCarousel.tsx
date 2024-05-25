import { fetchTrendingMoviesDay } from '@/server/data/tmdb'
import Carousel from '@/components/Carousel/Carousel'
import SkeletonCarousel from '../ui/Skeletons/SkeletonCarousel'
import { Suspense } from 'react'
const DataTrendingMoviesCarousel = async () => {
  const trendingMovies = await fetchTrendingMoviesDay()
  return (
    <Carousel
      category="trending_movie_day"
      queryKey={['trending', 'movie', 'day']}
      moviesOrTVShowsMediaData={trendingMovies}
    />
  )
}

const TrendingMoviesCarousel = () => {
  return (
    <div>
      <p className="text-lg font-semibold">Trending Movies</p>
      <Suspense fallback={<SkeletonCarousel />}>
        <DataTrendingMoviesCarousel />
      </Suspense>
    </div>
  )
}
export default TrendingMoviesCarousel
