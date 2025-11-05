import { Tabs } from 'expo-router'
import { SQLiteProvider } from 'expo-sqlite'
import { StatusBar } from 'expo-status-bar'

import Ionicons from '@expo/vector-icons/Ionicons'
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from 'react-native-gesture-handler'

function tabsLayout() {
  return (
    <GestureHandlerRootView>

      <BottomSheetModalProvider>

        <SQLiteProvider databaseName="listonomics.db">
          <StatusBar style='auto' />

          <Tabs screenOptions={{
            headerShadowVisible: false,
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#B1B1B1',
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
              height: 55,
              backgroundColor: '#F6F6F6',
              alignItems: 'center',
              paddingTop: 3,
              paddingBottom: 5,
              paddingHorizontal: 10,
              elevation: 0,
              borderTopWidth: 0,
            },
          }}>
            <Tabs.Screen name='index' options={{ 
              href: null,
              headerShown: false
              }} 
            />
            <Tabs.Screen name='home' options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <Ionicons size={26} name="home" color={color} />,
              headerShown: false,
              }}
            />
            <Tabs.Screen name='inventory/index' options={{
              title: 'Inventory',
              tabBarIcon: ({ color }) => <Ionicons size={26} name="cube" color={color} />,
              headerShown: false,
              }}
            />
            <Tabs.Screen name='graphs/index' options={{
              title: 'Statistics',
              tabBarIcon: ({ color }) => <Ionicons size={26} name="bar-chart" color={color} />,
              headerShown: false,
              }}
            />
            <Tabs.Screen name='settings/index' options={{
              title: 'Settings',
              tabBarIcon: ({ color }) => <Ionicons size={26} name="settings-sharp" color={color} />,
              headerShown: false,
              }}
            />
          </Tabs>
        </SQLiteProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default tabsLayout