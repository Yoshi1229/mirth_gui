import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import NotFound from './pages/NotFound';
import AccountSettings from './components/Account/AccountSettings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/chat" element={<ChatPage />} />
	  <Route path="/settings" element={<AccountSettings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;