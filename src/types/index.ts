interface CommonMediaProperties {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
  }
  
  interface Movie extends CommonMediaProperties {
    original_title: string
    release_date: string
    title: string
    video: boolean
  }
  
  interface TVShow extends CommonMediaProperties {
    origin_country: string[]
    original_name: string
    first_air_date: string
    name: string
  }
  
  interface MediaData<T> {
    page: number
    results: T[]
    total_pages: number
    total_results: number
  }
  
  interface Collection {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  
  interface Genre {
    id: number
    name: string
  }
  
  interface ProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }
  
  interface ProductionCountry {
    iso_3166_1: string
    name: string
  }
  
  interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
  }
  
  interface SingleMovie extends Movie {
    belongs_to_collection: Collection
    budget: number
    genres: Genre[]
    homepage: string
    imdb_id: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
  }
  
  interface SingleTVShow extends TVShow {
    // Additional properties specific to a TV show
    homepage: string
    imdb_id: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    genres: Genre[]
  }
  
  export type {
    TVShow,
    Movie,
    MediaData,
    SingleMovie,
    SingleTVShow,
    Collection,
    Genre,
    ProductionCompany,
    ProductionCountry,
    SpokenLanguage,
  }


export type PaginatedParameters = {
  pageParam: number
}

export type Trailer = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};
