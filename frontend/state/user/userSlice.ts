import { createSlice, Dispatch, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RegistrationResponse, UserAuthentication, RegisteredUser, AuthCheckResult, UserViewModel } from "../../src/shared/interfaces/user"
import { HttpRequest } from '../../src/api/genericApi';
import { RESTMethod } from '../../src/shared/enums/requestMethod';
import { RootState } from '../store';
import { json } from 'react-router-dom';

export interface UserState {
  user: RegisteredUser | null
  isAuth: boolean
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
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
    updateUser(state, action: PayloadAction<RegisteredUser>) {
      state.user = action.payload;
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUser(state, action: PayloadAction<RegisteredUser | null>) {
      state.user = action.payload
    }
  }
});

export const { fetchStart, fetchFailure, fetchSuccess, updateUser, setIsAuth, setUser } = userSlice.actions;

export const register = (
  user: UserAuthentication,
  navigate: (path: string) => void
): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchStart());

    const res = await HttpRequest<RegistrationResponse>({
      uri: `/users/registration`,
      method: RESTMethod.Post,
      item: user,
    });

    if (res?.code === "success") {
      localStorage.setItem("token", res.data.jwt)
      
      dispatch(updateUser(res.data.newUser));
      dispatch(setIsAuth(true));
      
      navigate(`/profiles/${res.data.newUser.id}`);   
      
      dispatch(fetchSuccess());
    } else {
      dispatch(fetchFailure("Registration failed" + JSON.stringify(res.data)));
    }
  } catch (error: any) {
    dispatch(fetchFailure(error.payload || "An error occurred"));
  }
};

export const login = (
  user: UserAuthentication,
  navigate: (path: string) => void
): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchStart());

    const res = await HttpRequest<RegistrationResponse>({
      uri: `/users/login`,
      method: RESTMethod.Post,
      item: user,
    });
    
    if (res?.code === "success") {
      dispatch(updateUser(res.data.newUser));
      dispatch(setIsAuth(true));
      localStorage.setItem("token", res.data.jwt)
      
      navigate(`/profiles/${res.data.newUser.id}`);   

      dispatch(fetchSuccess());
    } else {
      dispatch(fetchFailure("Login failed"));
    }
  } catch (error: any) {
    dispatch(fetchFailure(error.message || "An error occurred"));
  }
};

export const fetchUserById = (
  id: string
): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchStart());

    const res = await HttpRequest<RegisteredUser>({
      uri: `/users/${id}`,
      method: RESTMethod.Get,
    });
    
    if (res?.code === "success") {
      dispatch(updateUser(res.data));    

      dispatch(fetchSuccess());
    } else {
      dispatch(fetchFailure("Login failed"));
    }
  } catch (error: any) {
    dispatch(fetchFailure(error.message || "An error occurred"));
  }
}

export const check = (
) => async (dispatch: Dispatch): Promise<boolean> => {
  try {
    dispatch(fetchStart());

      const res = await HttpRequest<AuthCheckResult>({
        uri: `/users/auth`,
        method: RESTMethod.Get,
      });
    
    if (res?.code === "success") {
      localStorage.setItem("token", res.data.token)

      dispatch(setIsAuth(true));
      
      dispatch(fetchSuccess());
      
      dispatch(setUser(res.data.user))
      return true;
    } else {
      dispatch(fetchFailure("Login failed"));
      return false; 
    }
  } catch (error: any) {
    dispatch(fetchFailure(error.message || "An error occurred"));
    return false;
  }
};

export const updateUserAsync = (
  id: string,
  user: UserViewModel,
): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchStart());

    const res = await HttpRequest<RegisteredUser>({
      uri: `/users/${id}`,
      method: RESTMethod.Put,
      item: user,
    });

    if (res?.code === "success") {
      dispatch(updateUser(res.data));
      
      dispatch(fetchSuccess());
    } else {
      dispatch(fetchFailure("Updating failed" + JSON.stringify(res.data)));
    }
  } catch (error: any) {
    dispatch(fetchFailure(error.payload || "An error occurred"));
  }
};


export default userSlice.reducer;
