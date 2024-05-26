import VideoPlayer from '@/components/ui/VideoPlayer'
import { fetchTVShowById, fetchSeasonDetails } from '@/server/data/tmdb'
import { Image } from '@nextui-org/image'
import { Card } from '@nextui-org/card'
import { Chip } from '@nextui-org/chip'
import EpisodeListDrawer from '@/components/ui/EpisodeListDrawer'
import NextImage from 'next/image'
import { TVSeasonDeatail } from '@/types'
const TVShowPage = async ({
  params,
}: {
  params: { tvId: string; season: string; episode: string }
}) => {
  const tv = await fetchTVShowById(+params.tvId)
  const promiseList: Promise<TVSeasonDeatail>[] = []
  // const seasonList: TVSeasonDeatail[] = []
  for (let i = 1; i <= tv.number_of_seasons; i++) {
    const data = fetchSeasonDetails(tv.id, i)
    promiseList.push(data)
  }

  const seasonList = await Promise.all(promiseList)

  return (
    <div>
      <EpisodeListDrawer name={tv.name} seasonList={seasonList} />
      <VideoPlayer
        url={`/embed/tv/${params.tvId}/${params.season}/${params.episode}`}
        backdrop_path={
          seasonList[+params.season - 1].episodes[+params.episode - 1]
            .still_path
        }
        poster_path={
          seasonList[+params.season - 1].episodes[+params.episode - 1]
            .still_path
        }
        tmdbId={tv.id}
        type='tv'
      />
      <div className="m-10 flex gap-5 flex-wrap">
        <div className="w-[100%] md:w-[20%]">
          <Image
            as={NextImage}
            width={20 * 16}
            height={10 * 16}
            isBlurred
            isZoomed
            src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
            alt="Movie Poster"
          />
        </div>
        <Card className="space-y-3 w-[100%] md:w-[78%] bg-temp rounded-lg p-5">
          <h1 className="text-3xl font-bold">{tv.name}</h1>
          <div className="flex items-center gap-2  ">
            <p className=" font-semibold text-success">
              {tv.vote_average} Average Votes
            </p>
            <span>{'release_date' in tv ? tv.release_date : ''}</span>
          </div>
          <p className="text-copy-lighter">{tv.overview}</p>
          <p>Tag Line: {tv.tagline}</p>
          <p>Runtime: {tv.runtime} minutes</p>
          <div>
            Language :{' '}
            <Chip color="warning" variant="shadow">
              {tv.original_language}
            </Chip>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default TVShowPage
