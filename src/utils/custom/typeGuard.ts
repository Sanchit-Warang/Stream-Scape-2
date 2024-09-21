import { Movie, SingleMovie, TVShow, SingleTVShow, Anime } from '@/types'

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

export function getMediaType(
  media: Movie | TVShow | Anime
): 'Movie' | 'TV' | 'Anime' {
  if ('original_title' in media) {
    return 'Movie'
  } else if ('original_name' in media) {
    return 'TV'
  } else {
    return 'Anime'
  }
}
