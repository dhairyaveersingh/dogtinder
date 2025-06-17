// Real-time Chat with Socket.IO (/backend/server.js):
const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const app = require('./app');
const server = http.createServer(app);
const io = socketIo(server);

// Middleware (If Needed)
app.use(express.json()); 

// Register Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// match routes
const matchRoutes = require('./routes/match');
app.use('/api/match', matchRoutes);

// pet routes
const petRoutes = require('./routes/pets');
app.use('/api/pets', petRoutes);

// Real-time Chat Logic
io.on('connection', (socket) => {
  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
  });
  socket.on('sendMessage', ({ roomId, message }) => {
    io.to(roomId).emit('receiveMessage', message);
  });
});

// Start Server **AFTER** Routes Are Registered
server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
