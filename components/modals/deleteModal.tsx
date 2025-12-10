import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'

type deleteModalProps = {
  title: string
  message: string
  button: string
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  request: () => Promise<void>
}

const deleteModal = ({ title, message, button, showModal, setShowModal, request }: deleteModalProps) => {
  const onClose = () => {
    setShowModal(false)
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={showModal}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.actionButton]} onPress={async () => await request()}>
              <Text style={styles.actionText}>{button}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default deleteModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    elevation: 5,
    width: '90%',
    height: 'auto',
  },
  title: {
    color: '#363636',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  message: {
    color: '#989CA9',
    fontSize: 14,
    marginBottom: 30,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    height: 45,
    borderRadius: 15,
  },
  cancelButton: {
    backgroundColor: '#F3F5F9',
  },
  cancelText: {
    color: '#363636',
  },
  actionButton: {
    backgroundColor: '#FB3D3D',
  },
  actionText: {
    color: '#FAFAFA',
  },
})