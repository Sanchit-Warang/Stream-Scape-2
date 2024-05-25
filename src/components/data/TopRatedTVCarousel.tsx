import { fetchTopRatedMovies } from '@/server/data/tmdb'
import Carousel from '@/components/Carousel/Carousel'
import SkeletonCarousel from '../ui/Skeletons/SkeletonCarousel'
import { Suspense } from 'react'
const DataTopRatedTVCarousel = async () => {
    const topRatedMovies = await fetchTopRatedMovies()
  return (
    <Carousel
      category="top_rated_movie"
      queryKey={['top rated', 'movie']}
      moviesOrTVShowsMediaData={topRatedMovies}
    />
  )
}

const TopRatedTVCarousel = () => {
  return (
    <div>
      <p className="text-lg font-semibold">Top Rated Movies</p>
      <Suspense fallback={<SkeletonCarousel />}>
        <DataTopRatedTVCarousel />
      </Suspense>
    </div>
  )
}
export default TopRatedTVCarousel
