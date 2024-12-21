import { Like } from "./like";
import { Photo } from "./photo";
import { RegisteredUser } from "./user";

export interface Profile {
  userId: string;
  userName: string;
  userLocation: string;
  userDescription: string;
  userAge: number;
  photos: Photo[];
  sentLikes: Like[];
  receivedLikes: Like[]
}

export interface ProfilesResponse {
  rows: RegisteredUser[];
  count: number
}