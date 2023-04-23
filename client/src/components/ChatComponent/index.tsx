import React, { useState } from 'react';
import Sender from './sender';
import Message, { MessageProps } from './message';
import './index.css'

interface ChatComponentProps {
  username: string;
}

const defaultAvatar = '/src/assets/avatar1.png';

const robotProfile = {
  name: 'Keqing',
  avatar: '/src/assets/keqing_100x100.png',
  description: 'The Yuheng of the Liyue Qixing.'
}

const ChatComponent: React.FC<ChatComponentProps> = ({ username }) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const sendMessage = (text: string) => {
    const userAvatar = localStorage.getItem('avatar');
    const newMessage: MessageProps = {
      key: `user_${String(new Date().getTime())}`,
      text,
      type: 'user',
      timestamp: String(new Date().getTime()),
      avatar: userAvatar || defaultAvatar
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    localStorage.setItem('messages', JSON.stringify(newMessages));
    
    setTimeout(() => {
      const reply: MessageProps = {
        key: `robot_${String(new Date().getTime())}`,
        text: `Hi ${username}, you said "${text}"`,
        type: 'bot',
        timestamp: String(new Date().getTime()),
        avatar: robotProfile['avatar']
      };
      setMessages([...newMessages, reply]);
    }, 500);
  };

  return (
    <div className="chat">
      <div className="chat-title">
        <figure className="avatar">
          <img src={robotProfile['avatar']} />
        </figure>
        <h1>{robotProfile['name']}</h1>
        <h2>{robotProfile['description']}</h2>
      </div>
      <div className="messages">
      {messages.map((message) => (
        <Message
          key={message.key}
          text={message.text}
          type={message.type}
          timestamp={message.timestamp}
          avatar={message.avatar}
        />
      ))}
      </div>
      <Sender onSend={sendMessage} />
    </div>
  );
};

export default ChatComponent;