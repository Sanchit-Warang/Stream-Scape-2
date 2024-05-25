import { Skeleton } from '@nextui-org/skeleton'
const SkeletonCarousel = () => {
  const skeletons = Array.from({ length: 20 })
  return (
    <div className="h-[12.1rem] overflow-hidden no-scrollbar flex gap-2 items-center">
      {skeletons.map((_, index) => (
        <Skeleton key={index} className="h-[9rem] rounded-lg min-w-[17rem]">
          <div className=""></div>
        </Skeleton>
      ))}
    </div>
  )
}

export default SkeletonCarousel
