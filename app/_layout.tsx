import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar'

import { AuthProvider } from '../utils/authContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style='auto' />
      <Stack>
        <Stack.Screen 
          name='login'
          options={{ headerShown: false, statusBarStyle: 'dark' }}
        />
        <Stack.Screen 
          name='(tabs)'
          options={{ headerShown: false, statusBarStyle: 'dark', statusBarBackgroundColor: '#FFFFFF' }}
        />
      </Stack>
    </AuthProvider>
  )
}