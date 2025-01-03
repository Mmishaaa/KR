import { Like } from "./like";
import { Photo } from "./photo";
import { Subscription } from "./subscription";

export interface User {
  id: string;
  fusionUserId : string;
  firstName : string;
  lastName : string;
  age : number;
  city : string;
  description : string;
  gender: string;
  email: string;
  photos: Photo[];
};

export interface UserViewModel {
  email: string,
  firstName: string,
  lastName: string,
  age: number,
  gender: string,
  subscription: Subscription
  role: string,  
  password: string,
  description: string,
  city: string,
  photos: Photo[]
}

export interface UserViewModelToUpdate {
  age: number,
  gender: string,
  description: string,
  city: string,
}

export interface ShortUserViewModelToUpdate {
  firstName: string,
  lastName: string,
}

export interface RegisteredUser {
  id: string
  email: string,
  firstName: string,
  lastName: string,
  age: number,
  gender: string,
  subscription: Subscription
  role: string,  
  password: string,
  description: string,
  city: string,
  photos: Photo[],
  sentLikes: Like[],
  receivedLikes: Like[],
  coordinates: Coordinates
}

export interface RegistrationResponse {
  newUser: RegisteredUser ,
  jwt: string,
  message: string
}

export interface UserAuthentication {
  email: string;
  password: string
}

export interface AuthCheckResult {
  user: RegisteredUser,
  token: string
}

export interface Coordinates {
  name: string;
  lat: number;
  lng: number,
  userId: string
}