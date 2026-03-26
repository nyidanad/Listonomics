import React, { useRef, useState } from 'react'
import { StyleSheet, Text, useColorScheme, View } from "react-native"

import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { List } from '../../app/(tabs)/home'
import ListOptionsModal from '../../components/modals/listOptionsModal'
import { Colors } from '../../constants/colors'

type ListComponentProps = {
  list: List
  index: number
  getLists: () => Promise<void>
}

const draggableListComponent = ({ list, index, getLists }: ListComponentProps) => {
  const colorScheme = useColorScheme()
    
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

  const [showModal, setShowModal] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0 })
  const listsRef = useRef<(View | null)[]>([])

  // Calculating Modal position to selected List
  const handleModalPosition = (index: number) => {
    const ref = listsRef.current[index]
    if (ref) {
      ref.measureInWindow((x, y, width, height) => {
        setModalPosition({ top: y + height - 370 })
      })
    }
  }

  return (
    <>
      <View>
        <View 
          style={[styles.container, { backgroundColor: theme.list, shadowColor: theme.listShadowColor }]} 
          ref={(ref) => { listsRef.current[index] = ref }}
        >
          <View style={styles.listWrapper}>
            <FontAwesome6 name='grip-vertical' size={18} color={theme.listDragger} style={{ marginRight: 15 }} />
            <View style={[styles.iconWrapper, { backgroundColor: list.color }]}>
              <Ionicons name={list.icon} size={20} color={theme.list} />
            </View>
            <Text style={[styles.listTitle, { color: theme.text }]}>{list.title}</Text>
            <Ionicons name="ellipsis-horizontal" size={18} color={theme.text} onPress={() => [handleModalPosition(index), setShowModal(true)]} />
          </View>
        </View>
      </View>
      <ListOptionsModal showModal={showModal} setShowModal={setShowModal} modalPosition={modalPosition} selectedList={list} getLists={getLists} />
    </>
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

export default draggableListComponent