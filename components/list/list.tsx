import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native"
import { useRouter } from 'expo-router'

import Ionicons from '@expo/vector-icons/Ionicons'

import { List } from '../../app/(tabs)/home'
import { Colors } from '../../constants/colors'

type ListComponentProps = {
  list: List
  setMode: Dispatch<SetStateAction<string>>
}

const ListComponent = ({ list, setMode }: ListComponentProps) => {
  const colorScheme = useColorScheme()
  
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const router = useRouter()

  return (
    <View>
      <TouchableOpacity 
        style={[styles.container, { backgroundColor: theme.list, shadowColor: theme.listShadowColor }]} 
        onPress={() => router.push({ pathname: 'home/lists/[id]', params: { id: list.id, title: list.title, color: list.color } })}
        onLongPress={() => setMode('settings')}
      >
        <View style={styles.listWrapper}>
          <View style={[styles.iconWrapper, { backgroundColor: list.color }]}>
            <Ionicons name={list.icon} size={20} color={theme.list} />
          </View>
          <Text style={[styles.listTitle, { color: theme.text }]}>{list.title}</Text>
          <Ionicons name="chevron-forward" size={18} color={theme.text} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 55,
    justifyContent: 'center',
    marginBottom: 8,
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  listWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  iconWrapper: {
    borderRadius: 999,
    width: 35,
    height: 35,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTitle: {
    flex: 1,
    fontSize: 16,
  },
})

export default ListComponent