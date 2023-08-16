import { configureStore } from '@reduxjs/toolkit'

import { tmdbSlice } from './api/tmdbSlice'
import userReducer from './userSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    [tmdbSlice.reducerPath]: tmdbSlice.reducer
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: false
  })
  .concat(tmdbSlice.middleware)
})