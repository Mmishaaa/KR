import { createSlice, Dispatch, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { HttpRequest } from '../../src/api/genericApi';
import { RESTMethod } from '../../src/shared/enums/requestMethod';
import { RootState } from '../store';
import { Photo, PhotoViewModel } from '../../src/shared/interfaces/photo';

export interface PhotoState {
  photos: Photo[] | null
  isLoading: boolean
  error: string | null
}

const initialState: PhotoState = {
  photos: null,
  isLoading: false,
  error: null
}

const photoSlice = createSlice({
  name: 'photo',
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
    updatePhoto(state, action: PayloadAction<Photo>) {
      if (action.payload.isAvatar && state.photos) {
        state.photos = state.photos.map(photo =>
          photo.isAvatar ? { ...photo, isAvatar: false } : photo
        );
      }
    
      if (!state.photos) {
        state.photos = [];
      }
    
      state.photos?.push(action.payload);
    },
    setPhoto(state, action: PayloadAction<Photo[] | null>) {
      state.photos = action.payload
    }
  }
});

export const addPhoto = (
  photo: PhotoViewModel,
): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchStart());

    const formData = new FormData();
    formData.append('userId', photo.userId);
    formData.append('isAvatar', String(photo.isAvatar));
    formData.append('img', photo.img);

    const res = await HttpRequest<Photo>({
      uri: '/photos',
      method: RESTMethod.Post,
      item: formData,
    });
    if (res?.code === "success") {
      dispatch(updatePhoto(res.data));
      dispatch(fetchSuccess());
    } else {
      dispatch(fetchFailure("Registration failed" + JSON.stringify(res.data)));
    }
  } catch (error: any) {
    dispatch(fetchFailure(error.payload || "An error occurred"));
  }
};

export const removePhoto = (
  id: string,
): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch: Dispatch, getState) => {
  try {
    dispatch(fetchStart());

    const res = await HttpRequest<Photo>({
      uri: `/photos/${id}`,
      method: RESTMethod.Delete,
    });

    const { photos } = getState().photo;

    const updatedPhotos = photos?.filter(photo => photo.id !== id) || [];

    if (res?.code === "success") {
      dispatch(setPhoto(updatedPhotos));
      dispatch(fetchSuccess());
    } else {
      dispatch(fetchFailure("Registration failed" + JSON.stringify(res.data)));
    }
  } catch (error: any) {
    dispatch(fetchFailure(error.payload || "An error occurred"));
  }
};

export const { fetchStart, fetchFailure, fetchSuccess, updatePhoto, setPhoto } = photoSlice.actions;
export default photoSlice.reducer;