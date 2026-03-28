import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { router } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

import { Colors } from '../../constants/colors'

type customListHeaderProps = {
  readonly: boolean
  setReadonly: Dispatch<SetStateAction<boolean>>
}

const customListHeader = ({ readonly, setReadonly }: customListHeaderProps) => {
  const colorScheme = useColorScheme()
      
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const onPress = () => {
    setReadonly(!readonly)
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.header }]}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name='chevron-back' color={'#007AFF'} size={24} />
          <Text style={styles.backTo}>Home</Text>
        </TouchableOpacity>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={onPress}>
            <Ionicons name='book-outline' size={26} color={'#007AFF'} 
              style={[{ padding: 5, marginRight: 10 }, readonly && styles.active]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='ellipsis-horizontal-circle-outline' size={26} color={'#007AFF'} style={{ padding: 5, marginRight: 5 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default customListHeader

const styles = StyleSheet.create({
    container: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    marginTop: 15,
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
  buttonWrapper: {
    flexDirection: 'row',
  },
  active: {
    backgroundColor: 'rgba(0, 122, 255, 0.15)',
    borderRadius: 999,
  }
})