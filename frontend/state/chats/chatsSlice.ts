import { createSlice, Dispatch, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { Chat } from '../../src/shared/interfaces/chat';
import { RootState } from '../store';
import { HttpRequest } from '../../src/api/genericApi';
import { RESTMethod } from '../../src/shared/enums/requestMethod';
import { Message, MessageViewModel } from '../../src/shared/interfaces/message';

export interface ChatsState {
  chats: Chat[]
  isLoading: boolean
  error: string | null
}

const initialState: ChatsState = {
  chats: [],
  isLoading: false,
  error: null
}

const chatsSlice = createSlice({
  name: 'chats',
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
    addChat(state, action: PayloadAction<Chat>) {
      state.chats.push(action.payload) ;
    },
    setChats(state, action: PayloadAction<Chat[] | []>) {
      state.chats = action.payload
    }
  }
});

export const { fetchStart, fetchFailure, fetchSuccess, addChat, setChats } = chatsSlice.actions;

export const getAllChatsByUserId = (
  userId: string
): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchStart());

    const res = await HttpRequest<Chat[]>({
      uri: `/chats/by-user/${userId}`,
      method: RESTMethod.Get,
    });

    if (res?.code === "success") {
      const sortedChats = res.data.map(chat => ({
        ...chat,
        messages: chat.messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
      }));

      console.log("sortedChats: ", JSON.stringify(sortedChats));

      dispatch(setChats(sortedChats));
      dispatch(fetchSuccess());
    } else {
      dispatch(fetchFailure("Error while retrieving all chats: " + JSON.stringify(res.data)));
    }
  } catch (error: any) {
    dispatch(fetchFailure(error.payload || "An error occurred"));
  }
};

export const addMessageToChatAsync = (
  message: MessageViewModel
): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchStart());

    const res = await HttpRequest<Message>({
      uri: `/messages`,
      method: RESTMethod.Post,
      item: message
    });

    if (res?.code === "success") {
      
      dispatch(fetchSuccess());
    } else {
      dispatch(fetchFailure("Error while sending a message" + JSON.stringify(res.data)));
    }
  } catch (error: any) {
    dispatch(fetchFailure(error.payload || "An error occurred"));
  }
};

export default chatsSlice.reducer;
