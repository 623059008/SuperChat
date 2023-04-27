export interface ChatMessage {
  id: string;
  content: string;
  avatarUrl?: string;
  isOpposite: boolean;
  sendTime?: string;
}

export type ChatUser = {
  id: string;
  avatarUrl?: string;
  gender?: string;
  name: string;
  description?: string;
  prompt: string;
  tags?: string[];
  email?: string;
}

export interface ChatUserResponse {
  results: ChatUser[];
}