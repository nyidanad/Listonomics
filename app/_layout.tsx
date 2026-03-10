import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar'

import { AuthProvider } from '../utils/authContext';
import { SQLiteProvider } from 'expo-sqlite';

export default function RootLayout() {
  return (
    <AuthProvider>
      <SQLiteProvider databaseName="listonomics.db">
        <StatusBar style='auto' />
        <Stack>
          <Stack.Screen 
            name='login'
            options={{ headerShown: false, statusBarStyle: 'light' }}
          />
          <Stack.Screen 
            name='(tabs)'
            options={{ headerShown: false, statusBarStyle: 'dark', statusBarBackgroundColor: '#FFFFFF' }}
          />
          <Stack.Screen 
            name='(auth)'
            options={{ headerShown: false, statusBarStyle: 'light' }}
          />
        </Stack>
      </SQLiteProvider>
    </AuthProvider>
  )
}