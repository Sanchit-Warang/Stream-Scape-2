'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchTrailer } from '@/api/tmdb'
import { MediaType } from '@/types'

const useGetTrailer = (id: number, type: MediaType) => {
  return useQuery({
    queryKey: ['trailer', type, id],
    queryFn: () => fetchTrailer(id, type),
  })
}

export default useGetTrailer
