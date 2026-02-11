import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'

import DeleteModal from '../deleteModal'

type settingsModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  request?: () => Promise<void>
}

const unregisterModal = ({ showModal, setShowModal, request }: settingsModalProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const onDelete = () => {
    setShowModal(false)
    setShowDeleteModal(true)
  }
  
  const onClose = () => {
    setShowModal(false)
  }

  return (
    <>
      <Modal
        animationType='fade'
        transparent={true}
        visible={showModal}
        onRequestClose={onClose}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            {/* Header */}
            <View>
              <Text style={styles.title}>Unregister application</Text>
              <Text style={styles.message}>Unregistering will permanently delete your account and all associated data. This includes personal information, saved lists, and any shared content. Once unregistered, your data cannot be recovered.</Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.actionButton]} onPress={onDelete}>
                <Text style={styles.actionText}>Unregister</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <DeleteModal 
        title='Are you sure you want to unregister?'
        message='This will permanently delete your account and all associated data, including shared content. This action cannot be undone.' 
        button='Confirm' 
        showModal={showDeleteModal} 
        setShowModal={setShowDeleteModal} 
        request={request} />
    </>
  )
}

export default unregisterModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 15,
    borderRadius: 15,
    elevation: 5,
    width: '90%',
    height: 'auto',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    color: '#FB3D3D',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  message: {
    color: '#989CA9',
    fontSize: 14,
    marginBottom: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
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