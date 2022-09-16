import { configureStore } from '@reduxjs/toolkit'
import detailsReducer from './movies/detailsSlice'
import personReducer from './persons/personSlice'
import creditsReducer from './movies/creditsSlice'
import searchReducer from './search/searchSlice'
import { tmdbSlice } from './api/tmdbSlice'


export const store = configureStore({
  reducer: {
    details: detailsReducer,
    credits: creditsReducer,
    person: personReducer,
    search: searchReducer,
    [tmdbSlice.reducerPath]: tmdbSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbSlice.middleware)
})