import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, API_KEY } from '../../utils'

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getSearchResults: builder.query({
      query: (searchTerm) => `search/multi?api_key=${API_KEY}&query=${searchTerm}&language=en-US`
    })
  })
})

export const { useGetSearchResultsQuery } = searchApi