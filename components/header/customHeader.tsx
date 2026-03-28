import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '../../constants/colors'

type HeaderProps = {
  title: string
  backTo: string
  backToPath: string
  action: string
  onPress: () => Promise<void> | void
}

const customHeader = ({ title, backTo, backToPath, action, onPress }: HeaderProps) => {
  const colorScheme = useColorScheme()
  
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <View style={[styles.container, { backgroundColor: theme.header }]}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => {backToPath === '' ? router.back() : router.replace(backToPath)}} style={styles.backButton}>
          <Ionicons name='chevron-back' color={'#007AFF'} size={24} />
          <Text style={styles.backTo}>{backTo}</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>

        <TouchableOpacity onPress={onPress}>
          <Text style={styles.action}>
            {action}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default customHeader

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 15,
    
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
  },
  backTo: {
    color: '#007AFF',
    fontSize: 14,
    marginLeft: 5,
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#363636',
    fontSize: 18,
    fontWeight: 'bold',
  },
  action: {
    color: '#007AFF',
    fontSize: 14,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 999,
  },
})