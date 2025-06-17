// Real-time Chat with Socket.IO (/backend/server.js):
const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const app = require('./app');
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['https://yourfrontend.com'],  // Replace with actual frontend URL
    methods: ['GET', 'POST']
  }
});

const jwtAuth = require('socketio-jwt-auth');
const User = require('./models/User');

io.use(jwtAuth.authenticate({
  secret: process.env.JWT_SECRET,
  algorithm: 'HS256'
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (!user) return done(null, false, 'User not found');
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));


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
const Message = require('./models/Message'); 

io.on('connection', (socket) => {
  // User authentication is already applied
  
  socket.on('joinRoom', async ({ roomId }) => {
    socket.join(roomId);
    
    // Fetch and send last 50 messages from MongoDB when a user joins
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 }).limit(50);
    socket.emit('chatHistory', messages);
  });

  socket.on('sendMessage', async ({ roomId, content, to }) => {
    const from = socket.request.user._id;

    // Save the message in MongoDB
    const message = new Message({ roomId, from, to, content });
    await message.save();

    // Broadcast message to all room members
    io.to(roomId).emit('receiveMessage', {
      _id: message._id,
      from,
      to,
      content,
      timestamp: message.timestamp
    });
  });
});
// Start Server **AFTER** Routes Are Registered
server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
