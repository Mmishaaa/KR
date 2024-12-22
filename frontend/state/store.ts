import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import photoReducer from "./photo/photoSlice"
import coordinatesSlice from './coordinates/coordinatesSlice';
import profilesReducer from './profiles/profilesSlice';
import likesReducer from './likes/likesSlice';
import chatsReducer from "./chats/chatsSlice"
import subscriptionReducer from "./subscription/subscriptionSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    photo: photoReducer,
    coordinates: coordinatesSlice,
    profiles: profilesReducer,
    likes: likesReducer,
    chats: chatsReducer,
    subscription: subscriptionReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;