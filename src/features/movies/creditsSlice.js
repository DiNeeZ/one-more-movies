import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { movieService } from '../../services'


const initialState = {
  credits: {},
  status: 'idle',
  errorMsg: ''
}

export const fetchCredits = createAsyncThunk(
  'details/fetchCredits',
  async ({ movieId, mediaType }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const credits = await movieService.getCredits(movieId, mediaType) 

      return fulfillWithValue(credits)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  })

const creditsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setCreditsStatus: (state, action) => {
      state.status = action.payload
    }
  },
  extraReducers: {
    [fetchCredits.pending]: state => {
      state.status = 'loading'
    },
    [fetchCredits.fulfilled]: (state, action) => {
      state.credits = action.payload
      state.status = 'success'
    },
    [fetchCredits.rejected]: (state, action) => {
      state.status = 'error'
      state.errorMsg = action.payload
    },
  }
})

export const getCredits = state => state.credits.credits

export const creditsStatus = state => state.credits.status
export const creditsErrorMsg = state => state.credits.errorMsg

export const { setCreditsStatus } = creditsSlice.actions

export default creditsSlice.reducer