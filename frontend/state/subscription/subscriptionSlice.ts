import { createSlice, Dispatch, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { Subscription, SubscriptionViewModel } from '../../src/shared/interfaces/subscription';
import { RootState } from '../store';
import { HttpRequest } from '../../src/api/genericApi';
import { RESTMethod } from '../../src/shared/enums/requestMethod';
import { SubscriptionType } from '../../src/shared/enums/subscriptionType';

export interface SubscriptionState {
  subscription: Subscription | null
  isLoading: boolean
  error: string | null
}

const initialState: SubscriptionState = {
  subscription: null,
  isLoading: false,
  error: null
}

const userSlice = createSlice({
  name: 'subscription',
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
    updateSubscription(state, action: PayloadAction<Subscription>) {
      state.subscription = action.payload;
    },
  }
});

export const { fetchStart, fetchFailure, fetchSuccess, updateSubscription } = userSlice.actions;

export const updateSubscriptionAsync = (
  subscriptionViewModel: SubscriptionViewModel
): ThunkAction<Promise<void>, RootState, unknown, any> => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchStart());

    const res = await HttpRequest<Subscription>({
      uri: `/subscriptions`,
      method: RESTMethod.Put,
      item: subscriptionViewModel,
    });

    if (res?.code === "success") {
      const subscription: Subscription = {
        id: res.data.id,
        email: res.data.email,
        subscriptionType: res.data.subscriptionType as SubscriptionType,
        expiresAt: res.data.expiresAt,
        createdAt: res.data.createdAt,
        updatedAt: res.data.updatedAt
      }
      dispatch(updateSubscription(subscription));
      
      dispatch(fetchSuccess());
    } else {
      dispatch(fetchFailure("An error occured while updatin subscription" + JSON.stringify(res.data)));
    }
  } catch (error: any) {
    dispatch(fetchFailure(error.payload || "An error occurred"));
  }
};


export default userSlice.reducer;
