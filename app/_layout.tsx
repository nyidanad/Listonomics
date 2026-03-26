import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar'
import { SQLiteProvider } from 'expo-sqlite';
import { useColorScheme } from 'react-native';

import { AuthProvider } from '../utils/authContext';
import { Colors } from '../constants/colors';

export default function RootLayout() {
  const colorScheme = useColorScheme()
  
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

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
            options={{ headerShown: false, statusBarStyle: 'auto', statusBarBackgroundColor: theme.header }}
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