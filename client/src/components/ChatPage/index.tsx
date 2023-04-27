import React, { useState, useEffect } from 'react';
import type { LoaderFunctionArgs } from "react-router-dom";
import { useParams } from "react-router-dom";
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/storage';
import { sendMessageRequest } from '../../requests';
import ChatHeader from './ChatHeader'
import ChatMessageBox from './ChatMessageBox';
import ChatInput from './ChatInput';
import { ChatMessage, ChatUser, ChatUserResponse } from './types';
import { uuid } from '../../utils/uuid';
import { userList } from '../../userdata';
import './index.css'

const mock = false;

const mockUser: ChatUser = {
  id: "1",
  name: "Joona Leppanen",
  avatarUrl: '/src/assets/avatar2.png',
  email: '',
  prompt: '',
}

const mockMe = {
  email: "me@gmail.com",
  avatarUrl: '/src/assets/avatar1.png',
  id: 'me',
  name: '',
  prompt: '',
};

async function getUserInfo(id: string|undefined): Promise<Response> {
  if (!id) {
    return Promise.reject(new Error("id is undefined"))
  }
  const res = fetch(`https://randomuser.me/api/?results=1`);
  return res;
}
// Todo
export async function chatLoader({
  params,
} : LoaderFunctionArgs): Promise<Response|ChatUser> {
  if(mock) {
    return new Promise((resolve, reject) => {
      resolve(mockUser);
    })
  }

  // get user info from userList by id
  const targetUser: ChatUser|undefined = userList.find((user) => {
    if(String(user.id) === String(params.id)) {
      return user;
    }
  });
  const userInfo : Promise<ChatUser> = new Promise((resolve, reject) => {
    resolve(targetUser || {} as ChatUser)
  });

  // const userInfo = getUserInfo(params.id);
  
  if (!userInfo) {
    throw new Error(`Uh oh, I couldn't find a user with id "${params.id}"`);
  }
  return userInfo;
}

// async function to get the historsy message
function getHistoryMessage(id:string) : ChatMessage[] {
  return loadFromLocalStorage(`conversation_${id}`)?.conversation as ChatMessage[] || [];
}

const ChatPage: React.FC = () => {
  const { id } = useParams();
  const oppoUserData = userList.find((user) => {
    if(String(user.id) === String(id)) {
      return user;
    }
  }) as ChatUser;
  // console.log('[debug] oppoUserData: ', oppoUserData)
  const oppoId = oppoUserData.id;
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);
  
  useEffect(() => {
    if(!oppoId) return;
    async function fetchHistory() {
      const historyData = getHistoryMessage(oppoId);
      // console.log('[debug] retrieve historyData: ', historyData);
      // The first message is sent from robot
      const firstMessage: ChatMessage = {
        id: `message_${uuid()}`,
        content: `Hi, I'm ${oppoUserData.name}.`,
        avatarUrl: oppoUserData.avatarUrl,
        isOpposite: true,
        sendTime: new Date().toLocaleString(),
      }
      setMessageList([...historyData, firstMessage] || [firstMessage]);
    }
    fetchHistory();
  }, [oppoId]);
  
  // console.log(`[debug] oppoUserData: ${JSON.stringify(oppoUserData.id)}, messageList: ${JSON.stringify(messageList)}`)
  const sendMessage = async (message: string, userData: ChatUser) => {
    const newMessage: ChatMessage = {
      id: `message_${uuid()}`,
      content: message,
      avatarUrl: userData.avatarUrl,
      isOpposite: userData.id === userData.id ? false : true,
      sendTime: new Date().toLocaleString(),
    }
    const tmpMessageList = [...messageList, newMessage];
    // save the message to local storage
    saveToLocalStorage(`conversation_${oppoId}`, {"conversation":[...messageList, newMessage]});
    setMessageList(tmpMessageList);
    // send to backend to get the response
    const reply = await sendMessageRequest(message, oppoUserData);
    console.log('[debug] response: ', reply);
    const replyMessage: ChatMessage = {
      id: `message_${uuid()}`,
      content: reply.content,
      avatarUrl: oppoUserData.avatarUrl,
      isOpposite: true,
      sendTime: new Date().toLocaleString(),
    }
    const tmpMessageListWithReply = [...tmpMessageList, replyMessage];
    // save the message to local storage
    saveToLocalStorage(`conversation_${oppoId}`, {"conversation": tmpMessageListWithReply});
    setMessageList(tmpMessageListWithReply);
  };
  // console.log('[debug] oppoUserData', oppoUserData)
  return (<div className="chat-page">
    <ChatHeader userInfo={oppoUserData} />
    <ChatMessageBox messages={messageList} />
    <ChatInput sendMessage={sendMessage} me={mockMe}/>
    </div>
    );
};

export default ChatPage;