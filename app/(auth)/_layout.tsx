import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name='signup'
        options={{ headerShown: false, statusBarStyle: 'light' }}
      />
      <Stack.Screen 
        name='forgotPassword'
        options={{ headerShown: false, statusBarStyle: 'light' }}
      />
      <Stack.Screen 
        name='changePassword'
        options={{ headerShown: false, statusBarStyle: 'light' }}
      />
    </Stack>
  )
}