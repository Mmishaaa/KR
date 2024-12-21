import { Dispatch, PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit"
import { Like, LikeViewModel } from "../../src/shared/interfaces/like"
import { RootState } from "../store"
import { HttpRequest } from "../../src/api/genericApi"
import { RESTMethod } from "../../src/shared/enums/requestMethod"

export interface LikesState {
  likes: Like[]
  isLoading: boolean
  error: string | null
}

const initialState: LikesState = {
  likes: [],
  isLoading: false,
  error: null
}

const likesSlice = createSlice({
  name: 'likes',
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
    updateLikes(state, action: PayloadAction<Like>) {
      state.likes?.push(action.payload);
    },
    setLikes(state, action: PayloadAction<Like[]>) {
      state.likes = action.payload
    }
  }
});

export const createLike = (
  like: LikeViewModel,
): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchStart());

    const res = await HttpRequest<Like>({
      uri: `/likes`,
      method: RESTMethod.Post,
      item: like,
    });

    if (res?.code === "success") {
      
      dispatch(updateLikes(res.data));
      
      dispatch(fetchSuccess());
    } else {
      dispatch(fetchFailure("Error: " + JSON.stringify(res.data)));
    }
  } catch (error: any) {
    dispatch(fetchFailure(error.payload || "An error occurred"));
  }
};

export const { fetchStart, fetchFailure, fetchSuccess, updateLikes, setLikes } = likesSlice.actions;
export default likesSlice.reducer;
