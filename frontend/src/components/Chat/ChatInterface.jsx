import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

function ChatInterface({ chat, onSendMessage }) {
  const [messages, setMessages] = useState(chat.messages || []);

  const handleSendMessage = (text) => {
    /*const newMessage = {
      sender: 'You',
      text,
      timestamp: new Date().toLocaleTimeString(),
    };*/ //moved to ChatPage.jsx for simplicity
    //setMessages([...messages, newMessage]);
    onSendMessage(text);
  };

  return (
    <div className="chat-interface-container">
      <div className="chat-header">
        <h2>{chat.name}</h2>
        <p>{chat.description || 'No description available'}</p>
      </div>
      <div className="chat-messages">
        {chat.messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatInterface;