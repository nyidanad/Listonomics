import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from "react-native"

import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { List } from '../../app/(tabs)/home'
import ListOptionsModal from '../../components/modals/listOptionsModal'

type ListComponentProps = {
  list: List
  index: number
  getLists: () => Promise<void>
}

const draggableListComponent = ({ list, index, getLists }: ListComponentProps) => {
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
          style={styles.container} 
          ref={(ref) => { listsRef.current[index] = ref }}
        >
          <View style={styles.listWrapper}>
            <FontAwesome6 name='grip-vertical' size={18} color={'#EBEBEB'} style={{ marginRight: 15 }} />
            <View style={[styles.iconWrapper, { backgroundColor: list.color }]}>
              <Ionicons name={list.icon} style={styles.icon} />
            </View>
            <Text style={styles.listTitle}>{list.title}</Text>
            <Ionicons name="ellipsis-horizontal" size={18} color={'#363636'} onPress={() => [handleModalPosition(index), setShowModal(true)]} />
          </View>
        </View>
      </View>
      <ListOptionsModal showModal={showModal} setShowModal={setShowModal} modalPosition={modalPosition} selectedList={list} getLists={getLists} />
    </>
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

export default draggableListComponent