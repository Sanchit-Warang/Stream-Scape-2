'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchQuickSearch } from '@/server/data/tmdb'

const useGetQuickSearch = (query: string) => {
  return useQuery({
    queryKey: ['quickSearch', query],
    queryFn: async () => await fetchQuickSearch(query),
  })
}

export default useGetQuickSearch
