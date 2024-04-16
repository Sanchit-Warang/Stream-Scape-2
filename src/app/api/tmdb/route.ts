import axios from 'axios'
import { MediaData, Movie } from '@/types'
import { NextApiRequest } from 'next'

export async function GET(request: NextApiRequest) {
  const url = new URL(request.url ? request.url : '')
  const page = url.searchParams.get('page')
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${
      process.env.TMDB_API_KEY
    }&page=${page ? page : 1}`
  )
  return new Response(JSON.stringify(data as MediaData<Movie>))
}
