import { Dispatch, PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit"
import { Coordinates, CoordinatesViewModel } from "../../src/shared/interfaces/coordinates"
import { RootState } from "../store"
import { HttpRequest } from "../../src/api/genericApi"
import { RESTMethod } from "../../src/shared/enums/requestMethod"
import { setIsAuth } from "../user/userSlice"

export interface CoordinatedState {
  coordinates: Coordinates | null
  isLoading: boolean
  error: string | null
}

const initialState: CoordinatedState = {
  coordinates: null,
  isLoading: false,
  error: null
}

const coordinatesSlice = createSlice({
  name: 'coordinates',
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
    updateCoordinates(state, action: PayloadAction<Coordinates | null>) {
      state.coordinates = action.payload;
    },
    setCoordinates(state, action: PayloadAction<Coordinates | null>) {
      state.coordinates = action.payload
    }
  }
});

export const addCoordinates = (
  coordinates: CoordinatesViewModel,
  navigate: (path: string) => void
): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchStart());

    const res = await HttpRequest<Coordinates>({
      uri: '/coordinates',
      method: RESTMethod.Post,
      item: coordinates,
    });
    if (res?.code === "success") {
      dispatch(setCoordinates(res.data));
      dispatch(setIsAuth(true))
      dispatch(fetchSuccess());
      navigate(`/profiles/${res.data.userId}`)
    } else {
      dispatch(fetchFailure("failed" + JSON.stringify(res.data)));
    }
  } catch (error: any) {
    dispatch(fetchFailure(error.payload || "An error occurred"));
  }
};

export const putCoordinates = (
  coordinatesId: string,
  coordinates: CoordinatesViewModel,
  navigate: (path: string) => void
): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchStart());

    const res = await HttpRequest<Coordinates>({
      uri: `/coordinates/${coordinatesId}`,
      method: RESTMethod.Put,
      item: coordinates,
    });
    if (res?.code === "success") {
      dispatch(setCoordinates(res.data));
      dispatch(fetchSuccess());
      navigate(`/profiles/${res.data.userId}`)
    } else {
      dispatch(fetchFailure("failed" + JSON.stringify(res.data)));
    }
  } catch (error: any) {
    dispatch(fetchFailure(error.payload || "An error occurred"));
  }
};

export const fetchCoordinatedByUserId = (
  userId: string,
): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchStart());

    const res = await HttpRequest<Coordinates>({
      uri: `/coordinates/by-user/${userId}`,
      method: RESTMethod.Get,
    });
    
    if (res?.code === "success") {
      dispatch(setCoordinates(res.data));
      dispatch(fetchSuccess());
    } else {
      dispatch(fetchFailure("failed" + JSON.stringify(res.data)));
    }
  } catch (error: any) {
    dispatch(fetchFailure(error.payload || "An error occurred"));
  }
}

export const { fetchStart, fetchFailure, fetchSuccess, updateCoordinates, setCoordinates } = coordinatesSlice.actions;
export default coordinatesSlice.reducer;
