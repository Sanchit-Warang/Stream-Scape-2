import UserWatchHistory from '@/components/data/UserWatchHistory'
import { Divider } from '@nextui-org/divider'
const HistoryPage = () => {
  return (
    <>
      <div className="m-10">
        <UserWatchHistory mediaType="movie" />
      </div>
      <Divider />
      <div className="m-10">
        <UserWatchHistory mediaType="tvShow" />
      </div>
    </>
  )
}

export default HistoryPage
