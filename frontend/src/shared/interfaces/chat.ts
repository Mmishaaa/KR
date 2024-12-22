import { Message } from "../../shared/interfaces/message"
import { RegisteredUser } from "./user"

export interface Chat {
  id: string
  createdAt: string
  updatedAt: string
  messages: Message[]
  users: RegisteredUser[]
}