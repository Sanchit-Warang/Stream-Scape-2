'use server'
import {
  Movie,
  SingleMovie,
  SingleTVShow,
  MediaData,
  TVShow,
  TVSeasonDeatail,
  Anime,
  Trailer
} from '@/types'
import apolloClient from '@/lib/apollo'
import { gql } from '@apollo/client'
import { PaginatedParameters } from '@/types'

export const fetchTrendingMoviesDay = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`,
    { next: { tags: ['trending', 'movie', 'day'], revalidate: 60 * 5 } }
  )
  return (await res.json()) as MediaData<Movie>
}

export const fetchTrendingTVDay = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.TMDB_API_KEY}`,
    { next: { tags: ['trending', 'tv', 'day'], revalidate: 60 * 5 } }
  )
  return (await res.json()) as MediaData<Movie>
}

export const fetchTopRatedMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`,
    { next: { tags: ['top rated', 'movie'], revalidate: 60 * 5 } }
  )
  return (await res.json()) as MediaData<Movie>
}

export const fetchTopRatedTVShows = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API_KEY}`,
    { next: { tags: ['top rated', 'tv'], revalidate: 60 * 5 } }
  )
  return (await res.json()) as MediaData<TVShow>
}

export const fetchMovieById = async (id: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,
    { next: { tags: ['movie', `${id}`], revalidate: 60 * 5 } }
  )
  return (await res.json()) as SingleMovie
}

export const fetchTVShowById = async (id: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}`,
    { next: { tags: ['tv', `${id}`], revalidate: 60 * 5 } }
  )
  return (await res.json()) as SingleTVShow
}

export const fetchQuickSearch = async (query: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${query}`,
    { next: { tags: ['quicksearch', `${query}`], revalidate: 60 * 5 } }
  )
  return (await res.json()) as MediaData<Movie | TVShow>
}

export const fetchSeasonDetails = async (
  tvId: number,
  seasonNumber: number
) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${process.env.TMDB_API_KEY}`,
    {
      next: {
        tags: ['seasondetails', `${tvId}`, `${seasonNumber}`],
        revalidate: 60 * 5,
      },
    }
  )
  return (await res.json()) as TVSeasonDeatail
}

export const fetchTrendingAnimeDay = async (
  { pageParam }: PaginatedParameters = { pageParam: 1 }
) => {
  const res = await apolloClient.query({
    query: gql`
      query {
        Page(page: ${pageParam}, perPage: 20) {
          pageInfo {
            total # Total number of media entries
            currentPage # Current page number
            lastPage # Total number of pagese
          }
          media(sort: TRENDING_DESC, type: ANIME) {
            id
            title {
              english
            }
            description
            coverImage {
              extraLarge
            }
            bannerImage
            averageScore
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
  })

  const results: Anime[] = res.data.Page.media.map((media: any) => {
    return {
      id: media.id,
      title: media.title.english,
      overview: media.description,
      first_air_date: '2024-09-18',
      bannerImage: media.bannerImage,
      coverImage: media.coverImage.extraLarge,
      vote_average: media.averageScore ? media.averageScore / 10 : 0,
    }
  })

  return {
    page: res.data.Page.pageInfo.currentPage,
    results,
    total_pages: res.data.Page.pageInfo.lastPage,
    total_results: res.data.Page.pageInfo.total,
  } as MediaData<Anime>
}

export const fetchTopRatedAnime = async (
  { pageParam }: PaginatedParameters = { pageParam: 1 }
) => {
  const res = await apolloClient.query({
    query: gql`
      query {
        Page(page: ${pageParam}, perPage: 20) {
          pageInfo {
            total # Total number of media entries
            currentPage # Current page number
            lastPage # Total number of pages
          }
          media(sort: SCORE_DESC, type: ANIME) {  # Sort by top-rated (score descending)
            id
            title {
              english
            }
            description
            coverImage {
              extraLarge
            }
            bannerImage
            averageScore
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
  });

  const results: Anime[] = res.data.Page.media.map((media: any) => {
    return {
      id: media.id,
      title: media.title.english,
      overview: media.description,
      first_air_date: '2024-09-18',  // You can replace this with actual air date if available
      bannerImage: media.bannerImage,
      coverImage: media.coverImage.extraLarge,
      vote_average: media.averageScore ? media.averageScore / 10 : 0,
    };
  });

  return {
    page: res.data.Page.pageInfo.currentPage,
    results,
    total_pages: res.data.Page.pageInfo.lastPage,
    total_results: res.data.Page.pageInfo.total,
  } as MediaData<Anime>;
};



export const fetchAnimeTrailerById = async (id: number) => {
  const res = await apolloClient.query({
    query: gql`
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          trailer {
            id
            site
          }
        }
      }
    `,
    variables: {
      id,
    },
    fetchPolicy: 'no-cache',
  });

  const result = {
    id: res.data.Media.trailer.id,
    site: res.data.Media.trailer.site,
    key: res.data.Media.trailer.id,
  } as Trailer

  return result
}