import { RegisteredUser } from "./user";

export interface Message {
  id: string;
  text: string;
  chatId: string;
  senderId: string;
  user: RegisteredUser // sender
  createdAt: string
}

export interface MessageViewModel {
  text: string;
  chatId: string;
  senderId: string;
}