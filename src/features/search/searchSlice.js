import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { movieService } from '../../services'



const initialState = {
  results: [],
  currentPage: 1,
  totalPages: null,
  status: 'idle',
  errorMsg: ''
}

export const fetchResults = createAsyncThunk(
  'search/fetchResults',
  async (query, page) => {
    const results = await movieService.getSearchResult(query, page)
    console.log(results)
    return results

  })

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchResults.pending]: (state) => {
      state.status = 'loading'
      state.errorMsg = null
    },
    [fetchResults.fulfilled]: (state, action) => {
      console.log(action.payload.page)
      state.results = action.payload.results
      state.currentPage = action.payload.page
      state.totalPages = action.payload.total_pages
      state.status = 'succsess'
      state.errorMsg = null
    },
    [fetchResults.rejected]: (state, action) => {
      state.status = 'error'
      state.errorMsg = action.error
    }
  }
})

export default searchSlice.reducer