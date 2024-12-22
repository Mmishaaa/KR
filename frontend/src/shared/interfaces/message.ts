export interface Message {
  id: string;
  text: string;
  chatId: string;
  senderId: string;
}

export interface MessageViewModel {
  text: string;
  chatId: string;
  senderId: string;
}