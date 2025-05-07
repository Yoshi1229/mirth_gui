import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { fetchChat, fetchChats, sendMessage } from '../utils/api';
import ChatInterface from '../components/Chat/ChatInterface';
import '../styles/chat.css';

const socket = io('http://localhost:5000');

function ChatPage() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const response = await fetchChats(token);
      setChats(response.data);
    };
    fetchData();
	
	socket.on('receiveMessage', (message) => {
      if (selectedChat && message.chatRoom === selectedChat.UUID) {
        setSelectedChat((prevChat) => ({
          ...prevChat,
          messages: [...prevChat.messages, message],
        }));
      }
    });
	
	return () => {
      socket.disconnect();
    };
	
  }, [selectedChat]);

  const handleSendMessage = async (message) => {
    const token = localStorage.getItem('token');
	const name = localStorage.getItem('username');
	const newMessage = {
      sender: name,
	  chatRoom: selectedChat.UUID,
      messageContent: message,
      createdAt: Date.now(),
    }
	await sendMessage(selectedChat.UUID, newMessage, token);
	socket.emit('sendMessage', newMessage);
  };
  
  const handleSelectChat = async (chat) => {
	const token = localStorage.getItem('token');
    const response = await fetchChat(chat.UUID,token);
	const messages = await response.data[0].messages;
	//console.log(messages);
    setSelectedChat({ ...chat, messages: messages });
  };

  return (
    <div className="chat-page-container">
      <nav className="navbar">
        <Link to="/chat" className = "logo">Mirth</Link>
        <div><Link to="/settings" className="settings-button">Account Settings</Link>
        <button onClick={logout} className="logout-button">Logout</button></div>
      </nav>
      <div className="chat-page">
        <div className="chat-list">
          <h2>Chats</h2>
          {chats.map((chat) => (
            <div
              key={chat.UUID}
              className={`chat-item ${selectedChat?.UUID === chat.UUID ? 'active-chat' : ''}`}
              onClick={() => handleSelectChat(chat)}
            >
			  <div className="chat-avatar"></div>
                {chat.name}
            </div>
          ))}
		  <div className="add-chat-button">+</div>
        </div>
        <div className="chat-interface-container">
          {selectedChat ? (
            <ChatInterface chat={selectedChat} onSendMessage={handleSendMessage} />
          ) : (
            <p className="no-chat-selected">Select a chat to start messaging</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;

//pickup
//todo
//fix chat persisting across chats (the handleSelectChat function does not seem to work or be called), change html onClick  to handleSelectChat instead of setSelectedChat. However, doesnt this also reset the fetched messages??
//add "add chat/create chat" button at the bottom left
//fix logout button returning error: (useAuth.js, navigate)