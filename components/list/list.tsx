import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'

import { List } from '../../app/(tabs)/home'
import ListOptionsModal from '../../components/modals/listOptionsModal'

type ListComponentProps = {
  list: List
  index: number
  getLists: () => Promise<void>
}

const ListComponent = ({ list, index, getLists }: ListComponentProps) => {
  const router = useRouter()
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
        <TouchableOpacity 
          style={styles.container} 
          onPress={() => router.push({ pathname: 'home/lists/[id]', params: { title: list.title, color: list.color } })}
          ref={(ref) => { listsRef.current[index] = ref }}
        >
          <View style={styles.listWrapper}>
            <View style={[styles.iconWrapper, { backgroundColor: list.color }]}>
              <MaterialCommunityIcons name={list.icon} style={styles.icon} />
            </View>
            <Text style={styles.listTitle}>{list.title}</Text>
            <TouchableOpacity onPress={() => [handleModalPosition(index), setShowModal(true)]}>
              <Ionicons name="ellipsis-vertical" style={styles.listArrow} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
    fontSize: 16,
  },
  listArrow: {
    fontSize: 18,
    color: '#C0C0C0',
  },
})

export default ListComponent