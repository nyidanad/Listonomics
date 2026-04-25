import { Redirect, Tabs } from 'expo-router'
import { SQLiteProvider } from 'expo-sqlite'

import Ionicons from '@expo/vector-icons/Ionicons'
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useContext } from 'react'
import { useColorScheme } from 'react-native'

import { AuthContext } from '../../utils/authContext'
import { Colors } from '../../constants/colors'

function tabsLayout() {
  const colorScheme = useColorScheme()
      
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const authState = useContext(AuthContext)

  if (!authState.isReady) {
    return null;
  }

  if (!authState.isLoggedIn) {
    return <Redirect href={'/login'} />
  }

  return (
    <GestureHandlerRootView>

      <BottomSheetModalProvider>

        <SQLiteProvider databaseName="listonomics.db">

          <Tabs screenOptions={{
            headerShadowVisible: false,
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: theme.tabbarIcon,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
              height: 55,
              backgroundColor: theme.tabbar,
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
            <Tabs.Screen name='ai/index' options={{
              title: 'Ask AI',
              tabBarIcon: ({ color }) => <Ionicons size={26} name="sparkles" color={color} />,
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