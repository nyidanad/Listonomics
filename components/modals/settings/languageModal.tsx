import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'

import Ionicons from '@expo/vector-icons/Ionicons'

import assets from '../../../data/assets.json'
import settings from '../../../data/settings.json'
import { Image } from 'expo-image'

type settingsModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  request?: () => Promise<void>
}

type LanguageKey = keyof typeof languageImages

type Language = {
  key: LanguageKey;
  text: string;
}

const languageImages = {
  en: require('../../../assets/images/flags/english-logo.png'),
  de: require('../../../assets/images/flags/german-logo.png'),
  hu: require('../../../assets/images/flags/hungary-logo.png'),
}

const languageModal = ({ showModal, setShowModal, request }: settingsModalProps) => {
  const languages = assets.languages as Language[]
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
              const isActive = activeLanguage === language.key

              return (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.languageContainer, isActive && {backgroundColor: '#FFF'}]} 
                  onPress={() => setAactiveLanguage(language.key)}
                >
                  <View style={styles.languageWrapper}>
                    <Image style={styles.image} source={languageImages[language.key]} />
                    <Text style={styles.language}>{language.text}</Text>
                    {language.text === "English" && <Text style={styles.default}>Default</Text>}
                  </View>
                  {isActive && <Ionicons name='checkmark-outline' style={styles.checkmark} />}
                </TouchableOpacity>
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
    marginBottom: 20,
  },
  title: {
    color: '#363636',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  message: {
    color: '#989CA9',
    fontSize: 14,
    paddingHorizontal: 20,
    marginBottom: 17,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginVertical: 3,
  },
  languageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 999,
    marginLeft: 20,
    marginRight: 15,
  },
  language: {
    color: '#363636',
    fontSize: 16,
  },
  default: {
    color: '#989CA9',
    fontSize: 10,
    borderRadius: 999,
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 20,
  },
  checkmark: {
    color: '#2ECC71',
    fontSize: 18,
    borderRadius: 999,
    padding: 1,
    backgroundColor: 'rgba(46, 204, 113, 0.25)',
    marginRight: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
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