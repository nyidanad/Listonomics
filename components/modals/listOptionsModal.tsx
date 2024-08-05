import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { Dispatch, SetStateAction } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'

import { List } from '../../app/(tabs)/home'
import Hr from '../horizontalRules/hr'

export type ModalPositionsProps = {
  top: number
}

type ModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  modalPosition: ModalPositionsProps
  selectedList: List
}

const ListOptionsModal = ({ showModal, setShowModal, modalPosition, selectedList }: ModalProps) => {
  const router = useRouter()

  // Handeling Modal close
  const onCloseModal = () => {
    setShowModal(false)
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={onCloseModal}
    >
      <TouchableOpacity style={styles.container} onPress={onCloseModal}>
        <View style={[styles.content, { top: modalPosition.top }]}>
          
          {/* EDIT */}
          <TouchableOpacity onPress={() => [onCloseModal, router.push({pathname: `home/editList/[id]`, params: selectedList})]}>
            <View style={styles.button}>
              <Text style={styles.text}>Edit</Text>
              <MaterialCommunityIcons name="pencil-outline" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <Hr color='#EDEEF2' width={1} top={8} bottom={8} />

          {/* DUPLICATE */}
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.text}>Duplicate</Text>
              <Ionicons name="duplicate-outline" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <Hr color='#EDEEF2' width={1} top={8} bottom={8} />

          {/* FLAGGED */}
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.text}>Flagged</Text>
              <Ionicons name="flag-outline" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <Hr color='#EDEEF2' width={1} top={8} bottom={8} />

          {/* DELETE */}
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={[styles.text, { color: 'red' }]}>Delete</Text>
              <Ionicons name="trash" style={[styles.icon, { color: 'red' }]} />
            </View>
          </TouchableOpacity>

        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  content: {
    justifyContent: 'space-evenly',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 5,
    width: 175,
    height: 'auto',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#363636',
    fontSize: 16,
  },
  icon: {
    color: '#363636',
    fontSize: 18,
  },
})

export default ListOptionsModal