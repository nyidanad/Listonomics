import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'

type settingsModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  request?: () => Promise<void>
}

const exportModal = ({ showModal, setShowModal, request }: settingsModalProps) => {
  const [filename, setFilename] = useState<string>('')

  const onSave = () => {}

  const onClose = () => {
    setFilename('')
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
          {/* Header */}
          <View>
            <Text style={styles.title}>Export data</Text>
            <Text style={styles.message}>Save a copy of your existing lists to a file. You can use this file to back up your data or import it later.</Text>
          </View>

          {/* Input */}
          <View style={styles.inputWrapper}>
            <TextInput
              value={filename}
              onChangeText={setFilename}
              placeholder='Enter filename...'
              placeholderTextColor={'#AFAFAF'} 
              style={styles.input}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.actionButton]} onPress={onSave}>
              <Text style={styles.actionText}>Export</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default exportModal

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
    color: '#363636',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  message: {
    color: '#989CA9',
    fontSize: 14,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E5E5EA',
    marginVertical: 20,
  },
  input: {
    color: '#363636',
    marginLeft: 10,
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
    backgroundColor: '#007AFF',
  },
  actionText: {
    color: '#FAFAFA',
  },
})