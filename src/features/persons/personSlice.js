import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { movieService } from '../../services'

export const fetchPerson = createAsyncThunk(
  'person/fetchPerson',
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const details = await movieService.getPersonDetails(id)
      const credits = await movieService.getCombinedCredits(id)
      const images = await movieService.getPersonImages(id)
      return fulfillWithValue({ details, credits, images })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  })

const initialState = {
  person: {},
  status: 'idle',
  errorMsg: ''
}

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPersonStatus: (state, action) => {
      state.status = action.payload
    }
  },
  extraReducers: {
    [fetchPerson.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchPerson.fulfilled]: (state, action) => {
      const { details, credits, images } = action.payload
      state.status = 'success'
      state.person.details = details
      state.person.credits = credits
      state.person.images = images
    },
    [fetchPerson.rejected]: (state, action) => {
      state.status = 'error'
      state.errorMsg = action.payload
    }
  }
})

export const getPerson = state => state.person.person
export const getPersonImages = state => state.person.person.images
export const getStatus = state => state.person.status
export const getErrorMsg = state => state.person.errorMsg

export const { setPersonStatus } = personSlice.actions

export default personSlice.reducer