import Banner from '@/components/Banner'
import Carousel from '@/components/Carousel/Carousel'
import { fetchTrendingMoviesDay, fetchTopRatedMovies } from '@/server/actions/tmdb'

export default async function Home() {
  const trendingMovies = await fetchTrendingMoviesDay()
  const topRatedMovies = await fetchTopRatedMovies()
  return (
    <>
      <Banner movies={trendingMovies.results} />
      <Carousel moviesMediaData={trendingMovies} />
      {/* <Carousel moviesMediaData={topRatedMovies} /> */}
    </>
  )
}
