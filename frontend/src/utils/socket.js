// /frontend/src/utils/socket.js
import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = (token) => {
  if (!socket && token) {
    console.log('🔌 Connecting to socket with token...');
    socket = io('http://10.0.2.2:5000', {
      query: { token },
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('✅ Connected to backend:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from backend');
    });

    socket.on('connect_error', (error) => {
      console.log('🚫 Connection error:', error);
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('🔌 Socket disconnected');
  }
};
