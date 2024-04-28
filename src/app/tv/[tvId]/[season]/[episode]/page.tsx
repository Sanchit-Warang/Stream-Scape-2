import VideoPlayer from '@/components/ui/VideoPlayer'
import { fetchTVShowById } from '@/server/data/tmdb'
import { Image } from '@nextui-org/image'
import { Card } from '@nextui-org/card'
import { Chip } from '@nextui-org/chip'
import NextImage from 'next/image'
const TVShowPage = async ({
  params,
}: {
  params: { tvId: string; season: string; episode: string }
}) => {
  const tv = await fetchTVShowById(+params.tvId)
  return (
    <div>
      <VideoPlayer
        url={`/embed/tv/${params.tvId}`}
        backdrop_path={tv.backdrop_path}
        poster_path={tv.poster_path}
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
