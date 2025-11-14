// App.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar'; // <-- PERBAIKAN: Impor dari expo
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    // PERBAIKAN: Menambahkan style flex: 1 untuk web
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <StatusBar style="light" />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// PERBAIKAN: Menambahkan StyleSheet untuk web
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});