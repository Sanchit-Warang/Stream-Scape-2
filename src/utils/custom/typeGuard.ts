import { Movie, SingleMovie, TVShow, SingleTVShow } from '@/types'

export const isMovie = (
  item:
    | Movie
    | SingleMovie
    | TVShow
    | SingleTVShow
    | (SingleTVShow & {
        seasonNumber: number
        episodeNumber: number
      })
): item is Movie | SingleMovie => {
  return 'title' in item
}
