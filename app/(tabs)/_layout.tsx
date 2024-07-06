import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'

function tabsLayout() {
  return (
    <Tabs screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: '#3E46C7',
        tabBarInactiveTintColor: '#B1B1B1',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
            height: 60,
            backgroundColor: '#F6F6F6',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingTop: 3,
            paddingBottom: 5,
        }
    }}>
        <Tabs.Screen name='index' options={{ href: null }} />
        <Tabs.Screen name='home' options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome size={33} name="home" color={color} />,
            headerShown: false,
        }} />
        <Tabs.Screen name='inventory/index' options={{
            title: 'Inventory',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cubes" color={color} />,
            headerShown: false,
        }} />
        <Tabs.Screen name='graphs/index' options={{
            title: 'Graphs',
            tabBarIcon: ({ color }) => <Ionicons size={28} name="bar-chart-sharp" color={color} />,
            headerShown: false,
        }} />
        <Tabs.Screen name='settings/index' options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <Ionicons size={28} name="settings-sharp" color={color} />,
            headerShown: false,
        }} />
    </Tabs>
  )
}

export default tabsLayout