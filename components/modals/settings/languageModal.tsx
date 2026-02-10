import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'

import assets from '../../../data/assets.json'
import settings from '../../../data/settings.json'

type settingsModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  request?: () => Promise<void>
}

const languageModal = ({ showModal, setShowModal, request }: settingsModalProps) => {
  const languages = assets.languages
  const [activeLanguage, setAactiveLanguage] = useState(settings.language)

  const onSave = () => {}

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
          {/* Header */}
          <View>
            <Text style={styles.title}>Select your language</Text>
            <Text style={styles.message}>This will update menus, labels, and other interface text to match your selection. You can change the language anytime.</Text>
          </View>

          {/* Languages */}
          <View>
            {languages.map((language, index) => {
              return (
                <View key={index}>
                  <Image width={50} height={50} source={{uri: language.image}} />
                  <Text style={styles.language}>{language.text}</Text>
                  {language.text === "English" && <Text style={styles.default}>Default</Text>}
                </View>
              )
            })}
          </View>

          {/* Buttons */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.actionButton]} onPress={onSave}>
              <Text style={styles.actionText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default languageModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    backgroundColor: '#FAFAFA',
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
  flag: {
  },
  language: {

  },
  default: {

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
    backgroundColor: '#007AFF',
  },
  actionText: {
    color: '#FAFAFA',
  },
})