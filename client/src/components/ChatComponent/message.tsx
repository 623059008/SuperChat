import React from 'react';

export interface MessageProps {
  key: string;
  text: string;
  type: 'bot' | 'user';
  timestamp: string;
  avatar: string;
}

function convertTimeStampToDate(timestamp: string) {
  const date = new Date(Number(timestamp));
  return `${date.getHours()}:${date.getMinutes()}`;
}

const Message: React.FC<MessageProps> = ({ text, type, timestamp, avatar }) => {
  const messageClass = `message ${type === 'bot' ? '' : 'message-personal'}`;

  return (
    <div className={messageClass}>
      <span>{text}</span>
      {type === 'bot' && <div className="avatar"><img src={avatar} alt="avatar" /></div>}
      <div className="timestamp">{convertTimeStampToDate(timestamp)}</div>
    </div>
  );
};

export default Message;
