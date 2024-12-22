import { RegisteredUser } from "./user";

export interface Message {
  id: string;
  text: string;
  chatId: string;
  senderId: string;
  user: RegisteredUser // sender
}

export interface MessageViewModel {
  text: string;
  chatId: string;
  senderId: string;
}