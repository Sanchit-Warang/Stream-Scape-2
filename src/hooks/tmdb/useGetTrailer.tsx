'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchTrailer, fetchAnimeTrailerById } from '@/server/data/tmdb'
import { MediaType } from '@/types'

const useGetTrailer = (id: number, type: MediaType) => {
  return useQuery({
    queryKey: ['trailer', type, id],
    queryFn: () => {
      if (type === 'TV' || type === 'Movie') {
        return fetchTrailer(id, type)
      }
      return fetchAnimeTrailerById(id)
    },
  })
}

export default useGetTrailer
