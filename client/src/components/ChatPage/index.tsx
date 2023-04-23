import React, { useState, useEffect } from 'react';
import type { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData, useParams } from "react-router-dom";
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/storage';
import ChatHeader from './ChatHeader'
import ChatMessageBox from './ChatMessageBox';
import ChatInput from './ChatInput';
import { ChatMessage, ChatUser, ChatUserResponse } from './types';
import { uuid } from '../../utils/uuid';
import { respondToUser } from '../../utils/randomReply';
import { userList } from '../../userdata';
import './index.css'

const mock = false;

const mockUser: ChatUser = {
  id: "1",
  name: "Joona Leppanen",
  avatarUrl: '/src/assets/avatar2.png',
  email: 'joona.leppanen@example.com'
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    content: 'Hi there!',
    avatarUrl: '/src/assets/avatar1.png',
    isOpposite: false,
    sendTime: '2023-03-16 14:00:00',
  },
  {
    id: '2',
    content: 'Hello!',
    avatarUrl: mockUser?.picture?.thumbnail,
    isOpposite: true,
    sendTime: '2023-03-16 14:01:00',
  },
];

const mockMe = {
  email: "me@gmail.com",
  avatarUrl: '/src/assets/avatar1.png',
  id: 'me',
  name: '',
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
        content: respondToUser('', mockMe, oppoUserData),
        avatarUrl: oppoUserData.avatarUrl,
        isOpposite: true,
        sendTime: new Date().toLocaleString(),
      }
      setMessageList([...historyData, firstMessage] || [firstMessage]);
    }
    fetchHistory();
  }, [oppoId]);
  
  // console.log(`[debug] oppoUserData: ${JSON.stringify(oppoUserData.id)}, messageList: ${JSON.stringify(messageList)}`)
  const sendMessage = (message: string, userData: ChatUser) => {
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
    // response from the bot
    setTimeout(() => {
      const newMessage: ChatMessage = {
        id: `message_${uuid()}`,
        content: respondToUser(message, userData, oppoUserData),
        avatarUrl: oppoUserData.avatarUrl,
        isOpposite: true,
        sendTime: new Date().toLocaleString(),
      }
      const tmpMessageListWithReply = [...tmpMessageList, newMessage];
      // save the message to local storage
      saveToLocalStorage(`conversation_${oppoId}`, {"conversation": tmpMessageListWithReply});
      setMessageList(tmpMessageListWithReply);
    }, 500);
  };

  return (<div className="chat-page">
    <ChatHeader userInfo={oppoUserData} />
    <ChatMessageBox messages={messageList} />
    <ChatInput sendMessage={sendMessage} me={mockMe}/>
    </div>
    );
};

export default ChatPage;