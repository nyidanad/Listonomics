import { Modal, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'

import Hr from '../horizontalRules/hr'
import { Colors } from '../../constants/colors'

type ModalProps = {
  showModal: boolean
  setShowModal: (show: boolean) => void
  setPriority: (priority: 'medium' | 'high' | null) => void
}

const priorityModal = ({ showModal, setShowModal, setPriority }: ModalProps) => {
  const colorScheme = useColorScheme()
    
  if (!colorScheme) return null
  const theme = Colors[colorScheme] ?? Colors.light

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
        <View style={[styles.content, { backgroundColor: theme.modalBackground }]}>
          
          <TouchableOpacity onPress={() => { setPriority(null); setShowModal(false); }}>
            <View style={styles.button}>
              <View style={[styles.priorityView, , { backgroundColor: theme.priority }]}>
                <View style={styles.priorityCircle} />
              </View>
              <Text style={[styles.text, { color: theme.text }]}>None</Text>
            </View>
          </TouchableOpacity>
          <Hr color={theme.ruler} width={1} top={8} bottom={8} />

          <TouchableOpacity onPress={() => { setPriority('medium'); setShowModal(false); }}>
            <View style={styles.button}>
              <View style={[styles.priorityView, { backgroundColor: '#FFC602' }]}>
                <View style={styles.priorityCircle} />
              </View>
              <Text style={[styles.text, { color: theme.text }]}>Medium</Text>
            </View>
          </TouchableOpacity>
          <Hr color={theme.ruler} width={1} top={8} bottom={8} />

          <TouchableOpacity onPress={() => { setPriority('high'); setShowModal(false); }}>
            <View style={styles.button}>
              <View style={[styles.priorityView, { backgroundColor: '#FF3B30' }]}>
                <View style={styles.priorityCircle} />
              </View>
              <Text style={[styles.text, { color: theme.text }]}>High</Text>
            </View>
          </TouchableOpacity>

        </View>
      </TouchableOpacity>
    </Modal>
  )
}

export default priorityModal

const styles = StyleSheet.create({
  container: {
    top: 64,
    right: 90,
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
    width: 150,
    height: 'auto',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityView: {
    width: 20,
    height: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityCircle: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 999,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  },
})