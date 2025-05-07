import React from 'react';

function ChatList({ chats, onSelectChat }) {
  return (
    <div className="chat-list-container">
      <h3>Your Chats</h3>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="chat-list-item"
          onClick={() => onSelectChat(chat)}
        >
          <p>{chat.name}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatList;