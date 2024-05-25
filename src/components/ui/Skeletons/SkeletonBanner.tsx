import { Button } from '@nextui-org/button'
import { Skeleton } from '@nextui-org/skeleton'
const SkeletonBanner = () => {
  return (
    <div className="md:w-[50%] rounded-lg space-y-3 mb-3">
      <Skeleton className='rounded-lg'>
        <div className="font-bold text-3xl ">Challengers</div>
      </Skeleton>
      <Skeleton className='rounded-lg'>
        <div className="flex items-center gap-2 text-sm ">
          <p className=" font-semibold text-success ">7.3 Average Votes</p>
          <span>2024-04-18</span>
        </div>
      </Skeleton>
      <Skeleton className='rounded-lg'>
        <div className="text-sm">
          <p className="line-clamp-3">
            Tennis player turned coach Tashi has taken her husband, Art, and
            transformed him into a world-famous Grand Slam champion. To jolt him
            out of his recent losing streak, she signs him up for a Challenger
            event — close to the lowest level of pro tournament — where he finds
            himself standing across the net
          </p>
        </div>
      </Skeleton>
      <div className="flex gap-3">
        <Skeleton className='rounded-lg'>
          <Button size="sm" />
        </Skeleton>
        <Skeleton className='rounded-lg'> 
          <Button size="sm" />
        </Skeleton>
      </div>
    </div>
  )
}

export default SkeletonBanner
