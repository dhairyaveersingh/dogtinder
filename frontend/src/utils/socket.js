// /frontend/src/utils/socket.js
import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = (token) => {
  if (!socket) {
    socket = io('http://localhost:5000', {
      query: { token },
      transports: ['websocket'], // Ensures best compatibility
    });
  }
  return socket;
};

export const getSocket = () => socket;
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
