import VideoPlayer from '@/components/ui/VideoPlayer'
import {  fetchAnimeRelations } from '@/server/data/tmdb'
import { Image } from '@nextui-org/image'
import { Card } from '@nextui-org/card'
import EpisodeListDrawer from '@/components/ui/EpisodeListDrawer'
import NextImage from 'next/image'
import { fetchAnimeById } from '@/server/data/tmdb'

const AnimePage = async ({
  params,
}: {
  params: { animeId: string; episode: string; type: string }
}) => {
  const anime = await fetchAnimeById(+params.animeId)

  const relationAnime = await fetchAnimeRelations(+params.animeId)

  if (!anime.episodes || !anime.streamingEpisodes) {
    return (
      <div>
        <p>no data</p>
      </div>
    )
  }

  const subdub = params.type === '0' || params.type === '1' ? params.type : '0' 

  const image =
    anime.streamingEpisodes?.length > 0
      ? anime.streamingEpisodes[+params.episode - 1].thumbnail
      : ''

  return (
    <div>
      <EpisodeListDrawer
        name={anime.title}
        animeEpisodeList={anime.streamingEpisodes}
        totalAnimeEpisodes={anime.episodes}
        relatedAnime={relationAnime}
      />
      <VideoPlayer
        url={`/embed/anime/${params.animeId}/${params.episode}/${subdub}`}
        backdrop_path={image}
        poster_path={image}
        tmdbId={anime.id}
        type="Anime"
        episode={+params.episode}
      />
      <div className="m-10 flex gap-5 flex-wrap">
        <div className="w-[100%] md:w-[20%]">
          <Image
            as={NextImage}
            width={20 * 16}
            height={10 * 16}
            isBlurred
            isZoomed
            src={`${anime.posterImage}`}
            alt="Movie Poster"
          />
        </div>
        <Card className="space-y-3 w-[100%] md:w-[78%] bg-temp rounded-lg p-5">
          <h1 className="text-3xl font-bold">{anime.title}</h1>
          <div className="flex items-center gap-2  ">
            <p className=" font-semibold text-success">
              {anime.vote_average} Average Votes
            </p>
            <span>{anime.first_air_date}</span>
          </div>
          <p
            className="text-copy-lighter"
            dangerouslySetInnerHTML={{ __html: anime.overview }}
          ></p>
        </Card>
      </div>
    </div>
  )
}

export default AnimePage
