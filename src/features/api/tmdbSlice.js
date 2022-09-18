import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, API_KEY } from '../../utils'
import { responseTransformer } from '../helpers'

const transformer = new responseTransformer()

export const tmdbSlice = createApi({
  reducerPath: 'tmdb',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMovie: builder.query({
      query: ({ id, mediaType }) => `${mediaType}/${id}?api_key=${API_KEY}&language=en-US`,
      transformResponse: (res, _, { __, mediaType }) => transformer.transformMovie(res, mediaType)
    }),
    getPopularPersons: builder.query({
      query: () => `person/popular?api_key=${API_KEY}&language=en-US`,
      transformResponse: (res) => transformer.transformPopularPersons(res)
    }),
    getTrending: builder.query({
      query: (type) => `trending/${type}/day?api_key=${API_KEY}`,
      transformResponse: (res) => transformer.transformTrending(res)
    }),
    getUpcoming: builder.query({
      query: () => `movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
      transformResponse: (res) => transformer.transformUpcoming(res)
    }),
    getTrailers: builder.query({
      query: ({ id, mediaType }) => `${mediaType}/${id}/videos?api_key=${API_KEY}`,
      transformResponse: (res) => transformer.transformTrailers(res)
    }),
    getSimilar: builder.query({
      query: ({ id, mediaType }) => `${mediaType}/${id}/similar?api_key=${API_KEY}`,
      transformResponse: (res, _, { __, mediaType }) => transformer.transformSimilar(res, mediaType)
    }),
    getImages: builder.query({
      query: ({ id, mediaType }) => `${mediaType}/${id}/images?api_key=${API_KEY}`,
      transformResponse: (res) => transformer.transformImages(res)
    }),
    getMovieCredits: builder.query({
      query: ({ id, mediaType }) => `${mediaType}/${id}/credits?api_key=${API_KEY}`,
      transformResponse: (res) => transformer.transformCredits(res)
    }),
    getPersonCredits: builder.query({
      query: (id) => `person/${id}?api_key=${API_KEY}&language=en-US&append_to_response=combined_credits`,
      transformResponse: (res) => transformer.transformPersonCredits(res)
    }),
    getSearchResults: builder.query({
      query: (searchQuery, page = 1) =>
        `search/multi?api_key=${API_KEY}&query=${searchQuery}&language=en-US&page=${page}&include_adult=false`,
      transformResponse: (res) => transformer.transformSearchResults(res)
    })
  })
})

export const {
  useGetPopularPersonsQuery,
  useGetTrendingQuery,
  useGetUpcomingQuery,
  useGetTrailersQuery,
  useGetSimilarQuery,
  useGetImagesQuery,
  useGetMovieCreditsQuery,
  useGetMovieQuery,
  useGetPersonCreditsQuery,
  useGetSearchResultsQuery } = tmdbSlice

