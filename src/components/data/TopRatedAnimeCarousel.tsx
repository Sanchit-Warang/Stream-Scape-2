import { fetchTopRatedAnime } from '@/server/data/tmdb'
import Carousel from '@/components/Carousel/Carousel'
import SkeletonCarousel from '../ui/Skeletons/SkeletonCarousel'
import { Suspense } from 'react'
const DataTopRatedAnimeCarousel = async () => {
  const topRatedAnimeShows = await fetchTopRatedAnime()
  return (
    <Carousel
      category="top_rated_anime"
      queryKey={['top rated', 'anime']}
      moviesOrTVShowsMediaData={topRatedAnimeShows}
    />
  )
}

const TopRatedAnimeCarousel = () => {
  return (
    <div>
      <p className="text-lg font-semibold">Top Rated Anime</p>
      <Suspense fallback={<SkeletonCarousel />}>
        <DataTopRatedAnimeCarousel />
      </Suspense>
    </div>
  )
}
export default TopRatedAnimeCarousel
