import React from 'react';

function MessageBubble({ message }) {
	//const msgTime = message.createdAt;
	//console.log(msgTime);
    return (
    <div className={`message-bubble ${message.sender === localStorage.getItem('username') ? 'self' : ''}`}>
	  <div className="chat-avatar"></div>
      <p className="message-sender">{message.sender}</p>
      <p className="message-text">{message.messageContent}</p>
      <span className="message-timestamp">{message.createdAt.toLocaleString()}</span>
    </div>
    );
}

export default MessageBubble;