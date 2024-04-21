'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchTrailer } from '@/api/tmdb'
const useGetTrailer = (id: number, type: 'movie' | 'tv') => {
  return useQuery({
    queryKey: ['trailer', type, id],
    queryFn: () => fetchTrailer(id, type),
  })
}

export default useGetTrailer
