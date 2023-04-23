import React, { useState } from 'react';

interface SenderProps {
  onSend: (text: string) => void;
}

const Sender: React.FC<SenderProps> = ({ onSend }) => {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const onSendClick = (e: React.SyntheticEvent ) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    onSend(inputValue.trim());
    setInputValue('');
  };

  return (
    <div className="message-box">
      <textarea className="message-input" placeholder="Type message..." value={inputValue} onChange={onInputChange} />
      <button type="button" className="message-submit" onClick={onSendClick}>Send</button>
    </div>
  );
};

export default Sender;