import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'
import { SQLiteProvider } from 'expo-sqlite'
import { StatusBar } from 'expo-status-bar'

function tabsLayout() {
  return (
    <SQLiteProvider databaseName="listonomics.db">
      <StatusBar style='auto' />

      <Tabs screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#605967',
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
          tabBarIcon: ({ color }) => <FontAwesome size={26} name="cubes" color={color} />,
          headerShown: false,
          }}
        />
        <Tabs.Screen name='graphs/index' options={{
          title: 'Graphs',
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
  )
}

export default tabsLayout