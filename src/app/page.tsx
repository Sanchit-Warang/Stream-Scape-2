import Banner from "@/components/Banner";
import Carousal from "@/components/Carousal/Carousal";
import { fetchTrendingMoviesDay } from "@/server/actions/fetchMovies";

export default async function Home() {
  const trendingMovies =  await fetchTrendingMoviesDay()
  return (
    <>
      <Banner movies={trendingMovies.results}/>
      <Carousal movies={trendingMovies.results}/>
    </>
  );
}
