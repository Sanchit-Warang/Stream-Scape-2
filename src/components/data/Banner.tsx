import { fetchTrendingMoviesDay } from '@/server/data/tmdb'
import RBanner from '../Banner'
import { shuffle } from '@/utils/custom/shuffle'
import { Suspense } from 'react'
import SkeletonBanner from '../ui/Skeletons/SkeletonBanner'

const DataBanner = async () => {
  const trendingMovies = await fetchTrendingMoviesDay()
  return <RBanner movies={shuffle([...trendingMovies.results])} />
}

const Banner = () => {
  return (
    <Suspense fallback={<SkeletonBanner />}>
      <DataBanner />
    </Suspense>
  )
}

export default Banner
