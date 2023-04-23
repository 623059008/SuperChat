import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './types';
import './ChatMessageBox.css';

interface ChatMessageBoxProps {
  messages: ChatMessage[];
}

const ChatMessageBox: React.FC<ChatMessageBoxProps> = ({ messages }) => {
  const messageBoxRef = useRef<HTMLDivElement>(null);
  // every message updates, set the scroller to the bottom
  useEffect(() => {
    // use ref to get the element
    const chatMessageBox = messageBoxRef.current;
    if (chatMessageBox) {
      chatMessageBox.scrollTop = chatMessageBox.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-message-box" ref={messageBoxRef}>
      {messages.map((message, index) => (
        <div key={index} className={`chat-message ${message.isOpposite ? 'left' : 'right'}`}>
          <div className="chat-message-row">
            {message.isOpposite && (
              <img className="chat-message-avatar" src={message.avatarUrl} alt="avatar" />
            )}
            <div className="chat-message-content">{message.content}</div>
          </div>
          <div className="chat-message-time">{message.sendTime}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessageBox;