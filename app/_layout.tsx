import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar'
import { SQLiteProvider } from 'expo-sqlite';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

import { AuthProvider } from '../utils/authContext';
import { Colors } from '../constants/colors';

export default function RootLayout() {
  const colorScheme = useColorScheme()
  
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const [loaded, error] = useFonts({
    'InconsolataRegular': require('../assets/fonts/Inconsolata-Regular.ttf'),
    'InconsolataBold': require('../assets/fonts/Inconsolata-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

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