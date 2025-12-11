import { Stack } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export const homeLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name='index' options={{
          headerShown: false,
        }} />
        <Stack.Screen name='addList' options={{
          headerShown: false
        }} />
        <Stack.Screen name='editList/[id]' options={{
          headerShown: false
        }} />
        <Stack.Screen name='lists/[id]' options={{
          headerShown: false
        }} />
        <Stack.Screen name='profile/index' options={{
          headerShown: false
        }} />
        <Stack.Screen name='profile/editProfile' options={{
          headerShown: false
        }} />
      </Stack>
    </GestureHandlerRootView>
  )
}

export default homeLayout