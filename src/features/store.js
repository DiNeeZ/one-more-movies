import { configureStore } from '@reduxjs/toolkit'

import { tmdbSlice } from './api/tmdbSlice'


export const store = configureStore({
  reducer: {
    [tmdbSlice.reducerPath]: tmdbSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbSlice.middleware)
})