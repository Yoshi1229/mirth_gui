import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Backend URL
/* login function, modify after backend is ready
export const login = async (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};
*/
export const register = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};
/*fetch chat function, modify after backend is ready
export const fetchChats = async (token) => {
  return axios.get(`${API_URL}/conversation`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
*/
export const sendMessage = async (conversationId, message, token) => {
  return axios.post(
    `${API_URL}/send/conversation/${conversationId}`,
    { message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

//the followings are mock functions for testing purposes only, remove after backend is ready.
export const login = async (username, password) => {
  return new Promise((resolve, reject) => {
    if (username === 'test' && password === 'password') {
      resolve({ data: { token: 'mock-token', username: 'test' } });
    } else {
      reject(new Error('Invalid credentials'));
    }
  });
};

export const fetchChats = async () => {
  return new Promise((resolve) => {
    resolve({
      data: [
        { UUID: '1', name: 'General Chat', messages: [{sender:"Someone",messageContent:"Hello",createdAt:Date.now()}] },
        { UUID: '2', name: 'Project Discussion', messages: [] },
      ],
    });
  });
};

export const fetchChat = async (UUID) => {
  const p1 = new Promise((resolve) => {
    resolve({
      data: [
        { UUID: '1', name: 'General Chat', messages: [{sender:"Someone",messageContent:"Hello",createdAt:new Date()},{sender:"test",messageContent:"this is my message",createdAt:new Date()},{sender:"Someone",messageContent:"Hello again",createdAt:new Date()},{sender:"Someone",messageContent:"Hellooo",createdAt:new Date()},{sender:"Someone",messageContent:"hihihi",createdAt:new Date()},{sender:"Someone",messageContent:":(",createdAt:new Date()},] },
        //{ UUID: '2', name: 'Project Discussion', messages: [] },
      ],
    });
  });
  const p2 = new Promise((resolve) => {
    resolve({
      data: [
        //{ UUID: '1', name: 'General Chat', messages: [{sender:"Someone",messageContent:"Hello",createdAt:Date.now()}] },
        { UUID: '2', name: 'Project Discussion', messages: [] },
      ],
    });
  });
  if(UUID == '1'){return p1} else {return p2}
};

export const deleteAccount = async (token) => {
  return new Promise((resolve, reject) => {
    // Simulate a successful response after a delay
    setTimeout(() => {
      if (token) {
        resolve({ message: 'Account deleted successfully (mock)' });
      } else {
        reject(new Error('Invalid token (mock)'));
      }
    }, 1000); // Simulate a 1-second delay
  });
};

export const updateAccount = async (data, token) => {
  return new Promise((resolve, reject) => {
    // Simulate backend behavior with a delay
    setTimeout(() => {
      if (token) {
        // Check if essential fields are provided
        if (data.username || data.email || data.password) {
          resolve({
            message: 'Account updated successfully (mock)',
            updatedFields: data, // Return the updated fields for testing
          });
        } else {
          reject(new Error('No valid fields provided to update (mock)'));
        }
      } else {
        reject(new Error('Invalid token (mock)'));
      }
    }, 1000); // Simulates a 1-second delay
  });
};
