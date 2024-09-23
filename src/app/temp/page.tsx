import { fetchAnimeById } from "@/server/data/tmdb"

const TempPage = async  () => {
  const anime = await fetchAnimeById(154587)
  return <>hi this is temp page {anime.id}</>
}

export default TempPage
