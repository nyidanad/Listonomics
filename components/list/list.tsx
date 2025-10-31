import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useRouter } from 'expo-router'

import Ionicons from '@expo/vector-icons/Ionicons'

import { List } from '../../app/(tabs)/home'

type ListComponentProps = {
  list: List
  setMode: Dispatch<SetStateAction<string>>
}

const ListComponent = ({ list, setMode }: ListComponentProps) => {
  const router = useRouter()

  return (
    <View>
      <TouchableOpacity 
        style={styles.container} 
        onPress={() => router.push({ pathname: 'home/lists/[id]', params: { title: list.title, color: list.color } })}
        onLongPress={() => setMode('settings')}
      >
        <View style={styles.listWrapper}>
          <View style={[styles.iconWrapper, { backgroundColor: list.color }]}>
            <Ionicons name={list.icon} style={styles.icon} />
          </View>
          <Text style={styles.listTitle}>{list.title}</Text>
          <Ionicons name="chevron-forward" size={18} color={'#363636'} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 55,
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#B8BFCB',
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
  icon: {
    fontSize: 20,
    color: 'white',
  },
  listTitle: {
    flex: 1,
    color: '#363636',
    fontSize: 16,
  },
})

export default ListComponent