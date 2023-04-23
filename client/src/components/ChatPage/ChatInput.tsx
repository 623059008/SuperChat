import React, { useState, KeyboardEvent } from 'react';
import { ChatUser } from './types';
import './ChatInput.css';

interface ChatInputProps {
  sendMessage: (message: string, userData: ChatUser) => void;
  me: ChatUser
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage, me }) => {
  const [message, setMessage] = useState('');

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() !== '') {
        sendMessage(message, me);
        setMessage('');
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() !== '') {
      sendMessage(message, me);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="chat-input"
        placeholder="Say hello to this friend..."
        value={message}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button type="submit" className="chat-send-button">
        Send
      </button>
    </form>
  );
};

export default ChatInput;