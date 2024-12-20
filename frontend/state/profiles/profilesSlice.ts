import { createSlice, Dispatch, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { HttpRequest } from '../../src/api/genericApi';
import { RESTMethod } from '../../src/shared/enums/requestMethod';
import { Profile, ProfilesResponse } from "../../src/shared/interfaces/profiles"

export interface ProfileState {
  profiles: Profile[] | null
  isLoading: boolean
  error: string | null
}

const initialState: ProfileState = {
  profiles: [],
  isLoading: false,
  error: null
}

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    fetchStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchSuccess(state) {
      state.isLoading = false;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateProfiles(state, action: PayloadAction<Profile>) {
      state.profiles?.push(action.payload);
    },
    setProfiles(state, action: PayloadAction<Profile[] | null>) {
      state.profiles = action.payload
    }
  }
});

export const fetchAllProfiles = (
): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchStart());

    const res = await HttpRequest<ProfilesResponse>({
      uri: `/users`,
      method: RESTMethod.Get,
    });
    
    if (res?.code === "success") {
      console.log("Response:", res);
      console.log("Response Data:", res.data);
      const profiles: Profile[] = [];

      res.data.rows.forEach(user => {
        profiles.push({
          userId: user.id,
          userAge: user.age,
          userDescription: user.description,
          userName: user.firstName + user.lastName,
          userLocation: "",
          photos: user.photos
        })
      });

      dispatch(setProfiles(profiles));    
      dispatch(fetchSuccess());
    } else {
      dispatch(fetchFailure("Login failed"));
    }
  } catch (error: any) {
    dispatch(fetchFailure(error.message || "An error occurred"));
  }
}


export const { fetchStart, fetchFailure, fetchSuccess, updateProfiles, setProfiles } = profileSlice.actions;


export default profileSlice.reducer;
