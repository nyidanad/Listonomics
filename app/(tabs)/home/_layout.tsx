import { Stack } from "expo-router"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export const homeLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name='index' options={{
            headerShown: false,
          }} />
          <Stack.Screen name='addList' options={{
            headerTitle: 'Add List',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
            headerShadowVisible: false,
          }} />
          <Stack.Screen name='editList/[id]' options={{
            headerTitle: 'Edit List',
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
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default homeLayout