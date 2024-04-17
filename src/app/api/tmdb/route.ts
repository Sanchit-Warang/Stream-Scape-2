import axios from 'axios'
import { MediaData, Movie } from '@/types'

export async function GET(request: Request) {
  const url = new URL(request.url ? request.url : '')
  const page = url.searchParams.get('page')
  const tmdburl = url.searchParams.get('tmdburl')
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${tmdburl}?api_key=${
      process.env.TMDB_API_KEY
    }&page=${page ? page : 1}`
  )
  return new Response(JSON.stringify(data as MediaData<Movie>))
}
