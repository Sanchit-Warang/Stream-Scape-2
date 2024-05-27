import { Skeleton } from '@nextui-org/skeleton'
import { Image } from '@nextui-org/image'
import { Card } from '@nextui-org/card'
import VideoPlayer from '@/components/ui/VideoPlayer'
import NextImage from 'next/image'
const TVShowPageLoading = () => {
  return (
    <>
      <Skeleton>
        <VideoPlayer url={`TEMP`} backdrop_path={`TEMP`} poster_path={`TEMP`} type='movie' tmdbId={1}/>
      </Skeleton>
      <div className="m-10 flex gap-5 flex-wrap">
        <Skeleton className="h-[25rem]">
          <div className="w-[100%]  md:w-[20%]">
            <Image
              as={NextImage}
              width={20 * 16}
              height={10 * 16}
              isBlurred
              isZoomed
              src={`https://image.tmdb.org/t/p/original`}
              alt="Movie Poster"
            />
          </div>
        </Skeleton>
        <Skeleton className="h-[25rem] w-[100%] md:w-[75%]">
          <Card className="space-y-3 w-[100%] md:w-[78%] bg-temp rounded-lg p-5"></Card>
        </Skeleton>
      </div>
    </>
  )
}

export default TVShowPageLoading
