import Banner from '@/components/Banner'
import Carousel from '@/components/Carousel/Carousel'
import { shuffle } from '@/utils/custom/shuffle'
import {
  fetchTrendingMoviesDay,
  fetchTopRatedMovies,
  fetchTrendingTVDay,
  fetchTopRatedTVShows,
} from '@/server/data/tmdb'

export default async function Home() {
  const trendingMovies = await fetchTrendingMoviesDay()
  const topRatedMovies = await fetchTopRatedMovies()
  const trendingTVShows = await fetchTrendingTVDay()
  const topRatedTVShows = await fetchTopRatedTVShows()
  return (
    <div className="m-7 md:m-16">
      <Banner movies={shuffle([...trendingMovies.results])} />
      <div className="space-y-3">
        <div>
          <p className="text-lg font-semibold">Trending Movies</p>
          <Carousel
            category="trending_movie_day"
            queryKey={['trending', 'movie', 'day']}
            moviesOrTVShowsMediaData={trendingMovies}
          />
        </div>
        <div>
          <p className="text-xl font-semibold">Top Rated Movies</p>
          <Carousel
            category="top_rated_movie"
            queryKey={['top rated', 'movie']}
            moviesOrTVShowsMediaData={topRatedMovies}
          />
        </div>
        <div>
          <p className="text-xl font-semibold">Trending TV</p>
          <Carousel
            category="trending_tv_day"
            queryKey={['trending', 'tv', 'day']}
            moviesOrTVShowsMediaData={trendingTVShows}
          />
        </div>
        <div>
          <p className="text-xl font-semibold">Top Rated TV Shows</p>
          <Carousel
            category="top_rated_tv"
            queryKey={['top rated', 'tv']}
            moviesOrTVShowsMediaData={topRatedTVShows}
          />
        </div>
      </div>
    </div>
  )
}
