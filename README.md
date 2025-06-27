# 🐕 DogTinder - Pet Dating App



**Find the perfect companion for your pet! Swipe, match, and connect with pet owners near you.**

[![React Native](https://imgB](https://img.shields.io/badge/MongoDB-Latest-brightgreen.## 🌟 Features

### 🐾 **Pet Profiles**
- Create detailed profiles for your pets
- Add species, breed, age, and intentions (playdate, mating, adoption)
- Upload photos and showcase your pet's personality

### 💫 **Smart Matching**
- Tinder-style swipe interface for pet discovery
- Like or pass on pets in your area
- Get instantly notified when there's a mutual match

### 💬 **Real-Time Chat**
- Chat with other pet owners after matching
- Secure, authenticated messaging
- Plan playdates and meetups

### 🔐 **Secure Authentication**
- JWT-based user authentication
- Protected routes and data
- Socket.IO authentication for real-time features

## 🚀 Live Demo

> **Note**: This is a mobile app. Use an Android emulator or device to test.

## 📱 Screenshots

```
[Login Screen]     [Pet Profiles]     [Swipe Interface]     [Chat Screen]
     📱                 📱                   📱                  📱
  🐕 DogTinder      ➕ Add Pet          🐾 Browse            💬 Chat
  Email: ____       Name: ____         [Swipe Cards]       [Messages]
  Pass:  ____       Breed: ____        ❌ Pass | Like ❤️    Type message...
  [Login] 🔐        Age: ____          
                    [Add Pet] ✅       
```

## 🛠️ Tech Stack

### **Frontend (Mobile)**
- **React Native 0.74.2** - Cross-platform mobile development
- **React Navigation 6.x** - Navigation and routing
- **Socket.IO Client** - Real-time communication
- **AsyncStorage** - Local data persistence
- **React Native Deck Swiper** - Tinder-style swipe interface

### **Backend (API)**
- **Node.js & Express** - RESTful API server
- **MongoDB & Mongoose** - Database and ODM
- **Socket.IO** - Real-time messaging
- **JWT** - Authentication and authorization
- **bcryptjs** - Password hashing

### **Development Tools**
- **Metro Bundler** - React Native bundler
- **Android Studio** - Android development environment
- **MongoDB Compass** - Database management

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js 18+** installed
- **React Native development environment** set up
- **Android Studio** (for Android development)
- **MongoDB** running locally or MongoDB Atlas account
- **Git** for version control

## 🚀 Quick Start

### **1. Clone the Repository**
```bash
git clone https://github.com/dhairyaveersingh/dogtinder.git
cd dogtinder
```

### **2. Backend Setup**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
echo "MONGODB_URI=mongodb://localhost:27017/dogtinder
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000" > .env

# Start the backend server
npm start
```

### **3. Frontend Setup**
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Install additional React Native dependencies
npm install react-native-gesture-handler react-native-reanimated
npm install react-native-screens react-native-safe-area-context

# Start Metro bundler
npm start
```

### **4. Run the Mobile App**
```bash
# In a new terminal, run on Android
npx react-native run-android

# Or run on iOS (macOS only)
npx react-native run-ios
```

## 🏗️ Project Structure

```
dogtinder/
├── backend/                 # Node.js API server
│   ├── models/             # MongoDB schemas
│   │   ├── User.js
│   │   ├── Pet.js
│   │   └── Message.js
│   ├── routes/             # API routes
│   │   ├── auth.js         # Authentication endpoints
│   │   ├── pets.js         # Pet management
│   │   └── match.js        # Matching logic
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Express server + Socket.IO
│   ├── app.js              # App configuration
│   └── package.json
│
├── frontend/               # React Native mobile app
│   ├── src/
│   │   ├── screens/        # App screens
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   ├── PetBrowsingScreen.js
│   │   │   ├── AddPetScreen.js
│   │   │   └── ChatScreen.js
│   │   ├── utils/          # Utilities
│   │   │   └── socket.js   # Socket.IO client
│   │   └── components/     # Reusable components
│   ├── App.tsx             # Root component
│   ├── metro.config.js     # Metro bundler config
│   └── package.json
│
└── README.md
```

## 🔗 API Endpoints

### **Authentication**
```http
POST /api/auth/register    # Create new user account
POST /api/auth/login       # User login
```

### **Pet Management**
```http
GET    /api/pets          # Get all pets
POST   /api/pets          # Create new pet profile
PUT    /api/pets/:id      # Update pet profile
DELETE /api/pets/:id      # Delete pet profile
```

### **Matching**
```http
POST /api/match/like/:petId    # Like a pet
POST /api/match/pass/:petId    # Pass on a pet
GET  /api/match/matches        # Get user's matches
```

## 💬 Real-Time Events

### **Socket.IO Events**
```javascript
// Client to Server
socket.emit('joinRoom', { roomId })
socket.emit('sendMessage', { roomId, content, to })

// Server to Client
socket.on('receiveMessage', messageData)
socket.on('chatHistory', messages)
socket.on('newMatch', matchData)
```

## 🧪 Testing

### **Test User Flow**
1. **Register** a new account
2. **Login** with your credentials
3. **Add pet profiles** with different species and intentions
4. **Browse pets** using the swipe interface
5. **Like pets** to create matches
6. **Chat** with other pet owners

### **Sample Test Data**
```javascript
// Test Pet 1
{
  name: "Buddy",
  species: "Dog",
  breed: "Golden Retriever",
  age: 3,
  intentions: ["playdate"]
}

// Test Pet 2
{
  name: "Whiskers",
  species: "Cat",
  breed: "Persian",
  age: 2,
  intentions: ["mating"]
}
```

## 🔧 Configuration

### **Environment Variables**
Create a `.env` file in the backend directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/dogtinder

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Server
PORT=5000

# Optional: Production settings
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

### **Android Emulator Setup**
```bash
# Map emulator ports to local backend
adb reverse tcp:5000 tcp:5000
adb reverse tcp:8081 tcp:8081
```

## 🚀 Deployment

### **Backend Deployment (Heroku)**
```bash
# Add Heroku remote
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_production_secret

# Deploy
git push heroku main
```

### **Mobile App Deployment**
```bash
# Generate release APK
cd android && ./gradlew assembleRelease

# Find APK at: android/app/build/outputs/apk/release/app-release.apk
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Development Guidelines**
- Follow React Native best practices
- Write clean, commented code
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dhairyaveer Singh**
- GitHub: [@dhairyaveersingh](https://github.com/dhairyaveersingh)
- Project: [DogTinder](https://github.com/dhairyaveersingh/dogtinder)

## 🙏 Acknowledgments

- **React Native Community** for excellent documentation
- **Socket.IO** team for real-time capabilities
- **MongoDB** for reliable data storage
- **Tinder** for inspiration on the swipe interface

## 📞 Support

If you have any questions or run into issues:

1. **Check the Issues** tab for existing solutions
2. **Create a new Issue** with detailed information
3. **Include logs** and error messages
4. **Specify your environment** (OS, Node version, etc.)



**Made with ❤️ for pet lovers everywhere**

[⬆ Back to Top](#-dogtinder---pet-dating-app)

