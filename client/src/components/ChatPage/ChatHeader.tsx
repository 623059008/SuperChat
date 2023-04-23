import React, { useState, useEffect } from 'react';
import './ChatHeader.css';
import { getMainColor } from '../../utils/mainColor';
import { ChatUser } from './types';

interface ChatHeaderProps {
  userInfo: ChatUser;
}

const useMainColor = (avatarUrl: string) => {
  const [mainColor, setMainColor] = useState<string>('');
  useEffect(() => {
    async function computeMainColor() {
      const tmp = await getMainColor(avatarUrl || "");
      setMainColor(tmp)
    }
    computeMainColor();
  });
  return mainColor;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ userInfo }) => {
  const { name, avatarUrl, description, tags } = userInfo;
  
  const mainColor = useMainColor(avatarUrl || "");
  console.log('[debug] mainColor: ', mainColor)
  
  return (
    <div className="chat-header" style={{
      background: mainColor,
    }}>
      <img className="chat-avatar" src={avatarUrl || "/src/assets/avatar1.png"} alt="avatar" />
      <div className="chat-info">
        <div className="chat-name">{name || 'Unknown'}</div>
        <div className="chat-introduction">{description || 'This man has no description'}</div>
        <div className="tags">
          {tags && tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
