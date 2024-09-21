import TrendingMoviesCarousel from '@/components/data/TrendingMoviesCarousel'
import TopRatedMoviesCarousel from '@/components/data/TopRatedMoviesCarousel'
import TrendingTVCarousel from '@/components/data/TrendingTVCarousel'
import TopRatedTVCarousel from '@/components/data/TopRatedTVCarousel'
import Banner from '@/components/data/Banner'
import { fetchTrendingAnimeDay } from '@/server/data/tmdb'
import TrendingAnimeCarousel from '@/components/data/TrendingAnimeCarousel'
import TopRatedAnimeCarousel from '@/components/data/TopRatedAnimeCarousel'

export default async function Home() {
  const res = await fetchTrendingAnimeDay()
  return (
    <div className="m-7 md:m-16">
      <Banner />
      <div className="space-y-3">
        <TrendingMoviesCarousel />
        <TopRatedMoviesCarousel />
        <TrendingTVCarousel />
        <TopRatedTVCarousel />
        <TrendingAnimeCarousel/>
        <TopRatedAnimeCarousel/>
      </div>
    </div>
  )
}
