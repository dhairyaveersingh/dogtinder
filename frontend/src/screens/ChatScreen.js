// /frontend/src/screens/ChatScreen.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { connectSocket, getSocket, disconnectSocket } from '../utils/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({ route }) => {
  const { roomId, recipientId } = route.params; // Provided by navigation
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    
    const setupSocket = async () => {
      const token = await AsyncStorage.getItem('userJwtToken');
      const socket = connectSocket(token); 

      socket.emit('joinRoom', { roomId });

      socket.on('chatHistory', (history) => {
        setMessages(history);
      });

      socket.on('receiveMessage', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
    };

    setupSocket();

    return () => {
      disconnectSocket();
    };
  }, [roomId]);

  const sendMessage = () => {
    const socket = getSocket();
    if (socket && content.trim()) {
      socket.emit('sendMessage', { roomId, content, to: recipientId });
      setContent('');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id || Math.random().toString()}
        renderItem={({ item }) => (
          <Text>{item.from === recipientId ? 'Them' : 'You'}: {item.content}</Text>
        )}
      />
      <TextInput value={content} onChangeText={setContent} placeholder="Type a message..." />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatScreen;
