import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	currentUser: null,
	storedCurrentUser: null
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrentUser: (state, { payload }) => {
			state.currentUser = payload
		},
		setStoredUser: (state, { payload }) => {
			state.storedCurrentUser = payload
		}
	}
})

export const { setCurrentUser, setStoredUser } = userSlice.actions

export const selectUser = state => state.user
export const selectStoredUser = state => state.user.storedCurrentUser

export default userSlice.reducer