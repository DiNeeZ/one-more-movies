import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { movieService } from '../../services'


const initialState = {
  details: {},
  trailers: [],
  images: [],
  cast: {},
  status: 'idle',
  errorMsg: ''
}

export const fetchDetails = createAsyncThunk(
  'details/fetchDetails',
  async ({ movieId, mediaType }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const details = await movieService.getMediaById(movieId, mediaType)
      const trailers = await movieService.getTrailers(movieId, mediaType)
      const images = await movieService.getBackdropImages(movieId, mediaType)
      const credits = await movieService.getDetailsCredit(movieId, mediaType)

      const data = {
        details, trailers, images, cast: credits.cast
      }

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  })

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setIdleDetails: (state) => {
      state.status = 'idle'
    }
  },
  extraReducers: {
    [fetchDetails.pending]: state => {
      state.status = 'loading'
    },
    [fetchDetails.fulfilled]: (state, action) => {
      state.details = action.payload.details
      state.trailers = action.payload.trailers
      state.images = action.payload.images
      state.cast = action.payload.cast
      state.status = 'success'
    },
    [fetchDetails.rejected]: (state, action) => {
      state.status = 'error'
      state.errorMsg = action.payload
    },
  }
})

export const getDetails = state => state.details.details
export const getTrailers = state => state.details.trailers
export const getImages = state => state.details.images
export const getCast = state => state.details.cast

export const movieDetailStatus = state => state.details.status
export const movieDetailErrorMsg = state => state.details.errorMsg

export const { setIdleDetails } = detailsSlice.actions

export default detailsSlice.reducer