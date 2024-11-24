import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserWithSubscription } from "../../src/shared/interfaces/user"

export interface UserState {
  user: UserWithSubscription | null
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart(state){
      state.isLoading = true,
      state.error = null
    },
    fetchUserSuccess(state, action: PayloadAction<UserWithSubscription>){
      state.isLoading = false,
      state.user = action.payload
    },
    fetchUserFailure(state, action: PayloadAction<string>){
      state.isLoading = false,
      state.error = action.payload
    },
    updateUser(state, action: PayloadAction<UserWithSubscription>){
      state.user = action.payload
    }
  }
})

export const {
  fetchUserStart,
  fetchUserFailure,
  fetchUserSuccess,
  updateUser
} = userSlice.actions;

export default userSlice.reducer;