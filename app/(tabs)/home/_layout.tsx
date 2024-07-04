import { Stack } from "expo-router"

const homeLayout = () => {
  return (
    <Stack screenOptions={{
      
    }}>
      <Stack.Screen name='index' options={{
        headerShown: false,
      }} />
      <Stack.Screen name='addList' options={{
        headerTitle: 'Add List',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible: false,
      }} />
      <Stack.Screen name='lists/[id]' options={{
        headerTitle: 'Lists',
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: 'bold' }
      }} />
    </Stack>
  )
}

export default homeLayout