// /frontend/App.tsx

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

// Import the FIRST screen you want to show from your src folder
// Let's assume it's your ChatScreen for now.
import ChatScreen from './src/screens/ChatScreen';

function App(): React.JSX.Element {
  // You can add your navigation logic here later.
  // For now, we will just display a single screen.
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      {/*
        This is where you render your main component.
        If you have a navigator, you would put it here.
        For testing, we will just show the ChatScreen.
      */}
      <ChatScreen
        route={{ params: { roomId: 'test-room', recipientId: 'test-user' } }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
