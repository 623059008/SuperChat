import { getUserData } from "./utils/storage";
import { uuid } from "./utils/uuid";
import { ChatMessage, ChatUser } from "./components/ChatPage/types";

export const sendMessageRequest = async (message: string, robotData: ChatUser) => {
  const userData = getUserData()
  const newMessage = {
    fromUser: userData?.userId,
    toUser: robotData.id,
    message,
    robotData
  }
  const reply = await fetch("/messages/", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-session": userData?.session as string},
    body: JSON.stringify(newMessage),
  }).then(res => res.json())
  if (!reply) {
    throw new Error(reply.error);
  }
  return reply;
}
export const loginRequest = async (email: string, password: string) => {
  const response = await fetch("/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  console.log(`response: ${response}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
};

export const registerRequest = async (
  username: string,
  email: string,
  password: string,
) => {
  const response = await fetch("/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  console.log(`response: ${response}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
};