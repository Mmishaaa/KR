import { SubscriptionType } from "../enums/subscriptionType";

export interface Subscription {
  id: string,
  email: string,
  subscriptionType: SubscriptionType,
  expiresAt: Date,
  createdAt: Date,
  updatedAt: Date
}

export interface SubscriptionViewModel {
  userId: string;
  subscriptionType: SubscriptionType
}