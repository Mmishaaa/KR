import { Gender } from "../enums/gender";
import { UserRole } from "../enums/userRole";
import { Like } from "./like";
import { Photo } from "./photo";
import { Subscription } from "./subscription";
import { RegisteredUser } from "./user";

export interface Profile {
  userId: string;
  userName: string;
  userLocation: string;
  userDescription: string;
  userAge: number;
  userRole: string;
  gender: string;
  photos: Photo[];
  sentLikes: Like[];
  receivedLikes: Like[],
  subscription: Subscription
}

export interface ProfilesResponse {
  rows: RegisteredUser[];
  count: number
}